import { describe, it, expect } from 'vitest';
import * as z from 'zod';
import { getSchemaTypeName, generateDefaultValues } from '../schemaParser';

describe('schemaParser file detection', () => {
  it('detects z.instanceof(File) as ZodInstanceofFile', () => {
    const schema = z.instanceof(File);
    const tn = getSchemaTypeName(schema);
    expect(tn).toBe('ZodInstanceofFile');
  });

  it('detects z.instanceof(FileList) as ZodInstanceofFileList', () => {
    const schema = z.instanceof(FileList as any);
    const tn = getSchemaTypeName(schema);
    expect(tn).toBe('ZodInstanceofFileList');
  });

  it('generates default for array of File as []', () => {
    const schema = z.array(z.instanceof(File));
    const dv = generateDefaultValues(schema);
    expect(Array.isArray(dv)).toBe(true);
    expect(dv.length).toBe(0);
  });

  it('detects z.custom(v => v instanceof File) as ZodInstanceofFile', () => {
    const schema = z.custom((v) => (v as any) instanceof File);
    const tn = getSchemaTypeName(schema);
    expect(tn).toBe('ZodInstanceofFile');
  });

  it('detects z.custom(v => typeof v === "object" && v.name && v.size) as ZodInstanceofFile', () => {
    const schema = z.custom((v) => typeof v === 'object' && (v as any)?.name && (v as any)?.size);
    const tn = getSchemaTypeName(schema);
    expect(tn).toBe('ZodInstanceofFile');
  });

  it('detects z.custom(v => Array.isArray(v) && v.every(x => x instanceof File)) as ZodInstanceofFileList', () => {
    const schema = z.custom((v) => Array.isArray(v) && (v as any).every((x: any) => x instanceof File));
    const tn = getSchemaTypeName(schema);
    expect(tn).toBe('ZodInstanceofFileList');
  });
});
