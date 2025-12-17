import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { RenderArrayField } from '../RenderArrayField';

describe('RenderArrayField file array behavior', () => {
  it('renders per-item add/remove UI and allows file selection for array of File', async () => {
    const schema = z.array(z.instanceof(File));

    const TestWrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { documents: [] } });
      return (
        <FormProvider {...methods}>
          <form>
            <RenderArrayField schema={schema} name="documents" control={methods.control} />
          </form>
        </FormProvider>
      );
    };

    const { container, getByText } = render(<TestWrapper />);
    // Find add button
    const addBtn = getByText(/Add Documents Item/i);
    expect(addBtn).toBeTruthy();

    // add first item
    await userEvent.click(addBtn);
    let inputs = container.querySelectorAll('input[type="file"]');
    expect(inputs.length).toBe(1);

    // set file on first input
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    await fireEvent.change(inputs[0], {
      target: { files: [file] },
    });
    // confirm 'Selected: test.txt' is rendered
    expect(container.textContent).toContain('Selected: test.txt');

    // add second item
    await userEvent.click(addBtn);
    inputs = container.querySelectorAll('input[type="file"]');
    expect(inputs.length).toBe(2);

  // set file on second input
    const file2 = new File(['world'], 'b.txt', { type: 'text/plain' });
    await fireEvent.change(inputs[1], { target: { files: [file2] } });
  // confirm 'Selected: b.txt' is rendered
  expect(container.textContent).toContain('Selected: b.txt');

    // confirm both file inputs exist and have name attributes (value cannot be read)
    expect(inputs[0]).toBeTruthy();
    expect(inputs[1]).toBeTruthy();
  });
  it('renders array of file-like objects and maps selection to object', async () => {
    const schema = z.array(z.object({ name: z.string(), size: z.number(), type: z.string() }));

    const TestWrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { documents: [] } });
      return (
        <FormProvider {...methods}>
          <form>
            <RenderArrayField schema={schema} name="documents" control={methods.control} />
          </form>
        </FormProvider>
      );
    };

    const { container, getByText } = render(<TestWrapper />);
    const addBtn = getByText(/Add Documents Item/i);
    await userEvent.click(addBtn);
    const inputs = container.querySelectorAll('input[type=file]');
    expect(inputs.length).toBe(1);
    const file = new File(['a'], 'doc.pdf', { type: 'application/pdf' });
    await fireEvent.change(inputs[0], { target: { files: [file] } });
    // Should map and show selected filename
    expect(container.textContent).toContain('Selected: doc.pdf');
  });
});
