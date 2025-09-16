import { create } from 'zustand';
import { Product, CreateProductData, UpdateProductData, ProductFilters } from '@/types';
import { productService } from '@/services/productService';
import toast from 'react-hot-toast';

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  
  // Actions
  fetchProducts: () => Promise<void>;
  createProduct: (productData: CreateProductData) => Promise<void>;
  updateProduct: (id: string, productData: UpdateProductData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setPage: (page: number) => void;
}

export const useProductStore = create<ProductStore>()((set, get) => ({
  products: [],
  selectedProduct: null,
  filters: {
    search: '',
    category: '',
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  },
  isLoading: false,

  fetchProducts: async () => {
    try {
      set({ isLoading: true });
      const { filters, pagination } = get();
      
      const response = await productService.getProducts({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });
      
      set({ 
        products: response.data,
        pagination: response.pagination,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to fetch products');
    }
  },

  createProduct: async (productData: CreateProductData) => {
    try {
      set({ isLoading: true });
      
      const newProduct = await productService.createProduct(productData);
      
      set((state) => ({
        products: [newProduct, ...state.products],
        isLoading: false
      }));
      
      toast.success('Product created successfully');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to create product');
      throw error;
    }
  },

  updateProduct: async (id: string, productData: UpdateProductData) => {
    try {
      set({ isLoading: true });
      
      const updatedProduct = await productService.updateProduct(id, productData);
      
      set((state) => ({
        products: state.products.map(product => 
          product.id === id ? updatedProduct : product
        ),
        selectedProduct: state.selectedProduct?.id === id ? updatedProduct : state.selectedProduct,
        isLoading: false
      }));
      
      toast.success('Product updated successfully');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to update product');
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      set({ isLoading: true });
      
      await productService.deleteProduct(id);
      
      set((state) => ({
        products: state.products.filter(product => product.id !== id),
        selectedProduct: state.selectedProduct?.id === id ? null : state.selectedProduct,
        isLoading: false
      }));
      
      toast.success('Product deleted successfully');
    } catch (error) {
      set({ isLoading: false });
      toast.error('Failed to delete product');
      throw error;
    }
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  setFilters: (newFilters: Partial<ProductFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }
    }));
  },

  setPage: (page: number) => {
    set((state) => ({
      pagination: { ...state.pagination, page }
    }));
  }
}));
