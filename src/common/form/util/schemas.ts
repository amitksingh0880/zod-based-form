import * as z from 'zod';

// Basic Types Schema
export const basicTypesSchema = z.object({
  name: z.string().min(1, 'Name is required').describe('Full Name'),
  age: z.number().min(18, 'Must be at least 18').describe('Age'),
  isActive: z.boolean().describe('Active Status'),
  score: z.number().min(0).max(100).describe('Score'),
  email: z.string().email('Invalid email').describe('Email Address'),
  website: z.string().url('Invalid URL').optional().describe('Website'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio must be less than 500 characters').describe('Biography'),
});

// Enum and Union Types Schema
export const enumUnionSchema = z.object({
  role: z.enum(['admin', 'user', 'guest']).describe('User Role'),
  status: z.enum(['active', 'inactive', 'pending']).describe('Status'),
  priority: z.nativeEnum({ LOW: 'low', MEDIUM: 'medium', HIGH: 'high' }).describe('Priority'),
  contactMethod: z.union([z.string(), z.number()]).describe('Contact Method'),
  flexibleValue: z.union([z.string(), z.number(), z.boolean()]).describe('Flexible Value'),
  literalValue: z.literal('fixed-value').describe('Fixed Value'),
});

// Date and Time Schema
export const dateTimeSchema = z.object({
  birthDate: z.date().describe('Date of Birth'),
  startTime: z.date().describe('Start Time'),
  endTime: z.date().optional().describe('End Time'),
  createdAt: z.date().default(() => new Date()).describe('Created At'),
});

// File Upload Schema
export const fileUploadSchema = z.object({
  avatar: z.instanceof(typeof File !== 'undefined' ? File : Object).optional().describe('Profile Picture'),
  documents: z.array(z.instanceof(typeof File !== 'undefined' ? File : Object)).describe('Documents'),
  multiFiles: z.instanceof(typeof FileList !== 'undefined' ? FileList : Object).optional().describe('Multiple Files'),
  resume: z.instanceof(typeof File !== 'undefined' ? File : Object).describe('Resume'),
});

// Nested Object Schema
export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required').describe('Street Address'),
  city: z.string().min(1, 'City is required').describe('City'),
  state: z.string().min(2, 'State is required').describe('State'),
  zip: z.string().regex(/^\d{5}$/, 'Invalid ZIP code').describe('ZIP Code'),
  country: z.string().default('USA').describe('Country'),
});

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').describe('Full Name'),
  age: z.number().min(18, 'Must be at least 18').describe('Age'),
  isActive: z.boolean().describe('Active Status'),
  role: z.enum(['admin', 'user', 'guest']).describe('User Role'),
  birthDate: z.date().describe('Date of Birth'),
  address: addressSchema.describe('Address Details'),
});

// Array Types Schema
export const arrayTypesSchema = z.object({
  hobbies: z.array(z.string().min(1, 'Hobby is required')).describe('Hobbies'),
  tags: z.array(z.string()).describe('Tags'),
  scores: z.array(z.number().min(0).max(100)).describe('Scores'),
  contacts: z.array(
    z.object({
      type: z.enum(['email', 'phone', 'social']).describe('Contact Type'),
      value: z.string().min(1, 'Value is required').describe('Contact Value'),
    })
  ).describe('Contacts'),
  coordinates: z.tuple([z.number(), z.number()]).describe('Coordinates (x, y)'),
  rgb: z.tuple([z.number(), z.number(), z.number()]).describe('RGB Color'),
});

// Complex Nested Schema
export const profileSchema = z.object({
  user: userSchema.describe('User Information'),
  address: addressSchema.describe('Address Details'),
  hobbies: z.array(z.string().min(1, 'Hobby is required')).describe('Hobbies'),
  contacts: z.array(
    z.object({
      type: z.enum(['email', 'phone', 'social']).describe('Contact Type'),
      value: z.string().min(1, 'Value is required').describe('Contact Value'),
    })
  ).describe('Contacts'),
  avatar: z.instanceof(typeof File !== 'undefined' ? File : Object).optional().describe('Profile Picture'),
  documents: z.array(z.instanceof(typeof File !== 'undefined' ? File : Object)).describe('Documents'),
  bio: z.string().min(100, 'Bio must be at least 100 characters').optional().describe('Biography'),
  multiFiles: z.instanceof(typeof FileList !== 'undefined' ? FileList : Object).optional().describe('Multiple Files'),
});

// Advanced Types Schema
export const advancedTypesSchema = z.object({
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

// Product Schema
export const productSchema = z.object({
  id: z.string().uuid('Invalid UUID').describe('Product ID'),
  name: z.string().min(1, 'Product name is required').describe('Product Name'),
  price: z.number().positive('Price must be positive').describe('Price'),
  inStock: z.boolean().describe('In Stock'),
  categories: z.array(z.enum(['electronics', 'clothing', 'books'])).describe('Categories'),
  releaseDate: z.date().describe('Release Date'),
  tags: z.array(z.string()).describe('Tags'),
  specifications: z.record(z.string(), z.string()).optional().describe('Specifications'),
});

// Order Schema (with nested arrays and complex types)
export const orderSchema = z.object({
  orderId: z.number().int().positive().describe('Order ID'),
  customer: userSchema.describe('Customer Information'),
  products: z.array(productSchema).describe('Products'),
  total: z.number().positive().describe('Total Amount'),
  status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).describe('Order Status'),
  shippingAddress: addressSchema.describe('Shipping Address'),
  billingAddress: addressSchema.describe('Billing Address'),
  notes: z.string().optional().describe('Order Notes'),
  createdAt: z.date().default(() => new Date()).describe('Created At'),
  updatedAt: z.date().default(() => new Date()).describe('Updated At'),
});

// Lazy Schema (for recursive types)
export const lazySchema: z.ZodLazy<z.ZodTypeAny> = z.lazy(() =>
  z.object({
    name: z.string(),
    children: z.array(lazySchema).optional(),
  })
);

// Test Schema with all types
export const comprehensiveTestSchema = z.object({
  // Basic types
  name: z.string().min(1, 'Name is required').describe('Full Name'),
  age: z.number().min(18, 'Must be at least 18').describe('Age'),
  isActive: z.boolean().describe('Active Status'),

  // Enums and unions
  role: z.enum(['admin', 'user', 'guest']).describe('User Role'),
  status: z.union([z.string(), z.number()]).describe('Status'),

  // Dates
  birthDate: z.date().describe('Date of Birth'),

  // Files
  avatar: z.instanceof(typeof File !== 'undefined' ? File : Object).optional().describe('Profile Picture'),

  // Nested objects
  address: z.object({
    street: z.string().describe('Street'),
    city: z.string().describe('City'),
  }).describe('Address'),

  // Arrays
  hobbies: z.array(z.string()).describe('Hobbies'),

  // Complex nested structure
  profile: z.object({
    user: userSchema.describe('User Information'),
    preferences: z.record(z.string(), z.any()).describe('Preferences'),
    tags: z.array(z.string()).describe('Tags'),
  }).describe('Profile'),
});

// Simple test schema for basic functionality
export const simpleTestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0),
  isActive: z.boolean(),
  status: z.enum(['active', 'inactive']),
  startDate: z.date(),
  avatar: z.instanceof(typeof File !== 'undefined' ? File : Object),
  address: z.object({
    street: z.string(),
    city: z.string(),
  }),
  hobbies: z.array(z.string()),
  contactMethod: z.union([z.string(), z.number()]),
});