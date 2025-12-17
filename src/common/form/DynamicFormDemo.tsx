import React, { useState } from 'react';
import { DynamicForm } from './DynamicForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  basicTypesSchema,
  enumUnionSchema,
  dateTimeSchema,
  fileUploadSchema,
  arrayTypesSchema,
  advancedTypesSchema,
  comprehensiveTestSchema,
  simpleTestSchema,
  profileSchema,
  orderSchema,
} from './util/schemas';

export const DynamicFormDemo: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const handleSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    setFormData(data);
  };

  const schemas = {
    basic: {
      schema: basicTypesSchema,
      title: 'Basic Types',
      description: 'String, Number, Boolean, Email, URL validation',
    },
    enum: {
      schema: enumUnionSchema,
      title: 'Enums & Unions',
      description: 'Enum, NativeEnum, Union, Literal types',
    },
    datetime: {
      schema: dateTimeSchema,
      title: 'Date & Time',
      description: 'Date picker with validation',
    },
    files: {
      schema: fileUploadSchema,
      title: 'File Upload',
      description: 'Single file, multiple files, FileList',
    },
    arrays: {
      schema: arrayTypesSchema,
      title: 'Arrays & Tuples',
      description: 'Array fields, Tuple types, nested objects',
    },
    advanced: {
      schema: advancedTypesSchema,
      title: 'Advanced Types',
      description: 'Record, Map, Set, BigInt, Symbol, Intersection, Discriminated Union',
    },
    profile: {
      schema: profileSchema,
      title: 'Complex Profile',
      description: 'Nested objects, arrays, file uploads',
    },
    order: {
      schema: orderSchema,
      title: 'Order System',
      description: 'Complex nested structure with arrays',
    },
    comprehensive: {
      schema: comprehensiveTestSchema,
      title: 'Comprehensive Test',
      description: 'All types combined in one schema',
    },
    simple: {
      schema: simpleTestSchema,
      title: 'Simple Test',
      description: 'Basic functionality test',
    },
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Form Builder Demo</CardTitle>
          <p className="text-muted-foreground">
            Comprehensive demonstration of the dynamic form system supporting all Zod schema types.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="enum">Enums</TabsTrigger>
              <TabsTrigger value="datetime">Dates</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="arrays">Arrays</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="order">Order</TabsTrigger>
              <TabsTrigger value="comprehensive">All Types</TabsTrigger>
              <TabsTrigger value="simple">Simple</TabsTrigger>
            </TabsList>

            {Object.entries(schemas).map(([key, config]) => (
              <TabsContent key={key} value={key} className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{config.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                      <Badge variant="outline">{key}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DynamicForm
                      schema={config.schema}
                      onSubmit={handleSubmit}
                      labels={{
                        // Custom labels for better UX
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
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {formData && (
        <Card>
          <CardHeader>
            <CardTitle>Form Submission Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
