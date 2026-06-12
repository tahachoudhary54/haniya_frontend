"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./wholesale.module.css";

import { Package, Tag, Scale, Ship, Sparkles, Handshake, Globe } from "lucide-react";

const features = [
  { id: 1, title: "Bulk Orders", icon: <Package size={32} strokeWidth={1.75} />, desc: "Scalable production for large volume requirements without compromising on premium quality." },
  { id: 2, title: "Private Label Manufacturing", icon: <Tag size={32} strokeWidth={1.75} />, desc: "Complete white-label solutions, allowing your brand's identity to shine on our superior garments." },
  { id: 3, title: "Flexible MOQ", icon: <Scale size={32} strokeWidth={1.75} />, desc: "Accommodating Minimum Order Quantities designed to support both growing brands and established retailers." },
  { id: 4, title: "Export Support", icon: <Ship size={32} strokeWidth={1.75} />, desc: "Comprehensive export documentation and logistics support for seamless international trade." },
  { id: 5, title: "Worldwide Shipping", icon: <Globe size={32} strokeWidth={1.75} />, desc: "Reliable global logistics network ensuring your orders arrive safely and on schedule, anywhere." },
  { id: 6, title: "Custom Branding", icon: <Sparkles size={32} strokeWidth={1.75} />, desc: "Bespoke labeling, custom buttons, embroidery, and tailored packaging to elevate your brand presence." },
  { id: 7, title: "Long-Term Partnerships", icon: <Handshake size={32} strokeWidth={1.75} />, desc: "Dedicated account management and priority production scheduling for our long-term supply partners." }
];

export default function WholesalePage() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.wholesaleSection}>
        <div className={styles.heroSection}>
          <div className="container">
            <h1 className={styles.title}>Partner With Excellence</h1>
            <p className={styles.subtitle}>
              Elevate your retail collection with our premium wholesale manufacturing services. Tailored solutions for forward-thinking brands.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.grid}>
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className={styles.card}
                ref={el => cardsRef.current[index] = el}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={styles.icon}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Ready to elevate your collection?</h2>
            <p className={styles.ctaDesc}>Get in touch with our wholesale team to discuss your specific requirements.</p>
            <a href="/#contact" className={styles.ctaButton}>Contact Sales Team</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
