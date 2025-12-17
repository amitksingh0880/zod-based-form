import * as z from "zod";

export type FormValues<T extends z.ZodTypeAny> = z.infer<T>;

/**
 * Safe helpers to detect and unwrap zod schemas across zod versions/bundles.
 */

/** Try to extract a type name from a schema._def (supports def.typeName and def.type) */
const getTypeNameFromDef = (def: any): string | undefined => {
  if (!def) return undefined;
  if (typeof def.typeName === "string" && def.typeName.length > 0) {
    // If this is an instanceof type, try to specialize it for File / FileList
    try {
      if (def.typeName === 'ZodInstanceof' && def?.value) {
        const val = def.value;
        if (val === File || val?.name === 'File') return 'ZodInstanceofFile';
        if (val === FileList || val?.name === 'FileList') return 'ZodInstanceofFileList';
      }
    } catch (e) {
      // ignore
    }
    return def.typeName;
  }
  // If the def carries a 'value' (instanceof type), detect File/FileList even if typeName isn't exact
  try {
    const val = def?.value;
    if (val) {
      if (val === File || val?.name === 'File') return 'ZodInstanceofFile';
      if (val === FileList || val?.name === 'FileList') return 'ZodInstanceofFileList';
    }
  } catch (e) {
    // ignore environment not having File/FileList
  }
  // If this is a custom validator (z.custom or something similar), try to inspect .check function
  try {
    if (def?.type === 'custom' && typeof def?.check === 'function') {
      const str = String(def.check).toLowerCase();
      // common patterns for instanceof checks
      if (str.includes('instanceof file')) return 'ZodInstanceofFile';
      if (str.includes('instanceof filelist')) return 'ZodInstanceofFileList';
      // some checks use constructor.name or .name matchers or prototype checks
      if (str.includes("'file'") || str.includes('"file"') || str.includes('filelist')) {
        if (str.includes('filelist')) return 'ZodInstanceofFileList';
        return 'ZodInstanceofFile';
      }
      // heuristics: checks for object props common in File objects
      if ((str.includes('.name') || str.includes("'name' in") || str.includes('value.name') || str.includes('v.name') || str.includes('file.name')) &&
          (str.includes('.size') || str.includes('file.size') || str.includes('value.size'))) {
        return 'ZodInstanceofFile';
      }
      // heuristics for multiple files: files array, filelist, or checking element props
      if (str.includes('files.length') || str.includes('filelist.length') || (str.includes('files') && str.includes('every(')) || str.includes('array.isarray')) {
        return 'ZodInstanceofFileList';
      }
    }
  } catch (e) {
    // ignore
  }
  if (typeof def.type === "string" && def.type.length > 0) {
    const t = def.type;
    if (t === "custom") return "ZodCustom";
    return t.startsWith("Zod") ? t : `Zod${t.charAt(0).toUpperCase()}${t.slice(1)}`;
  }
  // If this is an instanceof check, try to detect File/FileList from its value
  try {
    if (def?.typeName === 'ZodInstanceof' && def?.value) {
      const val = def.value;
      // On browser runtimes, val === File or val === FileList
      if (val === File || val?.name === 'File') return 'ZodInstanceofFile';
      if (val === FileList || val?.name === 'FileList') return 'ZodInstanceofFileList';
      // Some rollups may expose a string representation
      if (typeof val === 'string') {
        if (val.toLowerCase().includes('filelist')) return 'ZodInstanceofFileList';
        if (val.toLowerCase().includes('file')) return 'ZodInstanceofFile';
      }
    }
  } catch (e) {
    // ignore any environment errors (e.g. File undefined in Node)
  }
  return undefined;
};

/** Repeatedly unwrap known wrapper schemas (Optional, Nullable, Default, Effects) */
const unwrapPossibleWrappers = (schema?: z.ZodTypeAny | null) => {
  if (!schema) return schema;
  let s: any = schema;
  let safety = 0;
  while (s && safety < 40) {
    safety += 1;
    const tn = getTypeNameFromDef((s as any)._def) ?? (s as any).constructor?.name;
    if (!tn) break;

    // common wrappers we can safely unwrap
    if (tn === "ZodOptional" || tn === "ZodNullable" || tn === "ZodDefault" || tn === "ZodEffects") {
      s = (s as any)._def?.innerType ?? (s as any)._def?.schema ?? (s as any).unwrap?.() ?? s;
      // if unwrap didn't change anything, stop
      if (s === schema) break;
      continue;
    }

    break;
  }
  return s as z.ZodTypeAny | undefined;
};

