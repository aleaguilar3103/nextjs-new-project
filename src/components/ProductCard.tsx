"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import ProductModal from "./ProductModal";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en el producto: ${product.title}`;
    const whatsappUrl = `https://wa.me/18299999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white" onClick={() => setModalOpen(true)}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-brand to-brand-dark text-white">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-900">{product.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Condición:</span>
              <span className="font-semibold text-gray-900">{product.condition}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cantidad:</span>
              <span className="font-semibold text-gray-900">{product.quantity} unidades</span>
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleWhatsAppClick();
            }}
            className="w-full bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white"
          >
            <MessageCircle className="mr-2 w-4 h-4" />
            Contactar por WhatsApp
          </Button>
        </CardContent>
      </Card>

      <ProductModal
        product={product}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}