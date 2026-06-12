"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import styles from "./cart.module.css";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, isInitialized } = useCart();

  if (!isInitialized) return null;

  return (
    <>
      <Navbar />
      <main className={styles.cartPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is currently empty.</p>
              <Link href="/products" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className={styles.cartContent}>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <div 
                        style={{
                          width: '100%', height: '100%', 
                          backgroundImage: `url(${item.imageUrl || (item.images ? item.images[0] : '')})`, 
                          backgroundSize: 'cover', backgroundPosition: 'center'
                        }} 
                      />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <Link href={`/products/${item.id}`}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                      </Link>
                      <p className={styles.itemFabric}>{item.fabric}</p>
                      
                      <div className={styles.quantityControl}>
                        <button onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}>
                          <Minus size={16} />
                        </button>
                        <input 
                          type="text" 
                          value={item.quantity} 
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              updateQuantity(item.id, '');
                            } else if (!isNaN(val) && parseInt(val) > 0) {
                              updateQuantity(item.id, parseInt(val));
                            }
                          }}
                          onBlur={(e) => {
                            if (e.target.value === '' || parseInt(e.target.value) < 1) {
                              updateQuantity(item.id, 1);
                            }
                          }}
                          className={styles.quantityInput}
                        />
                        <button onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.itemPrice}>
                        ₹{item.salePrice || item.price || (item.pricing && item.pricing[0] ? parseFloat(item.pricing[0].price.replace(/[^0-9.]/g, '')) : 0).toFixed(2)}
                      </div>
                      <button 
                        className={styles.removeBtn} 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.orderSummary}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <p className={styles.taxNote}>Taxes and shipping calculated at checkout</p>
                
                <button className={styles.checkoutBtn}>
                  Submit Wholesale Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
