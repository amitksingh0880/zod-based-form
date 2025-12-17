import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { RenderField } from '../RenderField';

describe('RenderField file-like object handling', () => {
  it('renders a file input for a file-like object schema and maps selection to object', async () => {
    const schema = z.object({ name: z.string(), size: z.number(), type: z.string() });
    const TestWrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { document: undefined } });
      return (
        <FormProvider {...methods}>
          <form>
            <RenderField schema={schema} name="document" control={methods.control} />
          </form>
        </FormProvider>
      );
    };

    const { container } = render(<TestWrapper />);
    const input = container.querySelector('input[type=file]') as HTMLInputElement;
    expect(input).toBeTruthy();

    const file = new File(['a'], 'a.pdf', { type: 'application/pdf' });
    await fireEvent.change(input, { target: { files: [file] } });
    expect(container.textContent).toContain('Selected: a.pdf');
  });

  it('accepts file-like object schema with alternate keys (filename, mimeType, fileSize)', async () => {
    const schema = z.object({ filename: z.string(), mimeType: z.string(), fileSize: z.number() });
    const TestWrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { document: undefined } });
      return (
        <FormProvider {...methods}>
          <form>
            <RenderField schema={schema} name="document" control={methods.control} />
          </form>
        </FormProvider>
      );
    };

    const { container } = render(<TestWrapper />);
    const input = container.querySelector('input[type=file]') as HTMLInputElement;
    expect(input).toBeTruthy();
    const file = new File(['a'], 'invoice.pdf', { type: 'application/pdf' });
    await fireEvent.change(input, { target: { files: [file] } });
    expect(container.textContent).toContain('Selected: invoice.pdf');
  });
});
