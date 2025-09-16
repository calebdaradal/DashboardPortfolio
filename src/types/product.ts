// Product Management Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  images: string[];
  sku?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  images?: string[];
  sku?: string;
  tags?: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  status?: 'active' | 'inactive' | 'draft';
  images?: string[];
  sku?: string;
  tags?: string[];
}

export interface ProductFilters {
  search?: string;
  category?: string;
  status?: 'active' | 'inactive' | 'draft' | 'all';
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'name' | 'price' | 'stock' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  productCount: number;
}
