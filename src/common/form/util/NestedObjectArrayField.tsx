import React from 'react';
import * as z from 'zod';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RenderField } from './RenderField';
import { getDisplayLabel, generateDefaultValues, getSchemaTypeName } from './schemaParser';

interface NestedObjectArrayFieldProps {
  schema: z.ZodTypeAny;
  name: string;
  control: any;
  labels?: Record<string, string>;
}

export const NestedObjectArrayField: React.FC<NestedObjectArrayFieldProps> = ({ 
  schema, 
  name, 
  control, 
  labels 
}) => {
  const { fields, append, remove } = useFieldArray({ control, name });
  
  let elementSchema: z.ZodTypeAny;
  if (schema instanceof z.ZodArray) {
    elementSchema = schema._def.type as z.ZodTypeAny;
  } else {
    console.error(`Invalid array schema for field ${name}:`, schema);
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Error: Invalid Array Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Invalid array schema provided for field: {name}</p>
        </CardContent>
      </Card>
    );
  }
  
  const displayLabel = getDisplayLabel(schema, name, labels);
  const elementTypeName = getSchemaTypeName(elementSchema);
  console.log(`Rendering nested object array field: ${name}, element type: ${elementTypeName}`);

  const handleAddItem = () => {
    const defaultValue = generateDefaultValues(elementSchema, 0);
    console.log(`Adding new nested object with default value:`, defaultValue);
    append(defaultValue);
  };

  const handleRemoveItem = (index: number) => {
    console.log(`Removing nested object at index: ${index}`);
    remove(index);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{displayLabel} (Nested Objects)</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{fields.length} items</Badge>
            <Badge variant="outline">{elementTypeName}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No {displayLabel.toLowerCase()} added yet.</p>
              <p className="text-sm">Click "Add {displayLabel} Item" to start adding elements.</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <Card key={field.id} className="p-6 border-l-4 border-l-green-500 bg-green-50/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {displayLabel} {index + 1}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {elementTypeName}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </Button>
                </div>
                
                {/* Render all fields of the nested object */}
                <div className="space-y-4">
                  {elementSchema instanceof z.ZodObject && 
                    Object.entries(elementSchema.shape).map(([key, childSchema]) => (
                      <RenderField
                        key={key}
                        schema={childSchema as z.ZodTypeAny}
                        name={`${name}.${index}.${key}`}
                        control={control}
                        labels={labels}
                      />
                    ))
                  }
                </div>
              </Card>
            ))
          )}
          
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleAddItem}
              className="flex-1"
            >
              Add {displayLabel} Item
            </Button>
            {fields.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Remove all items
                  for (let i = fields.length - 1; i >= 0; i--) {
                    remove(i);
                  }
                }}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

