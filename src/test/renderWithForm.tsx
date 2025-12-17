import React from 'react'
import { render } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'

type Options = { defaultValues?: Record<string, any> }

export function renderWithForm(
  ui: (control: any) => React.ReactElement,
  opts: Options = {}
) {
  function Wrapper() {
    const methods = useForm({ defaultValues: opts.defaultValues ?? {} })
    return <FormProvider {...methods}>{ui(methods.control)}</FormProvider>
  }
  return render(<Wrapper />)
}
