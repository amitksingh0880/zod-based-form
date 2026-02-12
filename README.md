# zod-based-form

A dynamic, schema-driven form builder for React, powered by Zod and React Hook Form.

## Features
- 🚀 **Schema-Driven**: Generate complex forms directly from Zod schemas.
- ⚡ **Dynamic Rendering**: Automatically maps Zod types to appropriate UI components.
- 🎨 **Shadcn UI Integrated**: Beautifully styled using Radix UI and Tailwind CSS.
- 🔔 **Sonner Alerts**: Built-in notifications for form actions.
- 📦 **NPM Ready**: Light weight and optimized for tree-shaking.

## Installation

```bash
npm install zod-based-form zod react-hook-form
```

## Usage

```tsx
import { DynamicForm } from 'zod-based-form';
import * as z from 'zod';
import 'zod-based-form/style.css';

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

function App() {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <DynamicForm 
      schema={schema} 
      onSubmit={handleSubmit} 
      title="User Registration"
      submitLabel="Create Account"
    />
  );
}
```

## UI Components
This library includes several built-in Shadcn components for form rendering. It also integrates `Sonner` for alerts.

Make sure to include the `Toaster` component in your app root to see notifications:

```tsx
import { Toaster } from 'sonner';

function Root() {
  return (
    <>
      <App />
      <Toaster richColors />
    </>
  );
}
```

## Documentation
For detailed schema usage and customization, please refer to the [documentation](src/common/form/documentation.md).

## License
MIT
