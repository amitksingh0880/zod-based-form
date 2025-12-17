import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { RenderField } from '../RenderField';

describe('RenderField custom validators for files', () => {
  it('renders file input for z.custom instance of File', async () => {
    const schema = z.custom((v) => v instanceof File);
    const TestWrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { resume: undefined } });
      return (
        <FormProvider {...methods}>
          <form>
            <RenderField schema={schema} name="resume" control={methods.control} />
          </form>
        </FormProvider>
      );
    };

    const { container } = render(<TestWrapper />);
    const input = container.querySelector('input[type=file]') as HTMLInputElement;
    expect(input).toBeTruthy();

    const file = new File(['a'], 'cv.pdf', { type: 'application/pdf' });
    await fireEvent.change(input, { target: { files: [file] } });
    expect(container.textContent).toContain('Selected: cv.pdf');
  });

  it('renders multiple files input for z.custom FileList', async () => {
    const schema = z.custom((v) => v instanceof FileList);
    const TestWrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { docs: undefined } });
      return (
        <FormProvider {...methods}>
          <form>
            <RenderField schema={schema} name="docs" control={methods.control} />
          </form>
        </FormProvider>
      );
    };

    const { container } = render(<TestWrapper />);
    const input = container.querySelector('input[type=file]') as HTMLInputElement;
    expect(input).toBeTruthy();

    const f1 = new File(['a'], 'a.txt', { type: 'text/plain' });
    const f2 = new File(['b'], 'b.txt', { type: 'text/plain' });
    await fireEvent.change(input, { target: { files: [f1, f2] } });
    expect(container.textContent).toContain('Selected: a.txt, b.txt');
  });
});
