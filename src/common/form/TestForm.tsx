import React from 'react';
import { DynamicForm } from './DynamicForm';
import { z } from 'zod';

// Nested product schema
const productSchema = z.object({
  id: z.string().uuid('Invalid UUID').describe('Product ID'),
  name: z.string().min(1, 'Product name is required').describe('Product Name'),
  price: z.number().positive('Price must be positive').describe('Price'),
  inStock: z.boolean().describe('In Stock'),
  categories: z.array(z.enum(['electronics', 'clothing', 'books'])).describe('Categories'),
  releaseDate: z.date().describe('Release Date'),
});

// Simple test schema with nested objects
const testSchema = z.object({
  orderId: z.number().int().positive().describe('Order ID'),
  customer: z.object({
    name: z.string().min(1, 'Name is required').describe('Customer Name'),
    email: z.string().email('Invalid email').describe('Email'),
  }).describe('Customer Information'),
  products: z.array(productSchema).describe('Products'),
  total: z.number().positive().describe('Total Amount'),
  status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).describe('Order Status'),
});

export const TestForm: React.FC = () => {
  const handleSubmit = (data: z.infer<typeof testSchema>) => {
    console.log('Test form submitted:', data);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test Dynamic Form</h1>
      <DynamicForm
        schema={testSchema}
        onSubmit={handleSubmit}
        labels={{
          orderId: 'Order ID',
          customer: 'Customer Information',
          products: 'Products',
          total: 'Total Amount ($)',
          status: 'Order Status',
        }}
      />
    </div>
  );
};
