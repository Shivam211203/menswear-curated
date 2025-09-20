import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Product database functions
export const productService = {
  // Get all visible products for customers
  async getVisibleProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get all products for admin
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Add new product
  async addProduct(product: Omit<Product, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        brand: product.brand,
        price: product.price,
        original_price: product.originalPrice,
        category: product.category,
        sizes: product.sizes,
        colors: product.colors,
        stock: product.stock,
        description: product.description,
        image: product.image,
        is_visible: product.isVisible
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update product
  async updateProduct(id: string, product: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        brand: product.brand,
        price: product.price,
        original_price: product.originalPrice,
        category: product.category,
        sizes: product.sizes,
        colors: product.colors,
        stock: product.stock,
        description: product.description,
        image: product.image,
        is_visible: product.isVisible
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete product
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Upload product image
  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  description: string;
  image: string;
  isVisible: boolean;
  createdAt: Date;
};