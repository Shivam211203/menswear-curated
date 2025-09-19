import { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { sampleProducts } from '@/data/products';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Shirts', 'Kurtas', 'T-Shirts', 'Jeans'];
  const priceRanges = ['All', 'Under ₹1000', '₹1000-₹2000', 'Above ₹2000'];

  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts.filter(product => product.isVisible);

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange !== 'All') {
      filtered = filtered.filter(product => {
        if (priceRange === 'Under ₹1000') return product.price < 1000;
        if (priceRange === '₹1000-₹2000') return product.price >= 1000 && product.price <= 2000;
        if (priceRange === 'Above ₹2000') return product.price > 2000;
        return true;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return filtered.sort((a, b) => b.stock - a.stock);
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Elevate Your
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Style</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 animate-fade-in">
              Discover premium men's fashion that defines modern elegance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                View Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-4">
            {/* Categories */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Price Ranges */}
            <div className="flex gap-2">
              {priceRanges.map((range) => (
                <Button
                  key={range}
                  variant={priceRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceRange(range)}
                  className={priceRange === range ? "bg-accent text-accent-foreground" : ""}
                >
                  {range}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm border border-border rounded-md bg-background"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || selectedCategory !== 'All' || priceRange !== 'All') && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-background rounded-lg">
              <span className="text-sm font-medium">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {selectedCategory !== 'All' && (
                <Badge variant="secondary" className="gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {priceRange !== 'All' && (
                <Badge variant="secondary" className="gap-1">
                  Price: {priceRange}
                  <button onClick={() => setPriceRange('All')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange('All');
                }}
                className="text-destructive hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Men\'s Collection'}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange('All');
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(1).map((category) => (
              <Card 
                key={category} 
                className="group cursor-pointer hover:shadow-medium transition-all duration-300 animate-fade-in"
                onClick={() => setSelectedCategory(category)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-accent-foreground">
                      {category.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category}</h3>
                  <p className="text-muted-foreground">
                    {sampleProducts.filter(p => p.category === category).length} items
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;