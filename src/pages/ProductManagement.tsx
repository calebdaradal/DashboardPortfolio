import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/stores/productStore';
import { ProductFilters } from '@/components/ui/ProductFilters';
import { ProductGrid } from '@/components/ui/ProductGrid';
import { Pagination } from '@/components/ui/Pagination';
import { Product } from '@/types';
import { Outlet, useLocation } from 'react-router-dom';

export const ProductManagement: React.FC = () => {
  const location = useLocation();
  const isMainRoute = location.pathname === '/products';
  
  const { 
    products, 
    filters, 
    pagination, 
    isLoading, 
    fetchProducts, 
    setPage,
    deleteProduct
  } = useProductStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Product | null>(null);
  
  useEffect(() => {
    if (isMainRoute) {
      fetchProducts();
    }
  }, [fetchProducts, filters, pagination.page, isMainRoute]);
  
  const handleAddProduct = () => {
    // Navigate to add product page
    window.location.href = '/products/add';
  };
  
  const handleEditProduct = (product: Product) => {
    // Navigate to edit product page
    window.location.href = `/products/edit/${product.id}`;
  };
  
  const handleViewProduct = (product: Product) => {
    // Could open a modal or navigate to detail page
    console.log('View product:', product);
  };
  
  const handleDeleteProduct = (product: Product) => {
    setShowDeleteConfirm(product);
  };
  
  const confirmDeleteProduct = async () => {
    if (showDeleteConfirm) {
      try {
        await deleteProduct(showDeleteConfirm.id);
        setShowDeleteConfirm(null);
      } catch (error) {
        // Error handling is done in the store
      }
    }
  };
  
  // If not on main route, show nested route content
  if (!isMainRoute) {
    return <Outlet />;
  }
  
  return (
    <div className="space-y-6">
      <ProductFilters 
        filters={filters} 
        onAddProduct={handleAddProduct}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <ProductGrid
        products={products}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onViewProduct={handleViewProduct}
        isLoading={isLoading}
      />
      
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit}
          onPageChange={setPage}
          className="mt-6"
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-content w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Product
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{showDeleteConfirm.name}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProduct}
                  className="btn-danger"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
