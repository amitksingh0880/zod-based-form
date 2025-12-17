import React from 'react';
import * as z from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RenderArrayField } from './RenderArrayField';
import { MultiSelectField } from './MultiSelectField';
import { SchemaErrorBoundary } from './SchemaErrorBoundary';
import {
  isOptional,
  useTextarea,
  getSchemaTypeName,
  getDisplayLabel,
  isFileLikeObject,
  mapFileToSchemaObject,
} from './schemaParser';
import { Button } from '@/components/ui/button';
import { FileUpload as FileUploadUI } from '@/components/ui/file-upload';

// Helper component for field labels with optional indicator
const FieldLabel: React.FC<{ label: string; optional?: boolean }> = ({ label, optional }) => (
  <FormLabel className="flex items-center gap-2">
    {label}
    {optional && (
      <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
        Optional
      </Badge>
    )}
  </FormLabel>
);

// Helper component to render fields recursively
interface RenderFieldProps {
  schema: z.ZodTypeAny;
  name: string;
  control: any;
  labels?: Record<string, string>;
}

export const RenderField: React.FC<RenderFieldProps> = ({ schema, name, control, labels }) => {
  return (
    <SchemaErrorBoundary fieldName={name}>
      <RenderFieldContent schema={schema} name={name} control={control} labels={labels} />
    </SchemaErrorBoundary>
  );
};

