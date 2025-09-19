import { Minus, Plus, Trash2, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, isOpen, toggleCart, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity animate-fade-in"
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-strong z-50 animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <Badge variant="secondary">{items.length}</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some items to get started</p>
                <Button onClick={toggleCart} className="bg-primary hover:bg-primary-hover">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 p-4 border border-border rounded-lg bg-card">
                    {/* Product Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-md bg-muted"
                    />
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.product.brand}
                      </p>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.selectedSize}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.selectedColor}
                        </Badge>
                      </div>
                      <p className="font-semibold text-foreground">
                        ₹{item.product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 bg-muted/20">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-foreground">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                
                <Separator />
                
                {/* Actions */}
                <div className="space-y-2">
                  <Link to="/contact" onClick={toggleCart}>
                    <Button className="w-full bg-gradient-accent hover:bg-accent-hover text-accent-foreground font-semibold">
                      Proceed to Buy
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={toggleCart}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-destructive hover:text-destructive"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>

                {/* Note */}
                <p className="text-xs text-muted-foreground text-center">
                  Free delivery on orders above ₹999
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};