import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { RenderField } from '../RenderField';

describe('RenderField file handling', () => {
  it('renders single File field and updates value on selection', async () => {
    const schema = z.instanceof(File);
    const TestWrapper: React.FC = () => {
      const methods = useForm({ defaultValues: { avatar: undefined } });
      return (
        <FormProvider {...methods}>
          <form>
            <RenderField schema={schema} name="avatar" control={methods.control} />
          </form>
        </FormProvider>
      );
    };

    const { container } = render(<TestWrapper />);
    const input = container.querySelector('input[type=file]') as HTMLInputElement;
    expect(input).toBeTruthy();

    const file = new File(['a'], 'a.png', { type: 'image/png' });
    await fireEvent.change(input, { target: { files: [file] } });
    // Should show Selected: a.png
    expect(container.textContent).toContain('Selected: a.png');
  });
});
