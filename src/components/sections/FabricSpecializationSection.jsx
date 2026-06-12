"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./FabricSpecializationSection.module.css";
import { useEffect, useRef } from "react";

const fabrics = [
  {
    id: "rfd",
    name: "R.F.D Shirts",
    description: "Premium Ready-For-Dyeing shirts providing the perfect blank canvas for your custom color applications.",
    imagePath: "/images/rfd_shirt_1781232652888.png"
  },
  {
    id: "linen",
    name: "Linen Shirts",
    description: "Breathable, high-quality linen fabric crafted for elegant summer and resort wear collections.",
    imagePath: "/images/linen_shirt_1781232668035.png"
  },
  {
    id: "oxford",
    name: "Oxford Shirts",
    description: "Classic Oxford cloth shirts offering unmatched durability and timeless sophisticated style.",
    imagePath: "/images/oxford_shirt_1781232678554.png"
  },
  {
    id: "rfd-double",
    name: "RFD Double Shirts",
    description: "Double-ply R.F.D shirts with rich texture, designed for premium garment dyeing processes.",
    imagePath: "/images/rfd_double_shirt_1781232699274.png"
  }
];

export default function FabricSpecializationSection() {
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
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Our Shirt Expertise</h2>
          <p className={styles.subtitle}>
            Discover our premium fabric specializations, crafted to meet the exacting standards of luxury fashion brands worldwide.
          </p>
        </div>

        <div className={styles.grid}>
          {fabrics.map((fabric, index) => (
            <Link href="/products" key={fabric.id}>
              <div 
                className={styles.card}
                ref={el => cardsRef.current[index] = el}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={styles.imageWrapper}>
                  <Image src={fabric.imagePath} alt={fabric.name} layout="fill" className={styles.image} />
                </div>
                <div className={styles.content}>
                  <div className={styles.badges}>
                    <span className={styles.badgeMoq}>MOQ 50+</span>
                    <span className={styles.badgeWholesale}>WHOLESALE</span>
                  </div>
                  <h3 className={styles.fabricName}>{fabric.name}</h3>
                  <p className={styles.description}>{fabric.description}</p>
                  <span className={styles.exploreBtn}>View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
