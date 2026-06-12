"use client";

import { useState } from "react";
import styles from "./ProductDetail.module.css";

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <div 
          style={{
            width: '100%', height: '100%', 
            backgroundImage: `url(${mainImage})`, 
            backgroundSize: 'cover', backgroundPosition: 'center',
            transition: 'background-image 0.3s ease-in-out'
          }} 
        />
      </div>
      <div className={styles.thumbnails}>
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`${styles.thumbnail} ${mainImage === img ? styles.active : ''}`}
            onClick={() => setMainImage(img)}
          >
            <div 
              style={{
                width: '100%', height: '100%', 
                backgroundImage: `url(${img})`, 
                backgroundSize: 'cover', backgroundPosition: 'center'
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