/** Public: robust schema type name detection */
export const getSchemaTypeName = (schema?: z.ZodTypeAny | null): string => {
  if (!schema) {
    console.warn(`getSchemaTypeName: missing schema`);
    return "Unknown";
  }

  const inner = unwrapPossibleWrappers(schema) ?? schema;
  const def = (inner as any)?._def;
  const fromDef = getTypeNameFromDef(def);
  if (fromDef) {
    return fromDef;
  }

  // last fallback: constructor name
  const ctor = (inner as any)?.constructor?.name;
  if (typeof ctor === "string" && ctor.length > 0) {
    if (ctor.startsWith("Zod")) return ctor;
    return `Zod${ctor}`;
  }

  console.warn("getSchemaTypeName: Unknown schema type for", inner);
  return "Unknown";
};

/** isOptional - uses unwrap + def introspection (avoids instanceof) */
export const isOptional = (sch?: z.ZodTypeAny | null): boolean => {
  if (!sch) return false;
  const def = (sch as any)?._def;
  const tn = getTypeNameFromDef(def);
  if (tn === "ZodOptional" || tn === "ZodNullable") return true;
  // unwrap and re-check
  const inner = unwrapPossibleWrappers(sch);
  const innerDef = (inner as any)?._def;
  const innerTn = getTypeNameFromDef(innerDef);
  return innerTn === "ZodOptional" || innerTn === "ZodNullable";
};

/** useTextarea - checks for a ZodString with a min check >= 50 */
export const useTextarea = (sch?: z.ZodTypeAny | null): boolean => {
  if (!sch) return false;
  const inner = unwrapPossibleWrappers(sch);
  if (!inner) return false;
  const typeName = getSchemaTypeName(inner);
  if (typeName !== "ZodString") return false;

  const checks = (inner as any)._def?.checks;
  if (!Array.isArray(checks)) return false;

  const minCheck = checks.find((c: any) => c.kind === "min" || c.kind === "minLength");
  const minVal = typeof minCheck?.value === "number" ? minCheck.value : undefined;
  return typeof minVal === "number" && minVal >= 50;
};

/** getDisplayLabel - prefer explicit labels, then schema description, then humanized name */
// export const getDisplayLabel = (schema: z.ZodTypeAny | undefined | null, name: string, labels?: Record<string, string>) => {
//   if (labels && labels[name]) return labels[name];

//   const def = (schema as any)?._def;
//   const desc = def?.description ?? def?.meta?.description;
//   if (typeof desc === "string" && desc.length > 0) return desc;

//   return name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
// };
export const getDisplayLabel = (
  schema: z.ZodTypeAny | undefined | null,
  name: string,
  labels?: Record<string, string>
) => {
  if (labels && labels[name]) return labels[name];

  const def = (schema as any)?._def;
  const desc = def?.description ?? def?.meta?.description;
  if (typeof desc === "string" && desc.length > 0) return desc;

  // Clean up the name: take only the last part after dot
  const cleanName = name.split('.').pop() || name;
  
  // Convert camelCase to Title Case with spaces
  return cleanName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());
};

/**
 * Check if a schema is a File-like object schema (e.g. shape has name/type/size fields)
 * This helps support backends that describe file uploads as objects instead of File instances.
 */
export const isFileLikeObject = (schema?: z.ZodTypeAny | null): boolean => {
  if (!schema) return false;
  const inner = unwrapPossibleWrappers(schema) ?? schema;
  const def = (inner as any)?._def;
  const tn = getTypeNameFromDef(def) ?? (inner as any)?.constructor?.name;
  if (tn !== 'ZodObject') return false;
  try {
    const shape = (inner as z.ZodObject<any>).shape;
    const maybeString = (s?: any) => !!s && (getTypeNameFromDef((s as any)?._def) === 'ZodString' || s instanceof z.ZodString);
    const maybeNumber = (s?: any) => !!s && (getTypeNameFromDef((s as any)?._def) === 'ZodNumber' || s instanceof z.ZodNumber);
    const hasName = maybeString(shape?.name) || maybeString(shape?.filename) || maybeString(shape?.fileName);
    const hasType = maybeString(shape?.type) || maybeString(shape?.mime) || maybeString(shape?.mimeType);
    const hasSize = maybeNumber(shape?.size) || maybeNumber(shape?.fileSize);
    // This is a heuristic: if it has at least name and size or name and type we consider it file-like
    return (hasName && (hasType || hasSize));
  } catch (e) {
    return false;
  }
};

/** Map a browser File to a plain JS object that matches a file-like object schema's shape
 * Only maps commonly used fields: name, type, size, lastModified, url (not filled)
 */
