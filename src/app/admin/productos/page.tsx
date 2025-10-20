"use client";

import { useState, useEffect } from "react";
import { supabase, uploadProductImage } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus, Edit, Package, TrendingUp, Star, Layers } from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  condition: string;
  quantity: number;
  units_per_pallet: number;
  image_url: string;
  additional_images: string[];
  featured: boolean;
}

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    condition: "",
    quantity: 0,
    units_per_pallet: 0,
    featured: false,
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImages([...additionalImages, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setAdditionalPreviews([...additionalPreviews, ...previews]);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
    setAdditionalPreviews(additionalPreviews.filter((_, i) => i !== index));
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      description: product.description,
      condition: product.condition,
      quantity: product.quantity,
      units_per_pallet: product.units_per_pallet,
      featured: product.featured,
    });
    setMainImagePreview(product.image_url);
    setAdditionalPreviews(product.additional_images || []);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
    setFormData({
      title: "",
      category: "",
      description: "",
      condition: "",
      quantity: 0,
      units_per_pallet: 0,
      featured: false,
    });
    setMainImage(null);
    setAdditionalImages([]);
    setMainImagePreview("");
    setAdditionalPreviews([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let mainImageUrl = editingProduct?.image_url || "";
      if (mainImage) {
        const url = await uploadProductImage(mainImage);
        if (url) mainImageUrl = url;
      }

      const additionalImageUrls: string[] = [];
      
      // Keep existing URLs that weren't removed
      if (editingProduct) {
        const existingUrls = editingProduct.additional_images || [];
        existingUrls.forEach((url, index) => {
          if (additionalPreviews.includes(url)) {
            additionalImageUrls.push(url);
          }
        });
      }

      // Upload new images
      for (const file of additionalImages) {
        const url = await uploadProductImage(file);
        if (url) additionalImageUrls.push(url);
      }

      const productData = {
        ...formData,
        image_url: mainImageUrl,
        additional_images: additionalImageUrls,
      };

      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert(productData);
        if (error) throw error;
      }

      cancelEdit();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      fetchProducts();
    }
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalPallets = products.reduce((sum, p) => sum + p.quantity, 0);
  const featuredProducts = products.filter(p => p.featured).length;
  const categories = new Set(products.map(p => p.category)).size;

  return (
    <div className="py-8 px-4 bg-white min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-brand">Panel de Administración</h1>
          <Button onClick={() => { setEditingProduct(null); setShowForm(!showForm); }}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-brand/5 to-white border-2 border-brand/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-brand">{totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-brand/5 to-white border-2 border-brand/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Pallets</p>
                <p className="text-3xl font-bold text-brand">{totalPallets}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-brand/5 to-white border-2 border-brand/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Destacados</p>
                <p className="text-3xl font-bold text-brand">{featuredProducts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-brand/5 to-white border-2 border-brand/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Categorías</p>
                <p className="text-3xl font-bold text-brand">{categories}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {showForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoría *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="condition">Condición</Label>
                  <Input
                    id="condition"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <Label htmlFor="units">Unidades por Pallet</Label>
                  <Input
                    id="units"
                    type="number"
                    value={formData.units_per_pallet}
                    onChange={(e) => setFormData({ ...formData, units_per_pallet: parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="featured">Producto Destacado</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label>Imagen Principal {!editingProduct && "*"}</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        {editingProduct ? "Cambiar imagen principal" : "Subir imagen principal"}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      required={!editingProduct}
                    />
                  </label>
                  {mainImagePreview && (
                    <div className="mt-4">
                      <img src={mainImagePreview} alt="Preview" className="h-40 rounded-lg" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Imágenes Adicionales</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Subir imágenes adicionales</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesChange}
                    />
                  </label>
                  {additionalPreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      {additionalPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img src={preview} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Guardando..." : editingProduct ? "Actualizar Producto" : "Guardar Producto"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-4">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(product)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}