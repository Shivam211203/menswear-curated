import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AdminLogin } from '@/components/AdminLogin';
import { useAdmin } from '@/contexts/AdminContext';
import { sampleProducts } from '@/data/products';
import { Product, AdminFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { isAuthenticated, logout } = useAdmin();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<AdminFormData>({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    category: 'Shirts',
    sizes: [],
    colors: [],
    stock: '',
    description: '',
    image: '',
    isVisible: true,
  });

  const categories = ['Shirts', 'Kurtas', 'T-Shirts', 'Jeans'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];
  const availableColors = ['White', 'Black', 'Navy', 'Gray', 'Blue', 'Green', 'Red', 'Yellow', 'Pink', 'Brown', 'Maroon', 'Gold'];

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      price: '',
      originalPrice: '',
      category: 'Shirts',
      sizes: [],
      colors: [],
      stock: '',
      description: '',
      image: '',
      isVisible: true,
  });
  setEditingProduct(null);
};

// Show login screen if not authenticated
if (!isAuthenticated) {
  return <AdminLogin onLogin={() => {}} />;
}

const openAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      category: product.category,
      sizes: product.sizes,
      colors: product.colors,
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
      isVisible: product.isVisible,
    });
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.price || !formData.image || formData.sizes.length === 0 || formData.colors.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      sizes: formData.sizes,
      colors: formData.colors,
      stock: parseInt(formData.stock) || 0,
      description: formData.description,
      image: formData.image,
      isVisible: formData.isVisible,
      createdAt: editingProduct?.createdAt || new Date(),
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } else {
      setProducts(prev => [...prev, productData]);
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    }
  };

  const toggleVisibility = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, isVisible: !p.isVisible } : p
    ));
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-8 animate-slide-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="opacity-90">Manage your product catalog</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={openAddForm}
                className="bg-accent hover:bg-accent-hover text-accent-foreground hover:scale-105 transition-transform"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="hover:shadow-medium transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">{products.length}</div>
              <p className="text-muted-foreground">Total Products</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-medium transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success animate-pulse-glow">{products.filter(p => p.isVisible).length}</div>
              <p className="text-muted-foreground">Visible Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent">{products.filter(p => !p.isVisible).length}</div>
              <p className="text-muted-foreground">Hidden Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">
                {new Set(products.map(p => p.category)).size}
              </div>
              <p className="text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                >
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded-md bg-muted"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                      {!product.isVisible && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline">{product.category}</Badge>
                      <Badge variant="secondary">₹{product.price.toLocaleString()}</Badge>
                      <Badge variant="outline">Stock: {product.stock}</Badge>
                    </div>
                    <div className="flex gap-1">
                      {product.sizes.slice(0, 3).map(size => (
                        <Badge key={size} variant="secondary" className="text-xs">{size}</Badge>
                      ))}
                      {product.sizes.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{product.sizes.length - 3}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleVisibility(product.id)}
                      title={product.isVisible ? 'Hide product' : 'Show product'}
                    >
                      {product.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditForm(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      placeholder="Enter brand name"
                      required
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Category and Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <Label htmlFor="image">Image URL *</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                {/* Sizes */}
                <div>
                  <Label>Available Sizes *</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableSizes.map(size => (
                      <Button
                        key={size}
                        type="button"
                        variant={formData.sizes.includes(size) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSizeToggle(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <Label>Available Colors *</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableColors.map(color => (
                      <Button
                        key={color}
                        type="button"
                        variant={formData.colors.includes(color) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleColorToggle(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Visibility */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isVisible"
                    checked={formData.isVisible}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVisible: checked }))}
                  />
                  <Label htmlFor="isVisible">Product is visible to customers</Label>
                </div>

                <Separator />

                {/* Form Actions */}
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary-hover">
                    <Save className="h-4 w-4 mr-2" />
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;