import React from 'react';
import { DynamicForm } from './DynamicForm';
import { z } from 'zod';

// Simple debug schema to test schema type detection
const debugSchema = z.object({
  name: z.string().describe('Name'),
  age: z.number().describe('Age'),
  isActive: z.boolean().describe('Active'),
});

export const DebugForm: React.FC = () => {
  const handleSubmit = (data: z.infer<typeof debugSchema>) => {
    console.log('Debug form submitted:', data);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Debug Dynamic Form</h1>
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Schema Debug Info:</h2>
        <pre className="text-sm">
          {JSON.stringify({
            schemaType: typeof debugSchema,
            isZodType: debugSchema instanceof z.ZodType,
            hasDef: !!debugSchema._def,
            typeName: debugSchema._def?.typeName,
            shape: Object.keys(debugSchema.shape),
          }, null, 2)}
        </pre>
      </div>
      <DynamicForm
        schema={debugSchema}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

