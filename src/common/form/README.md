# Dynamic Form Builder

A comprehensive React component system for generating forms dynamically from Zod schemas. This system supports all Zod schema types and provides a robust, type-safe form generation experience.

## Features

### ✅ Supported Zod Types

- **Basic Types**: `ZodString`, `ZodNumber`, `ZodBoolean`, `ZodDate`
- **Enum Types**: `ZodEnum`, `ZodNativeEnum`, `ZodLiteral`
- **Complex Types**: `ZodObject`, `ZodArray`, `ZodTuple`, `ZodRecord`
- **Collection Types**: `ZodMap`, `ZodSet`
- **Union Types**: `ZodUnion`, `ZodDiscriminatedUnion`, `ZodIntersection`
- **Advanced Types**: `ZodBigInt`, `ZodSymbol`, `ZodLazy`
- **File Types**: `ZodInstanceofFile`, `ZodInstanceofFileList`
- **Special Types**: `ZodAny`, `ZodUnknown`, `ZodVoid`, `ZodNever`

### 🎯 Key Features

- **Automatic Form Generation**: Generate complete forms from Zod schemas
- **Type Safety**: Full TypeScript support with proper type inference
- **Validation**: Built-in validation using Zod and React Hook Form
- **Error Handling**: Comprehensive error display and handling
- **Custom Labels**: Support for custom field labels and descriptions
- **Nested Objects**: Full support for nested object structures
- **Array Management**: Dynamic array field management with add/remove
- **File Uploads**: Support for single and multiple file uploads
  - Also handles 'file-like' object schemas (e.g. { name, type, size, url }) by rendering a file input and mapping the selected File to the expected object shape.
- **Date Pickers**: Integrated date picker components
- **Responsive Design**: Mobile-friendly responsive layout

## Usage

### Basic Usage

```tsx
import { DynamicForm } from '@/common/form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(18, 'Must be at least 18'),
  email: z.string().email('Invalid email'),
  isActive: z.boolean(),
});

function MyForm() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log('Form data:', data);
  };

  return (
    <DynamicForm
      schema={schema}
      onSubmit={handleSubmit}
      labels={{
        name: 'Full Name',
        age: 'Age (years)',
        email: 'Email Address',
        isActive: 'Account Active',
      }}
    />
  );
}
```

### Advanced Usage with Complex Schemas

```tsx
import { DynamicForm } from '@/common/form';
import { z } from 'zod';

const complexSchema = z.object({
  // Basic types
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(18, 'Must be at least 18'),
  isActive: z.boolean(),
  
  // Enums and unions
  role: z.enum(['admin', 'user', 'guest']),
  status: z.union([z.string(), z.number()]),
  
  // Nested objects
  address: z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string().regex(/^\d{5}$/, 'Invalid ZIP'),
  }),
  
  // Arrays
  hobbies: z.array(z.string()),
  contacts: z.array(z.object({
    type: z.enum(['email', 'phone']),
    value: z.string(),
  })),
  
  // Files
  avatar: z.instanceof(File).optional(),
  documents: z.array(z.instanceof(File)),
  
  // Advanced types
  metadata: z.record(z.string(), z.any()),
  preferences: z.map(z.string(), z.string()),
  categories: z.set(z.string()),
});

function ComplexForm() {
  const handleSubmit = (data: z.infer<typeof complexSchema>) => {
    console.log('Complex form data:', data);
  };

  return (
    <DynamicForm
      schema={complexSchema}
      onSubmit={handleSubmit}
    />
  );
}
```

## Component API

### DynamicForm Props

```tsx
interface DynamicFormProps<T extends z.ZodTypeAny> {
  schema: T;                                    // Zod schema to generate form from
  onSubmit: (data: FormValues<T>) => void;     // Submit handler
  labels?: Record<string, string>;             // Custom field labels (optional)
}
```

### FormValues Type

```tsx
type FormValues<T extends z.ZodTypeAny> = z.infer<T>;
```

## Schema Examples

### Basic Types Schema

```tsx
const basicSchema = z.object({
  name: z.string().min(1, 'Name is required').describe('Full Name'),
  age: z.number().min(18, 'Must be at least 18').describe('Age'),
  isActive: z.boolean().describe('Active Status'),
  email: z.string().email('Invalid email').describe('Email Address'),
  website: z.string().url('Invalid URL').optional().describe('Website'),
});
```

