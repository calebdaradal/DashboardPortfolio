import { Product, CreateProductData, UpdateProductData, ProductFilters, PaginatedResponse } from '@/types';

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    category: 'Electronics',
    stock: 45,
    status: 'active',
    images: ['https://via.placeholder.com/300x300?text=Headphones'],
    sku: 'WHP-001',
    tags: ['audio', 'wireless', 'premium'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor',
    price: 199.99,
    category: 'Electronics',
    stock: 23,
    status: 'active',
    images: ['https://via.placeholder.com/300x300?text=Watch'],
    sku: 'SFW-002',
    tags: ['fitness', 'smart', 'health'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'Premium Coffee Beans',
    description: 'Organic coffee beans from sustainable farms',
    price: 24.99,
    category: 'Food & Beverage',
    stock: 156,
    status: 'active',
    images: ['https://via.placeholder.com/300x300?text=Coffee'],
    sku: 'PCB-003',
    tags: ['organic', 'coffee', 'premium'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support',
    price: 449.99,
    category: 'Furniture',
    stock: 12,
    status: 'active',
    images: ['https://via.placeholder.com/300x300?text=Chair'],
    sku: 'EOC-004',
    tags: ['office', 'ergonomic', 'furniture'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials',
    price: 79.99,
    category: 'Sports & Fitness',
    stock: 67,
    status: 'active',
    images: ['https://via.placeholder.com/300x300?text=Yoga+Mat'],
    sku: 'YMP-005',
    tags: ['yoga', 'fitness', 'eco-friendly'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '6',
    name: 'Vintage Leather Jacket',
    description: 'Classic leather jacket with vintage styling',
    price: 189.99,
    category: 'Clothing',
    stock: 8,
    status: 'draft',
    images: ['https://via.placeholder.com/300x300?text=Jacket'],
    sku: 'VLJ-006',
    tags: ['leather', 'vintage', 'fashion'],
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-13')
  }
];

let productDatabase = [...mockProducts];
let nextId = 7;

class ProductService {

  async getProducts(params?: ProductFilters & { page?: number; limit?: number }): Promise<PaginatedResponse<Product>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredProducts = [...productDatabase];
    
    // Apply filters
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.sku?.toLowerCase().includes(search)
      );
    }
    
    if (params?.category) {
      filteredProducts = filteredProducts.filter(product => product.category === params.category);
    }
    
    if (params?.status && params.status !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.status === params.status);
    }
    
    if (params?.priceRange) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= params.priceRange!.min && product.price <= params.priceRange!.max
      );
    }
    
    // Apply sorting
    if (params?.sortBy) {
      filteredProducts.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Product];
        const bValue = b[params.sortBy as keyof Product];
        
        if (aValue instanceof Date && bValue instanceof Date) {
          return params.sortOrder === 'asc' 
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return params.sortOrder === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return params.sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return 0;
      });
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNextPage: endIndex < filteredProducts.length,
        hasPreviousPage: page > 1
      }
    };
  }

  async createProduct(productData: CreateProductData): Promise<Product> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if SKU already exists
    if (productData.sku && productDatabase.some(product => product.sku === productData.sku)) {
      throw new Error('Product with this SKU already exists');
    }
    
    const newProduct: Product = {
      id: nextId.toString(),
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
      status: productData.status,
      images: productData.images || [],
      sku: productData.sku,
      tags: productData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    productDatabase.push(newProduct);
    nextId++;
    
    return newProduct;
  }

  async updateProduct(id: string, productData: UpdateProductData): Promise<Product> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const productIndex = productDatabase.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    // Check if SKU already exists (excluding current product)
    if (productData.sku && 
        productDatabase.some(product => product.sku === productData.sku && product.id !== id)) {
      throw new Error('Product with this SKU already exists');
    }
    
    const updatedProduct: Product = {
      ...productDatabase[productIndex],
      ...productData,
      updatedAt: new Date()
    };
    
    productDatabase[productIndex] = updatedProduct;
    
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const productIndex = productDatabase.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    productDatabase.splice(productIndex, 1);
  }

  async getProductById(id: string): Promise<Product> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const product = productDatabase.find(product => product.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  }

  async getCategories(): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const categories = [...new Set(productDatabase.map(product => product.category))];
    return categories.sort();
  }
}

export const productService = new ProductService();
