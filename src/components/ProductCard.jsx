"use client";

import Link from "next/link";
import styles from "./ProductCard.module.css";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { 
    id, 
    name, 
    fabric, 
    moq, 
    price, 
    salePrice, 
    stock, 
    imageUrl 
  } = product;

  // Badge logic
  let badge = null;
  if (stock === 0) {
    badge = <span className={`${styles.badge} ${styles.badgeOutOfStock}`}>OUT OF STOCK</span>;
  } else if (stock <= 15) {
    badge = <span className={`${styles.badge} ${styles.badgeLowStock}`}>Only {stock} Left</span>;
  }

  return (
    <div className={styles.card}>
      <Link href={`/products/${id}`} className={styles.imageWrapper}>
        {badge}
        {/* Using a regular img tag or a generic div with background for now to handle external/placeholder images easily without next/image config issues */}
        <div 
          className={styles.image}
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Link>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.fabric}>{fabric}</p>
        
        <div className={styles.details}>
          <p className={styles.moq}><strong>MOQ:</strong> {moq} pieces</p>
          <div className={styles.pricing}>
            {salePrice ? (
              <>
                <span className={styles.salePrice}>₹{salePrice.toFixed(2)}</span>
                <span className={styles.originalPrice}>₹{price.toFixed(2)}</span>
              </>
            ) : (
              <span className={styles.price}>₹{price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <Link href={`/products/${id}`} className={styles.btnDetails}>
          View Details
        </Link>
      </div>
    </div>
  );
}
