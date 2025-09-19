import { useState } from 'react';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product, selectedSize, selectedColor, 1);
    toast({
      title: "Added to cart!",
      description: `${product.name} - ${selectedSize}, ${selectedColor}`,
      duration: 2000,
    });
    
    setIsAddingToCart(false);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-xl shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden animate-zoom-in hover:scale-[1.02] hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted bg-shimmer animate-shimmer" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground font-semibold animate-bounce-in">
            <Sparkles className="h-3 w-3 mr-1" />
            -{discountPercentage}%
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white transition-all duration-300 rounded-full h-9 w-9 hover:scale-110"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart 
            className={`h-4 w-4 transition-all duration-300 ${
              isLiked ? 'fill-red-500 text-red-500 animate-bounce-in' : 'text-gray-600'
            }`} 
          />
        </Button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
          <div className="w-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium disabled:opacity-70 hover:scale-105 transition-transform"
            >
              {isAddingToCart ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </div>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Quick Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs font-medium">
            {product.brand}
          </Badge>
          <span className="text-xs text-muted-foreground">{product.category}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground mb-3 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Size Selection */}
        <div className="mb-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Size:</p>
          <div className="flex gap-1 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  selectedSize === size
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Color:</p>
          <div className="flex gap-1 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  selectedColor === color
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-accent hover:bg-accent-hover text-accent-foreground font-medium"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};