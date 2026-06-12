"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product, className }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product, product.moq || 1);
    router.push("/cart");
  };

  return (
    <button className={className} onClick={handleAddToCart} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ShoppingCart size={20} style={{ marginRight: '8px' }} />
      Add to Cart
    </button>
  );
}
