"use client";

import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import Link from "next/link";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.imageContainer}>
        {/* Video Background */}
        <video 
          className={styles.video}
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className={styles.content}>
        <h1 className={`${styles.title} fade-up ${isVisible ? 'visible' : ''}`}>Premium Men's Shirt Manufacturer</h1>
        <p className={`${styles.subtitle} fade-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          Specializing in R.F.D, Linen, Oxford and RFD Double shirts for retailers, wholesalers and fashion brands worldwide.
        </p>
        
        <div className={`${styles.buttons} fade-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
          <Link href="/products" className={styles.btnPrimary}>
            Explore Products
          </Link>
          <Link href="/wholesale" className={styles.btnSecondary}>
            Request Wholesale Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
