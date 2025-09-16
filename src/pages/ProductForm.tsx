import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useProductStore } from '@/stores/productStore';
import { TextField, TextAreaField, SelectField, SubmitButton } from '@/components/forms/FormFields';
import { useValidatedForm } from '@/hooks/useValidatedForm';
import { createProductSchema, updateProductSchema } from '@/utils/validationSchemas';
import { CreateProductData, UpdateProductData } from '@/types';

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  sku?: string;
  tags?: string;
  images?: FileList;
};

export const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
  const { 
    selectedProduct, 
    createProduct, 
    updateProduct, 
    isLoading,
    setSelectedProduct 
  } = useProductStore();

  const form = useValidatedForm(
    isEditMode ? updateProductSchema : createProductSchema,
    {
      defaultValues: {
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        status: 'draft' as const,
        sku: '',
        tags: ''
      }
    }
  );

  const watchedImages = form.watch('images');

  useEffect(() => {
    if (isEditMode && id) {
      // In a real app, you'd fetch the product by ID
      // For now, we'll assume selectedProduct is set elsewhere
      if (selectedProduct && selectedProduct.id === id) {
        form.reset({
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
          category: selectedProduct.category,
          stock: selectedProduct.stock,
          status: selectedProduct.status,
          sku: selectedProduct.sku || '',
          tags: selectedProduct.tags?.join(', ') || ''
        });
      }
    }
  }, [isEditMode, id, selectedProduct, form.reset]);

  const onSubmit = async (data: any) => {
    try {
      // Process tags
      const tags = data.tags ? data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : [];
      
      if (isEditMode && id) {
        const updateData: UpdateProductData = {
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          status: data.status,
          sku: data.sku,
          tags
        };
        await updateProduct(id, updateData);
      } else {
        const createData: CreateProductData = {
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          status: data.status,
          sku: data.sku,
          tags,
          images: ['https://via.placeholder.com/300x300?text=' + encodeURIComponent(data.name)]
        };
        await createProduct(createData);
      }
      
      navigate('/products');
    } catch (error) {
      // Error handling is done in the store
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  const categoryOptions = [
    { value: '', label: 'Select Category' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Home & Garden', label: 'Home & Garden' },
    { value: 'Sports & Fitness', label: 'Sports & Fitness' },
    { value: 'Books', label: 'Books' },
    { value: 'Beauty & Health', label: 'Beauty & Health' },
    { value: 'Toys & Games', label: 'Toys & Games' },
    { value: 'Automotive', label: 'Automotive' },
    { value: 'Furniture', label: 'Furniture' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCancel}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditMode 
                ? 'Update product information and settings' 
                : 'Create a new product for your catalog'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card p-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <TextField
                form={form}
                name="name"
                label="Product Name"
                placeholder="Enter product name"
                disabled={isLoading}
              />

              <TextAreaField
                form={form}
                name="description"
                label="Description"
                placeholder="Enter product description"
                rows={4}
                maxLength={500}
                disabled={isLoading}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  form={form}
                  name="price"
                  label="Price ($)"
                  type="number"
                  placeholder="0.00"
                  disabled={isLoading}
                />

                <TextField
                  form={form}
                  name="stock"
                  label="Stock Quantity"
                  type="number"
                  placeholder="0"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Category and Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Categorization</h3>
              
              <SelectField
                form={form}
                name="category"
                label="Category"
                disabled={isLoading}
                options={categoryOptions}
              />

              <SelectField
                form={form}
                name="status"
                label="Status"
                disabled={isLoading}
                options={statusOptions}
              />

              <TextField
                form={form}
                name="sku"
                label="SKU (Optional)"
                placeholder="Enter product SKU"
                disabled={isLoading}
              />

              <TextField
                form={form}
                name="tags"
                label="Tags (Optional)"
                placeholder="Enter tags separated by commas"
                description="Use commas to separate multiple tags (e.g., electronics, wireless, bluetooth)"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                {...form.register('images')}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="mt-4 inline-block btn-outline cursor-pointer"
              >
                Choose Files
              </label>
            </div>

            {/* Display selected files */}
            {watchedImages && watchedImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                <div className="space-y-1">
                  {Array.from(watchedImages).map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600 truncate">{(file as File).name}</span>
                      <span className="text-xs text-gray-500">
                        {((file as File).size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-outline w-full sm:w-auto"
              disabled={isLoading}
            >
              Cancel
            </button>
            <SubmitButton
              isLoading={isLoading}
              loadingText={isEditMode ? 'Updating...' : 'Creating...'}
              className="w-full sm:w-auto"
            >
              {isEditMode ? 'Update Product' : 'Create Product'}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
