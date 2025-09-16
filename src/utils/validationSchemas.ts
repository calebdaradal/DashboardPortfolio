import { z } from 'zod';

// User validation schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  rememberMe: z.boolean().optional()
});

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  role: z.enum(['admin', 'user', 'moderator'], {
    message: 'Please select a valid role'
  }),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\\s]+$/, 'Name can only contain letters and spaces')
    .optional(),
  email: z
    .string()
    .email('Invalid email format')
    .optional(),
  role: z.enum(['admin', 'user', 'moderator'], {
    message: 'Please select a valid role'
  }).optional(),
  status: z.enum(['active', 'inactive', 'suspended'], {
    message: 'Please select a valid status'
  }).optional()
});

// Product validation schemas
export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  price: z
    .coerce
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(999999.99, 'Price must be less than $1,000,000'),
  category: z
    .string()
    .min(2, 'Category must be at least 2 characters')
    .max(50, 'Category must be less than 50 characters'),
  stock: z
    .coerce
    .number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .max(999999, 'Stock must be less than 1,000,000'),
  status: z.enum(['active', 'inactive', 'draft'], {
    message: 'Please select a valid status'
  }),
  sku: z
    .string()
    .min(3, 'SKU must be at least 3 characters')
    .max(20, 'SKU must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  tags: z
    .string()
    .optional()
    .or(z.literal('')),
  images: z
    .any()
    .optional()
});

export const updateProductSchema = createProductSchema.partial();

// Filter validation schemas
export const userFiltersSchema = z.object({
  search: z.string().optional(),
  role: z.enum(['admin', 'user', 'moderator', 'all']).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'all']).optional(),
  sortBy: z.enum(['name', 'email', 'createdAt', 'lastLogin']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

export const productFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft', 'all']).optional(),
  priceRange: z.object({
    min: z.coerce.number().min(0),
    max: z.coerce.number().min(0)
  }).refine(data => data.min <= data.max, {
    message: 'Minimum price must be less than or equal to maximum price',
    path: ['min']
  }).optional(),
  sortBy: z.enum(['name', 'price', 'stock', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

// Settings validation schemas
export const profileSettingsSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Invalid email format'),
  avatar: z
    .string()
    .url('Invalid avatar URL')
    .optional(),
  timezone: z
    .string()
    .min(1, 'Please select a timezone')
    .optional(),
  language: z
    .string()
    .min(1, 'Please select a language')
    .optional()
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your new password')
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

// Contact/Support form schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Invalid email format'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  priority: z.enum(['low', 'medium', 'high'], {
    message: 'Please select a priority level'
  }).optional()
});

// Search schemas
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .max(100, 'Search query must be less than 100 characters'),
  filters: z.record(z.string(), z.string()).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

// Export types for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type UserFiltersData = z.infer<typeof userFiltersSchema>;
export type ProductFiltersData = z.infer<typeof productFiltersSchema>;
export type ProfileSettingsData = z.infer<typeof profileSettingsSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type SearchData = z.infer<typeof searchSchema>;