export const mapFileToSchemaObject = (schema?: z.ZodTypeAny | null, file?: File | null): Record<string, any> | undefined => {
  if (!schema || !file) return undefined;
  const inner = unwrapPossibleWrappers(schema) ?? schema;
  try {
    const shape = (inner as z.ZodObject<any>).shape;
    const out: Record<string, any> = {};
    // prefer common names but also fill alternate keys
    if (shape?.name) out.name = file.name;
    if (shape?.filename) out.filename = file.name;
    if (shape?.fileName) out.fileName = file.name;
    if (shape?.type) out.type = file.type;
    if (shape?.mime) out.mime = file.type;
    if (shape?.mimeType) out.mimeType = file.type;
    if (shape?.size) out.size = file.size;
    if (shape?.fileSize) out.fileSize = file.size;
    if (shape?.lastModified) out.lastModified = file.lastModified;
    if (shape?.lastModifiedDate) out.lastModifiedDate = new Date(file.lastModified).toISOString();
    if (shape?.url) out.url = '';
    return out;
  } catch (e) {
    return undefined;
  }
};

/**
 * generateDefaultValues - defensive generator using getSchemaTypeName
 * returns simple defaults ('' for string, 0 for number, false for boolean, [] for arrays, {} for object shapes)
 */
export const generateDefaultValues = (schema?: z.ZodTypeAny | null, depth = 0): any => {
  if (!schema) return undefined;
  if (depth > 20) return undefined;

  // if default wrapper, attempt to use provided default
  const tnOrig = getSchemaTypeName(schema);
  if (tnOrig === "ZodDefault") {
    try {
      const dv = (schema as any)._def?.defaultValue;
      return typeof dv === "function" ? dv() : dv;
    } catch {
      // fall through to unwrap
    }
  }

  const inner = unwrapPossibleWrappers(schema) ?? schema;
  const typeName = getSchemaTypeName(inner);

  if (typeName === "ZodString") return "";
  if (typeName === "ZodNumber") return 0;
  if (typeName === "ZodBoolean") return false;
  if (typeName === "ZodBigInt") return BigInt(0);
  if (typeName === "ZodSymbol") return Symbol();
  if (typeName === "ZodDate") return undefined;

  if (typeName === "ZodEnum") {
    const vals = (inner as any)?._def?.values;
    if (Array.isArray(vals) && vals.length > 0) return vals[0];
    return "";
  }
  if (typeName === "ZodNativeEnum") {
    const vals = Object.values((inner as any)?._def?.values ?? {});
    if (vals.length > 0) return vals[0];
    return "";
  }
  if (typeName === "ZodLiteral") {
    return (inner as any)?._def?.value;
  }
  if (typeName === "ZodObject") {
    const shape = (inner as z.ZodObject<any>).shape;
    const out: Record<string, any> = {};
    Object.entries(shape).forEach(([k, child]) => {
      out[k] = generateDefaultValues(child as z.ZodTypeAny, depth + 1);
    });
    return out;
  }
  if (typeName === "ZodArray") return [];
  if (typeName === "ZodTuple") {
    const items = (inner as any)?._def?.items ?? [];
    return items.map((it: z.ZodTypeAny) => generateDefaultValues(it, depth + 1));
  }
  if (typeName === "ZodRecord") return {};
  if (typeName === "ZodMap") return new Map();
  if (typeName === "ZodSet") return new Set();

  if (typeName === "ZodUnion") {
    const opt = (inner as any)?._def?.options?.[0];
    if (opt) return generateDefaultValues(opt, depth + 1);
    return undefined;
  }
  if (typeName === "ZodDiscriminatedUnion") {
    const opts = (inner as any)?.options ?? (inner as any)?._def?.options;
    if (Array.isArray(opts) && opts.length > 0) return generateDefaultValues(opts[0], depth + 1);
    return undefined;
  }
  if (typeName === "ZodIntersection") {
    const left = (inner as any)?._def?.left;
    const right = (inner as any)?._def?.right;
    return {
      ...(left ? generateDefaultValues(left, depth + 1) : {}),
      ...(right ? generateDefaultValues(right, depth + 1) : {}),
    };
  }

  // Files / custom => undefined (caller should render appropriate input)
  if (typeName === "ZodInstanceofFile" || typeName === "ZodInstanceofFileList" || typeName === "ZodCustom") {
    return undefined;
  }

  // Lazy: try to resolve
  if (typeName === "ZodLazy") {
    try {
      const resolved = (inner as any)?._def?.getter?.();
      return generateDefaultValues(resolved, depth + 1);
    } catch {
      return undefined;
    }
  }

  // fallback
  return undefined;
};
