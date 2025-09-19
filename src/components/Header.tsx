import { useState } from 'react';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { totalItems, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:block">
              MensFashion
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/shirts" className="text-muted-foreground hover:text-primary transition-colors">
              Shirts
            </Link>
            <Link to="/kurtas" className="text-muted-foreground hover:text-primary transition-colors">
              Kurtas
            </Link>
            <Link to="/t-shirts" className="text-muted-foreground hover:text-primary transition-colors">
              T-Shirts
            </Link>
            <Link to="/jeans" className="text-muted-foreground hover:text-primary transition-colors">
              Jeans
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-muted/50 border-border"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Mobile */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center p-0 animate-bounce-in">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <nav className="flex flex-col space-y-4 p-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shirts" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shirts
              </Link>
              <Link 
                to="/kurtas" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kurtas
              </Link>
              <Link 
                to="/t-shirts" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                T-Shirts
              </Link>
              <Link 
                to="/jeans" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Jeans
              </Link>
              {/* Mobile Search */}
              <div className="pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 bg-muted/50 border-border"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};