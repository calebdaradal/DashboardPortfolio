import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Download, Grid, List } from 'lucide-react';
import { ProductFilters as ProductFiltersType } from '@/types';
import { useProductStore } from '@/stores/productStore';
import { productService } from '@/services/productService';

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onAddProduct: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  filters, 
  onAddProduct,
  viewMode,
  onViewModeChange
}) => {
  const { setFilters } = useProductStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || 0,
    max: filters.priceRange?.max || 1000
  });
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await productService.getCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  const handleSearchChange = (value: string) => {
    setFilters({ search: value });
  };
  
  const handleCategoryChange = (category: string) => {
    setFilters({ category: category === 'all' ? '' : category });
  };
  
  const handleStatusChange = (status: ProductFiltersType['status']) => {
    setFilters({ status });
  };
  
  const handlePriceRangeChange = () => {
    setFilters({ 
      priceRange: {
        min: priceRange.min,
        max: priceRange.max
      }
    });
  };
  
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: 'all',
      priceRange: undefined,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setPriceRange({ min: 0, max: 1000 });
  };
  
  const hasActiveFilters = filters.search || 
    filters.category || 
    (filters.status && filters.status !== 'all') ||
    filters.priceRange;
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog, inventory, and pricing
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <button className="btn-outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button onClick={onAddProduct} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col space-y-4">
          {/* Top Row - Search and Sort */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="form-input pl-10 pr-4"
                  placeholder="Search products by name, description, or SKU..."
                  value={filters.search || ''}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sort */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                className="form-input py-2 px-3 min-w-[140px]"
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters({ sortBy, sortOrder: sortOrder as 'asc' | 'desc' });
                }}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
                <option value="stock-asc">Stock Low-High</option>
                <option value="stock-desc">Stock High-Low</option>
              </select>
            </div>
          </div>
          
          {/* Bottom Row - Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="form-input py-2 px-3 min-w-[150px]"
                value={filters.category || 'all'}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <select
                className="form-input py-2 px-3 min-w-[120px]"
                value={filters.status || 'all'}
                onChange={(e) => handleStatusChange(e.target.value as ProductFiltersType['status'])}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Price:</span>
              <input
                type="number"
                className="form-input py-2 px-3 w-20"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                onBlur={handlePriceRangeChange}
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                className="form-input py-2 px-3 w-20"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                onBlur={handlePriceRangeChange}
              />
            </div>
            
            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn-outline px-3 py-2 text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