### Array and Tuple Schema

```tsx
const arraySchema = z.object({
  hobbies: z.array(z.string().min(1, 'Hobby is required')).describe('Hobbies'),
  tags: z.array(z.string()).describe('Tags'),
  coordinates: z.tuple([z.number(), z.number()]).describe('Coordinates (x, y)'),
  rgb: z.tuple([z.number(), z.number(), z.number()]).describe('RGB Color'),
});
```

### Advanced Types Schema

```tsx
const advancedSchema = z.object({
  // Record types
  metadata: z.record(z.string(), z.any()).describe('Metadata'),
  settings: z.record(z.string(), z.boolean()).describe('Settings'),
  
  // Map and Set types
  preferences: z.map(z.string(), z.string()).describe('Preferences'),
  categories: z.set(z.string()).describe('Categories'),
  
  // BigInt and Symbol
  largeNumber: z.bigint().describe('Large Number'),
  symbol: z.symbol().describe('Symbol'),
  
  // Intersection
  userWithId: z.intersection(
    userSchema,
    z.object({ id: z.string().uuid() })
  ).describe('User with ID'),
  
  // Discriminated Union
  event: z.discriminatedUnion('type', [
    z.object({ type: z.literal('email'), email: z.string().email() }),
    z.object({ type: z.literal('phone'), phone: z.string() }),
    z.object({ type: z.literal('address'), address: addressSchema }),
  ]).describe('Event'),
});
```

## Demo Component

The `DynamicFormDemo` component provides a comprehensive demonstration of all supported schema types:

```tsx
import { DynamicFormDemo } from '@/common/form';

function App() {
  return <DynamicFormDemo />;
}
```

## Error Handling

The form system provides comprehensive error handling:

- **Validation Errors**: Display field-specific validation errors
- **Schema Errors**: Handle invalid or unsupported schema types
- **Form Errors**: Display form-level errors in a summary
- **Type Errors**: Graceful handling of type mismatches

## Customization

### Custom Labels

```tsx
const labels = {
  name: 'Full Name',
  age: 'Age (years)',
  email: 'Email Address',
  isActive: 'Account Active',
  role: 'User Role',
  birthDate: 'Date of Birth',
  avatar: 'Profile Picture',
  hobbies: 'Hobbies & Interests',
  address: 'Address Information',
  street: 'Street Address',
  city: 'City',
  state: 'State/Province',
  zip: 'ZIP/Postal Code',
  country: 'Country',
};

<DynamicForm
  schema={schema}
  onSubmit={handleSubmit}
  labels={labels}
/>
```

### Schema Descriptions

Use the `.describe()` method on Zod schemas to provide better field descriptions:

```tsx
const schema = z.object({
  name: z.string().min(1, 'Name is required').describe('Full Name'),
  age: z.number().min(18, 'Must be at least 18').describe('Age'),
  email: z.string().email('Invalid email').describe('Email Address'),
});
```

## Best Practices

1. **Use Descriptive Field Names**: Choose clear, descriptive field names in your schemas
2. **Provide Validation Messages**: Include helpful validation error messages
3. **Use Descriptions**: Add `.describe()` to provide better field labels
4. **Handle Edge Cases**: Test with various schema combinations
5. **Custom Labels**: Use custom labels for better UX
6. **Error Handling**: Implement proper error handling in your submit handlers

## Troubleshooting

### Common Issues

1. **Schema Not Recognized**: Ensure your schema is a valid Zod object
2. **Type Errors**: Check that your schema types are supported
3. **Validation Issues**: Verify your validation rules are correct
4. **File Upload Issues**: Ensure proper file type handling

### Debug Mode

Enable debug logging by checking the browser console for detailed information about schema processing and form generation.

## Contributing

When adding new Zod type support:

1. Update `getSchemaTypeName` in `schemaParser.ts`
2. Add default value generation in `generateDefaultValues`
3. Implement rendering logic in `RenderField.tsx`
4. Add test cases in `schemas.ts`
5. Update documentation

## License

This dynamic form system is part of the API Builder project and follows the same licensing terms.
