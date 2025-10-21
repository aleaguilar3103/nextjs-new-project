"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Package, CheckCircle, ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Product } from "@/lib/products";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const allImages = [product.image_url, ...(product.additional_images || [])];

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setImageViewerOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              {product.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="relative h-80 rounded-lg overflow-hidden bg-gray-100 group cursor-pointer" onClick={() => openImageViewer(0)}>
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="h-12 w-12 text-white" />
              </div>
            </div>

            <div>
              <Badge className="bg-gradient-to-r from-brand to-brand-dark text-white text-sm px-4 py-1">
                {product.category}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Descripción
              </h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-brand/5 p-4 rounded-lg border border-brand/20">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-brand mr-2" />
                  <h4 className="font-semibold text-gray-900">Condición</h4>
                </div>
                <p className="text-gray-600">{product.condition}</p>
              </div>

              {product.quantity > 0 && (
                <div className="bg-brand/5 p-4 rounded-lg border border-brand/20">
                  <div className="flex items-center mb-2">
                    <Package className="w-5 h-5 text-brand mr-2" />
                    <h4 className="font-semibold text-gray-900">Cantidad</h4>
                  </div>
                  <p className="text-gray-600">{product.quantity} unidades</p>
                </div>
              )}
            </div>

            {product.additional_images && product.additional_images.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Imágenes Adicionales
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.additional_images.map((img, index) => (
                    <div 
                      key={index} 
                      className="relative h-32 rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
                      onClick={() => openImageViewer(index + 1)}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} - imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-brand/5 to-white p-6 rounded-lg border-2 border-brand/20">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ¿Interesado en este pallet?
              </h3>
              <p className="text-gray-600 mb-4">
                Contáctanos por WhatsApp para obtener más información y precios mayoristas.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white"
              >
                <a
                  href="https://wa.link/pg0nbh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Contactar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Modal */}
      <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="max-w-[95vw] h-[95vh] bg-black/95 border-none p-0">
          <button
            onClick={() => setImageViewerOpen(false)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative h-full flex items-center justify-center p-8">
            <img
              src={allImages[currentImageIndex]}
              alt="Product"
              className="max-h-full max-w-full object-contain"
            />
            
            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white h-12 w-12"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white h-12 w-12"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}