const RenderFieldContent: React.FC<RenderFieldProps> = ({ schema, name, control, labels }) => {
  // Validate schema first
  if (!schema) {
    console.error(`No schema provided for field ${name}`);
    return (
      <FormItem>
        <FormLabel>Error: No Schema</FormLabel>
        <FormControl>
          <Input disabled placeholder={`No schema for ${name}`} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  if (!(schema instanceof z.ZodType)) {
    console.error(`Invalid schema type for field ${name}:`, typeof schema, schema);
    // Try to handle non-ZodType schemas gracefully
    if (schema && typeof schema === 'object' && '_def' in schema) {
      console.log(`Attempting to handle non-ZodType schema with _def:`, (schema as any)._def);
      // Continue processing if it has _def structure
    } else {
      return (
        <FormItem>
          <FormLabel>Error: Invalid Schema Type</FormLabel>
          <FormControl>
            <Input disabled placeholder={`Invalid schema type for ${name}: ${typeof schema}`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }
  }

  let innerSchema = schema;
  const optional = isOptional(schema);

  // Handle unwrapping for schemas that might not be proper ZodType instances
  try {
    // Zod has changed internals across versions: some builds use `_def.typeName`,
    // others use `_def.type` (with values like 'optional' / 'nullable').
    // Be tolerant and unwrap using multiple heuristics so optional/nullable
    // wrappers are correctly resolved to their inner schema.
    while (innerSchema && innerSchema._def) {
      const defAny = (innerSchema._def as any) || {};
      const typeIdentifier = defAny.typeName ?? defAny.type ?? defAny._type;

      const isOptionalWrapper = typeIdentifier === 'ZodOptional' || typeIdentifier === 'optional';
      const isNullableWrapper = typeIdentifier === 'ZodNullable' || typeIdentifier === 'nullable';

      if (!isOptionalWrapper && !isNullableWrapper) break;

      // Prefer the public unwrap() when available
      if ('unwrap' in innerSchema && typeof (innerSchema as any).unwrap === 'function') {
        innerSchema = (innerSchema as any).unwrap();
        continue;
      }

      // Common internal property names across versions
      if (defAny.innerType) {
        innerSchema = defAny.innerType;
        continue;
      }

      if (defAny.inner) {
        innerSchema = defAny.inner;
        continue;
      }

      if (defAny.schema) {
        innerSchema = defAny.schema;
        continue;
      }

      // Fallback to any known innerType-like keys
      const possibleInner = defAny.innerType || defAny.inner || defAny._def?.innerType || defAny._def?.inner;
      if (possibleInner) {
        innerSchema = possibleInner;
        continue;
      }

      break;
    }
  } catch (error) {
    console.warn(`Error unwrapping schema for ${name}:`, error);
  }

  const typeName = getSchemaTypeName(innerSchema);
  const displayLabel = getDisplayLabel(innerSchema, name, labels);
  console.log(`Rendering field: ${name}, type: ${typeName}, optional: ${optional}`);

  // Support file-like object schemas (object shapes that represent files) by being tolerant
  // and rendering them as file inputs. We then map the selected File instance to the object
  // shape expected by the schema.
  if (typeName === 'ZodObject' && isFileLikeObject(innerSchema)) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <FileUploadUI
                id={name}
                value={value}
                onChange={(v) => {
                  // v can be File | FileList | null
                  let file: File | null = null;
                  if (!v) {
                    onChange(undefined);
                    return;
                  }
                  if (typeof File !== 'undefined' && v instanceof File) file = v;
                  else if (v && typeof v === 'object' && 'item' in v && typeof v.item === 'function') file = (v as FileList).item(0);
                  else if (Array.isArray(v)) file = v[0] || null;

                  const mapped = mapFileToSchemaObject(innerSchema, file);
                  onChange(mapped ?? undefined);
                }}
                accept={undefined}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // Handle unknown types gracefully
  if (typeName === 'Unknown') {
    console.warn(`Unknown schema type for field ${name}, attempting to render as text input`);
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <Input
                id={name}
                {...field}
                placeholder={`Enter ${displayLabel}`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // Handle custom validators that actually implement file instance checks, e.g., z.custom(v => v instanceof File)
  if (typeName === 'ZodCustom') {
    try {
      const def = (innerSchema as any)?._def;
      const check = def?.check;

      // Heuristic helper to detect custom validators that are checking for File/FileList
      const detectFileCheck = (fn: unknown, fieldName?: string): 'single' | 'multiple' | false => {
        if (typeof fn !== 'function') return false;
        try {
          const s = String(fn).toLowerCase();

          // Common patterns for single File checks
          const singlePatterns = [
            'instanceof file',
            'instanceof blob',
            "constructor.name === \"file\"",
            'constructor.name==="file"',
            'new file(',
            'file.name',
            "'name' in v",
            'v.name',
            "value.name",
            'e.target.files ?',
            'blob.type',
            'file.type',
            'filereader',
            'readasdataurl',
            'readasarraybuffer'
          ];

          // Common patterns for multiple files / FileList checks
          const multiPatterns = [
            'instanceof filelist',
            'files.length',
            'filelist.length',
            'array.from',
            'every(v => v instanceof file)',
            'every(value => value instanceof file)',
            'files && files.every',
            'filelist &&',
            'files)',
            'files,'
          ];

          for (const p of multiPatterns) if (s.includes(p)) return 'multiple';
          for (const p of singlePatterns) if (s.includes(p)) return 'single';

          // Additional fallback checks: property checks that often indicate files
          if (s.includes('.size') && (s.includes('.name') || s.includes('.type') || s.includes('name'))) return 'single';
          if (s.includes('files') && (s.includes('.length') || s.includes('every(') || s.includes('map('))) return 'multiple';
          if ((s.includes('formdata') || s.includes('append(') || s.includes('formdata.append')) && s.includes('files')) return 'multiple';

          // Some validators use phrasing like "is file" or "is an image"
          if (s.includes('image') && (s.includes('file') || s.includes('blob') || s.includes('type'))) return 'single';

          // As a last resort, infer from the field name if available
          if (fieldName && typeof fieldName === 'string') {
            const n = fieldName.toLowerCase();
            const multipleNameHints = ['files', 'multifiles', 'attachments', 'photos', 'images', 'docs', 'documents', 'list'];
            for (const hint of multipleNameHints) if (n.includes(hint)) return 'multiple';
            const singleNameHints = ['file', 'avatar', 'photo', 'image', 'resume', 'cv', 'document', 'doc', 'upload'];
            for (const hint of singleNameHints) if (n.includes(hint)) return 'single';
          }
        } catch (e) {
          // If something goes wrong just continue gracefully
        }
        return false;
      };

      let fileCheck = detectFileCheck(check, name);
      console.log(`ZodCustom check detected for ${name}:`, fileCheck);

      // Final fallback: infer from the field name if detector couldn't decide.
      if (!fileCheck && typeof name === 'string') {
        const n = name.toLowerCase();
        const multiHints = ['files', 'multifiles', 'attachments', 'photos', 'images', 'docs', 'documents', 'list'];
        const singleHints = ['file', 'avatar', 'photo', 'image', 'resume', 'cv', 'document', 'doc', 'upload'];
        for (const h of multiHints) if (n.includes(h)) { fileCheck = 'multiple'; break; }
        if (!fileCheck) for (const h of singleHints) if (n.includes(h)) { fileCheck = 'single'; break; }
        console.log(`ZodCustom name-based fallback for ${name}:`, fileCheck);
      }

      if (fileCheck === 'single') {
        // Render single File input using modern UI
        return (
          <FormField
            control={control}
            name={name}
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FieldLabel label={displayLabel} optional={optional} />
                <FormControl>
                  <FileUploadUI
                    id={name}
                    value={value}
                    onChange={(v) => {
                      if (!v) return onChange(undefined);
                      if (typeof File !== 'undefined' && v instanceof File) return onChange(v);
                      if (v && 'item' in v && typeof v.item === 'function') return onChange((v as FileList).item(0));
                      if (Array.isArray(v)) return onChange(v[0] || null);
                      onChange(v);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      }

      if (fileCheck === 'multiple') {
        // Render multiple files input using modern UI
        return (
          <FormField
            control={control}
            name={name}
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FieldLabel label={displayLabel} optional={optional} />
                <FormControl>
                  <FileUploadUI id={name} multiple value={value} onChange={(v) => onChange(v)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      }
    } catch (err) {
      console.warn('Error introspecting custom validator', err);
    }
  }

  if (typeName === 'ZodString') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          console.log(`String field value for ${name}:`, field.value);
          return (
            <FormItem>
              <FieldLabel label={displayLabel} optional={optional} />
              <FormControl>
                {useTextarea(innerSchema) ? (
                  <Textarea id={name} {...field} placeholder={`Enter ${displayLabel}`} />
                ) : (
                  <Input id={name} {...field} placeholder={`Enter ${displayLabel}`} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }

  if (typeName === 'ZodNumber') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <Input
                id={name}
                type="number"
                {...field}
                onChange={(e) => {
                  const val = e.target.value;
                  console.log(`Number field ${name} changed to:`, val);
                  field.onChange(val === '' ? undefined : Number(val));
                }}
                placeholder={`Enter ${displayLabel}`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodBoolean') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={(value) => {
                  console.log(`Boolean field ${name} changed to:`, value);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FieldLabel label={displayLabel} optional={optional} />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // if (typeName === 'ZodEnum') {
  //   const values = (innerSchema as z.ZodEnum<any>)._def.values;
  //   if (!values || !Array.isArray(values) || values.length === 0) {
  //     console.warn(`ZodEnum for ${name} has no valid values, rendering as disabled input`);
  //     return (
  //       <FormItem>
  //         <FormLabel>{displayLabel}{optional ? ' (optional)' : ''}</FormLabel>
  //         <FormControl>
  //           <Input disabled placeholder={`No valid options for ${displayLabel}`} />
  //         </FormControl>
  //         <FormMessage />
  //       </FormItem>
  //     );
  //   }

  //   // Check if this is an array of enums (multi-select)
  //   const isArrayEnum = name.includes('categories') || name.includes('tags') || name.includes('hobbies');

  //   if (isArrayEnum) {
  //     // Multi-select for array enums
  //     return (
  //       <MultiSelectField
  //         name={name}
  //         control={control}
  //         options={values}
  //         displayLabel={displayLabel}
  //         optional={optional}
  //       />
  //     );
  //   } else {
  //     // Single select for regular enums
  //   return (
  //     <FormField
  //       control={control}
  //       name={name}
  //       render={({ field }) => (
  //         <FormItem>
  //           <FormLabel>{displayLabel}{optional ? ' (optional)' : ''}</FormLabel>
  //           <Select
  //             onValueChange={(value) => {
  //               console.log(`Enum field ${name} changed to:`, value);
  //               field.onChange(value);
  //             }}
  //             value={field.value || ''}
  //           >
  //             <FormControl>
  //               <SelectTrigger id={name}>
  //                 <SelectValue placeholder={`Select ${displayLabel}`} />
  //               </SelectTrigger>
  //             </FormControl>
  //             <SelectContent>
  //               {values.map((option: string) => (
  //                 <SelectItem key={option} value={option}>
  //                   {option}
  //                 </SelectItem>
  //               ))}
  //             </SelectContent>
  //           </Select>
  //           <FormMessage />
  //         </FormItem>
  //       )}
  //     />
  //   );
  //   }
  // }
  if (typeName === 'ZodEnum') {
    const options = (innerSchema as z.ZodEnum<any>).options;
    if (!options || !Array.isArray(options) || options.length === 0) {
      console.warn(`ZodEnum for ${name} has no valid options, rendering as disabled input`);
      return (
        <FormItem>
          <FieldLabel label={displayLabel} optional={optional} />
          <FormControl>
            <Input disabled placeholder={`No valid options for ${displayLabel}`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }

    // Check if this is an array of enums (multi-select)
    const isArrayEnum = name.includes('categories') || name.includes('tags') || name.includes('hobbies');

    if (isArrayEnum) {
      // Multi-select for array enums
      return (
        <MultiSelectField
          name={name}
          control={control}
          options={options}
          displayLabel={displayLabel}
          optional={optional}
        />
      );
    } else {
      // Single select for regular enums
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FieldLabel label={displayLabel} optional={optional} />
              <Select
                onValueChange={(value) => {
                  console.log(`Enum field ${name} changed to:`, value);
                  field.onChange(value);
                }}
                value={field.value || ''}
              >
                <FormControl>
                  <SelectTrigger id={name}>
                    <SelectValue placeholder={`Select ${displayLabel}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option: string) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
  }
  if (typeName === 'ZodDate') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FieldLabel label={displayLabel} optional={optional} />
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id={name}
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (field.value as Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    console.log(`Date field ${name} changed to:`, date);
                    field.onChange(date);
                  }}
                  disabled={(date) => date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodInstanceofFile') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <FileUploadUI
                id={name}
                value={value}
                onChange={(v) => {
                  if (!v) return onChange(undefined);
                  if (typeof File !== 'undefined' && v instanceof File) return onChange(v);
                  if (v && 'item' in v && typeof v.item === 'function') return onChange((v as FileList).item(0));
                  if (Array.isArray(v)) return onChange(v[0] || null);
                  onChange(v);
                }}
              />
            </FormControl>
            {value && (
              <div className="mt-2 space-y-2">
                <p className="text-sm text-muted-foreground">Selected: {value.name}</p>
                {value.type.startsWith('image/') && (
                  <img
                    src={URL.createObjectURL(value)}
                    alt="Preview"
                    className="rounded-md border w-32 h-32 object-cover"
                  />
                )}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodInstanceofFileList') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <FileUploadUI id={name} multiple value={value} onChange={(v) => onChange(v)} />
            </FormControl>
            {value && (
              <div className="mt-2 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Selected: {Array.from(value as FileList).map((file) => file.name).join(', ')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(value as FileList)
                    .filter((file) => file.type.startsWith('image/'))
                    .map((file, index: number) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="rounded-md border w-32 h-32 object-cover"
                      />
                    ))}
                </div>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // Heuristic: some backends represent files as objects (e.g. {name, type, size}).
  // Detect those and render a file input that maps the selected File to the object shape.
  if (typeName === 'ZodObject' && isFileLikeObject(innerSchema)) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <FileUploadUI
                id={name}
                value={value}
                onChange={(v) => {
                  if (!v) return onChange(undefined);
                  let file: File | null = null;
                  if (typeof File !== 'undefined' && v instanceof File) file = v;
                  else if (v && 'item' in v && typeof v.item === 'function') file = (v as FileList).item(0);
                  else if (Array.isArray(v)) file = v[0] || null;

                  const mapped = mapFileToSchemaObject(innerSchema, file as File | null);
                  onChange(mapped ?? undefined);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodUnion') {
    const options = (innerSchema as z.ZodUnion<any>).options;
    console.log(`Rendering union field ${name} with ${options.length} options`);

    // For simple unions, try to render the first option
    if (options.length === 1) {
      return <RenderField schema={options[0] as z.ZodTypeAny} name={name} control={control} labels={labels} />;
    }

    // For multiple options, render a select to choose the type
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <Select
              onValueChange={(value) => {
                console.log(`Union field ${name} changed to:`, value);
                field.onChange(value);
              }}
              value={field.value || ''}
            >
              <FormControl>
                <SelectTrigger id={name}>
                  <SelectValue placeholder={`Select ${displayLabel}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option: z.ZodTypeAny, index: number) => {
                  const optionType = getSchemaTypeName(option);
                  return (
                    <SelectItem key={index} value={optionType}>
                      {optionType}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodDiscriminatedUnion') {
    const options = (innerSchema as any).options;
    const discriminator = (innerSchema as any).discriminator;
    console.log(`Rendering discriminated union field ${name} with discriminator: ${discriminator}`);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <Select
              onValueChange={(value) => {
                console.log(`Discriminated union field ${name} changed to:`, value);
                field.onChange(value);
              }}
              value={field.value || ''}
            >
              <FormControl>
                <SelectTrigger id={name}>
                  <SelectValue placeholder={`Select ${displayLabel}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option: z.ZodTypeAny, index: number) => {
                  const optionType = getSchemaTypeName(option);
                  return (
                    <SelectItem key={index} value={optionType}>
                      {optionType}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodIntersection') {
    const left = (innerSchema as any)._def.left;
    const right = (innerSchema as any)._def.right;
    console.log(`Rendering intersection field ${name}`);

    return (
      <Card className="border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            {displayLabel}
            {optional && (
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                Optional
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RenderField schema={left} name={`${name}.left`} control={control} labels={labels} />
            <RenderField schema={right} name={`${name}.right`} control={control} labels={labels} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (typeName === 'ZodLiteral') {
    const value = (innerSchema as any)._def.value;
    console.log(`Rendering literal field ${name} with value:`, value);

    return (
      <FormItem>
        <FieldLabel label={displayLabel} optional={optional} />
        <FormControl>
          <Input
            id={name}
            value={value}
            disabled
            placeholder={`Literal value: ${value}`}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }

  if (typeName === 'ZodNativeEnum') {
    const values = Object.values((innerSchema as any)._def.values);
    if (!values || values.length === 0) {
      console.warn(`ZodNativeEnum for ${name} has no valid values, rendering as disabled input`);
      return (
        <FormItem>
          <FieldLabel label={displayLabel} optional={optional} />
          <FormControl>
            <Input disabled placeholder={`No valid options for ${displayLabel}`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <Select
              onValueChange={(value) => {
                console.log(`NativeEnum field ${name} changed to:`, value);
                field.onChange(value);
              }}
              value={field.value || ''}
            >
              <FormControl>
                <SelectTrigger id={name}>
                  <SelectValue placeholder={`Select ${displayLabel}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {values.map((option: any) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodObject') {
    return (
      <Card className="border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            {displayLabel}
            {optional && (
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                Optional
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries((innerSchema as z.ZodObject<any>).shape).map(([key, childSchema]) => (
              <RenderField
                key={`${name}.${key}`}
                schema={childSchema as z.ZodTypeAny}
                name={`${name}.${key}`}
                control={control}
                labels={labels}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (typeName === "ZodArray") {
    return (
      <RenderArrayField
        name={name}
        control={control}
        label={labels?.[name]}
      />
    );
  }


  if (typeName === 'ZodTuple') {
    const items = (innerSchema as any)._def.items;
    console.log(`Rendering tuple field ${name} with ${items.length} items`);

    return (
      <Card className="border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            {displayLabel}
            {optional && (
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                Optional
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">Tuple</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item: z.ZodTypeAny, index: number) => (
              <RenderField
                key={index}
                schema={item}
                name={`${name}.${index}`}
                control={control}
                labels={labels}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (typeName === 'ZodRecord') {
    console.log(`Rendering record field ${name}`);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <Textarea
                id={name}
                placeholder="Enter key-value pairs as JSON (e.g., {&quot;key1&quot;: &quot;value1&quot;, &quot;key2&quot;: &quot;value2&quot;})"
                value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    field.onChange(parsed);
                  } catch (error) {
                    // Keep the raw value for editing
                    field.onChange(e.target.value);
                  }
                }}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodMap') {
    console.log(`Rendering map field ${name}`);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <Textarea
                id={name}
                placeholder="Enter key-value pairs as JSON array (e.g., [[&quot;key1&quot;, &quot;value1&quot;], [&quot;key2&quot;, &quot;value2&quot;]])"
                value={field.value ? JSON.stringify(Array.from(field.value), null, 2) : ''}
                onChange={(e) => {
                  try {
                    const parsed = new Map(JSON.parse(e.target.value));
                    field.onChange(parsed);
                  } catch (error) {
                    // Keep the raw value for editing
                    field.onChange(e.target.value);
                  }
                }}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodSet') {
    console.log(`Rendering set field ${name}`);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <Textarea
                id={name}
                placeholder="Enter values as JSON array (e.g., [&quot;value1&quot;, &quot;value2&quot;, &quot;value3&quot;])"
                value={field.value ? JSON.stringify(Array.from(field.value), null, 2) : ''}
                onChange={(e) => {
                  try {
                    const parsed = new Set(JSON.parse(e.target.value));
                    field.onChange(parsed);
                  } catch (error) {
                    // Keep the raw value for editing
                    field.onChange(e.target.value);
                  }
                }}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodBigInt') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <Input
                id={name}
                type="text"
                {...field}
                onChange={(e) => {
                  const val = e.target.value;
                  console.log(`BigInt field ${name} changed to:`, val);
                  try {
                    field.onChange(val === '' ? undefined : BigInt(val));
                  } catch (error) {
                    // Keep as string for editing
                    field.onChange(val);
                  }
                }}
                placeholder={`Enter ${displayLabel} (BigInt)`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodSymbol') {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FieldLabel label={displayLabel} optional={optional} />
            <FormControl>
              <Input
                id={name}
                type="text"
                {...field}
                onChange={(e) => {
                  const val = e.target.value;
                  console.log(`Symbol field ${name} changed to:`, val);
                  field.onChange(val === '' ? undefined : Symbol(val));
                }}
                placeholder={`Enter ${displayLabel} (Symbol)`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (typeName === 'ZodLazy') {
    try {
      const resolved = (innerSchema as any)._def.getter();
      console.log(`Rendering lazy field ${name}, resolved to:`, getSchemaTypeName(resolved));
      return <RenderField schema={resolved} name={name} control={control} labels={labels} />;
    } catch (error) {
      console.warn(`Failed to resolve lazy schema for ${name}:`, error);
      return (
        <FormItem>
          <FieldLabel label={displayLabel} optional={optional} />
          <FormControl>
            <Input disabled placeholder={`Cannot resolve lazy schema for ${displayLabel}`} />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    }
  }

  console.warn(`Unsupported schema type for ${name}:`, innerSchema);
  return (
    <FormItem>
      <FormLabel>{displayLabel}{optional ? ' (optional)' : ''}</FormLabel>
      <FormControl>
        <Input disabled placeholder={`Unsupported type: ${typeName}`} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};