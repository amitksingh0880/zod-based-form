import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormValues, generateDefaultValues, getDisplayLabel } from './util/schemaParser';
import { RenderField } from './util/RenderField';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { JsonPopup } from '@/components/ui/json-popup';
import { toast } from 'sonner';

// Main DynamicForm component
interface DynamicFormProps<T extends z.ZodTypeAny> {
  schema: T;
  onSubmit: (data: FormValues<T>) => void;
  labels?: Record<string, string>;
  /** Optional title for the form card */
  title?: string;
  /** Custom label for the submit button (defaults to "Submit") */
  submitLabel?: string;
  /** Additional className for the outer Card wrapper */
  className?: string;
  /** Whether error summary is initially expanded (default true) */
  defaultShowErrors?: boolean;
  /** Show skeleton loading state instead of the form */
  loading?: boolean;
}

export const DynamicForm = <T extends z.ZodTypeAny>({
  schema,
  onSubmit,
  labels,
  title = 'Form',
  submitLabel = 'Submit',
  className,
  defaultShowErrors = true,
  loading = false,
}: DynamicFormProps<T>) => {
  // Validate and prepare schema
  if (!schema || !(schema instanceof z.ZodType)) {
    console.error(`Invalid schema passed to DynamicForm:`, schema);
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Form Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">Invalid form schema provided. Schema must be a valid Zod type.</p>
        </CardContent>
      </Card>
    );
  }

  // Check if schema is a ZodObject (required for form generation)
  let schemaToUse: z.ZodTypeAny = schema as unknown as z.ZodTypeAny;
  if (!(schema instanceof z.ZodObject)) {
    // Try to wrap non-object schemas in an object
    if (schema instanceof z.ZodString || schema instanceof z.ZodNumber || schema instanceof z.ZodBoolean) {
      console.warn(`Single field schema detected, wrapping in object`);
      schemaToUse = z.object({ value: schema as unknown as z.ZodTypeAny });
    } else {
      console.error(`Schema must be a ZodObject for form generation:`, schema);
      return (
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Form Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">
              Schema must be a ZodObject for form generation.
              Current type: {(schema as any)?._def?.typeName || 'Unknown'}
            </p>
          </CardContent>
        </Card>
      );
    }
  }

  const defaultValues = generateDefaultValues(schemaToUse);
  const methods = useForm<any>({
    resolver: zodResolver(schemaToUse as any) as any,
    defaultValues: defaultValues as any,
  });

  const { handleSubmit, control, formState: { isSubmitting, errors } } = methods;

  // Popup state for showing submitted JSON
  const [popupData, setPopupData] = useState<any | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  // Error summary
  const [errorSummary, setErrorSummary] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState<boolean>(defaultShowErrors);
  useEffect(() => {
    const allErrors: string[] = [];
    const collectErrors = (errObj: any, path: string = '') => {
      Object.entries(errObj as Record<string, unknown>).forEach(([key, error]) => {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof error === 'object' && error !== null && 'message' in (error as any)) {
          allErrors.push(`${getDisplayLabel(undefined, newPath, labels)}: ${(error as any).message}`);
        } else if (typeof error === 'object' && error !== null) {
          collectErrors(error, newPath);
        }
      });
    };
    collectErrors(errors);
    setErrorSummary(allErrors);
  }, [errors, labels]);


  // Heuristic to determine if schema should span full width (complex container)
  const isComplex = (s: z.ZodTypeAny): boolean => {
    return (
      s instanceof z.ZodObject ||
      s instanceof z.ZodArray ||
      s instanceof z.ZodUnion ||
      s instanceof z.ZodDiscriminatedUnion ||
      s instanceof z.ZodIntersection ||
      s instanceof z.ZodRecord ||
      s instanceof z.ZodMap ||
      s instanceof z.ZodTuple ||
      s instanceof z.ZodSet
    );
  };

  const shapeEntries = Object.entries((schemaToUse as unknown as z.ZodObject<any>).shape);
  const simpleEntries = shapeEntries.filter(([, sch]) => !isComplex(sch as z.ZodTypeAny));
  const complexEntries = shapeEntries.filter(([, sch]) => isComplex(sch as z.ZodTypeAny));

  return (
    <Card className={cn('w-full max-w-4xl mx-auto', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          {errorSummary.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowErrors(e => !e)}
              className="shrink-0"
            >
              {showErrors ? 'Hide Errors' : `Show Errors (${errorSummary.length})`}
            </Button>
          )}
        </div>
        {errorSummary.length > 0 && showErrors && (
          <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
            <p className="mb-2 font-medium text-destructive flex items-center justify-between">
              {errorSummary.length} {errorSummary.length === 1 ? 'error' : 'errors'} found
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {errorSummary.map((error, index) => (
                <li key={index} className="text-destructive/90">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-5 w-40" />
              <div className="space-y-3">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <FormProvider {...methods}>
            <Form {...methods}>
              <form
                onSubmit={handleSubmit((data) => {
                  // show popup with JSON
                  try {
                    setPopupData(data);
                    setPopupOpen(true);
                    // toast.success('Form submitted successfully'); // Will add import above
                  } catch (e) {
                    // ignore
                  }
                  // still call user's onSubmit
                  try {
                    onSubmit && onSubmit(data);
                  } catch (err) {
                    // ignore
                  }
                })}
                className="space-y-10"
              >
                {/* Simple scalar fields grid */}
                {simpleEntries.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {simpleEntries.map(([key, childSchema]) => (
                      <div key={key} className="min-w-0">
                        <RenderField
                          schema={childSchema as z.ZodTypeAny}
                          name={key}
                          control={control}
                          labels={labels}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Complex container fields full width */}
                {complexEntries.map(([key, childSchema]) => (
                  <div key={key} className="space-y-6">
                    <RenderField
                      schema={childSchema as z.ZodTypeAny}
                      name={key}
                      control={control}
                      labels={labels}
                    />
                  </div>
                ))}

                <div className="pt-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Submitting…' : submitLabel}
                  </Button>
                </div>
              </form>
              <JsonPopup data={popupData} open={popupOpen} onClose={() => setPopupOpen(false)} />
            </Form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  );
};