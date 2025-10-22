"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Package, ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Product } from "@/lib/products";
import { useState } from "react";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  
  const allImages = [product.image_url, ...(product.additional_images || [])];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openImageViewer = () => {
    setImageViewerOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              {product.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Main Image with Navigation */}
            <div className="relative">
              <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100 group">
                <Image
                  src={allImages[currentImageIndex]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                
                {/* Zoom Button */}
                <button
                  onClick={openImageViewer}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        currentImageIndex === index
                          ? "border-brand shadow-lg"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Badge className="bg-gradient-to-r from-brand to-brand-dark text-white text-sm px-4 py-1">
                {product.category}
              </Badge>
              
              <Badge className={product.available ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                {product.available ? "Disponible" : "No Disponible"}
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
                  <Package className="w-5 h-5 text-brand mr-2" />
                  <h4 className="font-semibold text-gray-900">Precio</h4>
                </div>
                <p className="text-gray-600">Variado</p>
              </div>

              {product.quantity > 0 && (
                <div className="bg-brand/5 p-4 rounded-lg border border-brand/20">
                  <div className="flex items-center mb-2">
                    <Package className="w-5 h-5 text-brand mr-2" />
                    <h4 className="font-semibold text-gray-900">Cantidad</h4>
                  </div>
                  <p className="text-gray-600">{product.quantity} pallets disponibles</p>
                </div>
              )}
            </div>

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

      {/* Full Screen Image Viewer */}
      <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="max-w-[95vw] h-[95vh] bg-black/95 border-none p-0">
          <button
            onClick={() => setImageViewerOpen(false)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative h-full flex items-center justify-center p-8">
            <img
              src={allImages[currentImageIndex]}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
                
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