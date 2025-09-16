import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Package,
  DollarSign,
  BarChart3,
  Eye
} from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/utils/cn';

interface ProductGridProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  isLoading?: boolean;
}

const getStatusBadge = (status: Product['status']) => {
  const styles = {
    active: 'status-success',
    inactive: 'status-inactive',
    draft: 'status-warning'
  };
  
  return (
    <span className={cn('status-badge', styles[status])}>
      <span className="capitalize">{status}</span>
    </span>
  );
};

const ProductCard: React.FC<{
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}> = ({ product, onEdit, onDelete, onView }) => {
  const [showActions, setShowActions] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="card-hover overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {!imageError && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge(product.status)}
        </div>
        
        {/* Actions */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-modal border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onView();
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4 mr-3" />
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      onEdit();
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit className="w-4 h-4 mr-3" />
                    Edit Product
                  </button>
                  <button
                    onClick={() => {
                      onDelete();
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete Product
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate pr-2">{product.name}</h3>
          <span className="text-lg font-bold text-primary-600 flex-shrink-0">
            ${product.price}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {product.category}
          </span>
          <span className="flex items-center">
            <BarChart3 className="w-3 h-3 mr-1" />
            {product.stock} in stock
          </span>
        </div>
        
        {product.sku && (
          <div className="text-xs text-gray-400 mb-2">
            SKU: {product.sku}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Created {format(product.createdAt, 'MMM dd, yyyy')}</span>
          {product.tags && product.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                  #{tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-xs text-gray-400">+{product.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onViewProduct,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="card overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="card">
        <div className="p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
          <button className="btn-primary">
            Add Your First Product
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEditProduct(product)}
          onDelete={() => onDeleteProduct(product)}
          onView={() => onViewProduct(product)}
        />
      ))}
    </div>
  );
};

// CSS for line-clamp (add to your CSS file or Tailwind config)
// .line-clamp-2 {
//   overflow: hidden;
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   -webkit-line-clamp: 2;
// }"
