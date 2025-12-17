# Dynamic Form System

This folder contains a schema-driven form system built with React, TypeScript, Zod, and react-hook-form. It renders forms from Zod schemas, supports many field types, and provides a consistent, responsive UI using the local shadcn-style component library.

## Key components

- `DynamicForm.tsx`
  - Top-level form renderer accepting a Zod object schema and optional labels.
  - Features
    - Responsive layout: simple scalar fields in a two-column grid; complex fields (objects, arrays, unions, tuples) full-width.
    - Collapsible error summary under the header.
    - Submit button with submitting state.
    - Loading state with Skeleton placeholders.
  - Props
    - `schema: ZodTypeAny` – Zod object schema for the form (required; non-objects are wrapped for single-field usage).
    - `onSubmit: (data) => void` – submit handler (uses zodResolver + react-hook-form internally).
    - `labels?: Record<string, string>` – overrides for field display labels (by path).
    - `title?: string` – card title (default: "Form").
    - `submitLabel?: string` – submit button label (default: "Submit").
    - `className?: string` – extra class for the outer Card.
    - `defaultShowErrors?: boolean` – initial state of error summary (default: true).
    - `loading?: boolean` – when true, form body shows skeleton placeholders.

- `util/RenderField.tsx`
  - Recursively renders fields for many Zod types with consistent UI:
    - Scalars: string (textarea auto when long), number, boolean, date (full-width button + popover calendar), bigint, symbol.
    - Enums: ZodEnum + NativeEnum (single select); basic multi-select supported for typical array-enum names.
    - Files: File and FileList with previews for images.
    - Complex types: object, array, tuple, union, discriminated union, intersection, record, map, set, literal, lazy.
  - UX details
    - Consistent `FieldLabel` with an "Optional" badge for optional fields.
    - Lighter Cards for complex types with subtle badges (e.g., "Tuple").
    - Date picker uses native `toLocaleDateString` for display to avoid date-fns subpath type issues.

- `util/RenderArrayField.tsx`
  - Renders array fields with a clean, compact design.
  - Features
    - Header badges for type and item count.
    - Empty-state dashed border message.
    - Each item in a bordered block with index badge and a ghost icon remove button.
    - Full-width outlined "Add" button with plus icon.

- `util/MultiSelectField.tsx`
  - Renders checkbox-based multi-select with selected chips at the top.
  - Enhancements
    - FieldLabel with optional badge.
    - Selected badges with small icon remove buttons and clearer hover states.
    - Responsive grid for options with padded, hoverable rows.

- `util/schemaParser.ts`
  - Helpers for display labels, type detection, and default value generation.
  - `FormValues<T>` = `z.infer<T>` for schema-based typing.

## Usage

Minimal example using `DynamicForm`:

```tsx
import * as z from 'zod'
import { DynamicForm } from '@/common/form/DynamicForm'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  newsletter: z.boolean().optional(),
  birthday: z.date().optional(),
})

export default function Page() {
  return (
    <DynamicForm
      title="Create account"
      submitLabel="Create"
      schema={schema}
      onSubmit={(data) => console.log(data)}
    />
  )
}
```

Loading state example:

```tsx
<DynamicForm
  loading
  title="Create account"
  submitLabel="Create"
  schema={schema}
  onSubmit={() => {}}
/>
```

Label overrides:

```tsx
<DynamicForm
  schema={schema}
  labels={{
    name: 'Full name',
    email: 'Work email',
  }}
  onSubmit={(data) => console.log(data)}
/>
```

## Field type coverage

- Strings (auto textarea for long content)
- Numbers
- Booleans (checkbox)
- Dates (button + calendar popover, full-width)
- ZodEnum & NativeEnum (single select)
- Array of items (with add/remove)
- Object (nested fields)
- Tuple
- Union & Discriminated Union (type pickers)
- Intersection (left/right rendering)
- Record/Map/Set (JSON textareas with basic parsing)
- Literal (read-only input)
- BigInt, Symbol (string entry with casting)
- File / FileList (with image previews)
- Lazy schemas (resolved when possible)

## Error handling

- Errors are collected recursively and shown in a collapsible summary area under the header when present.
- Inline errors are shown via `FormMessage` per field.

## Layout and spacing

- Simple scalar fields are rendered in a two-column grid for better density.
- Complex containers are rendered full-width with lighter Cards and badges.
- Submit button is full-width by default for simplicity.

## Storybook

- A dedicated loading story is available in `packages/ui/src/components/stories/Form.stories.tsx` as `DynamicFormLoading`.
- Complex examples also exist in the same file to demonstrate realistic forms.

## Notes / decisions

- Date formatting uses `toLocaleDateString` to avoid date-fns v4 subpath TS declaration quirks.
- Optional fields are marked with a subtle "Optional" badge instead of text suffixes.
- Array items are compact, with index badges and ghost icon remove buttons.

## Future enhancements

- Reorder for arrays (drag-and-drop).
- Searchable/selectable multi-select with a combobox-style input.
- Scroll-to-field on error item click in the summary.
- Async schema/default values loading helper hook.
