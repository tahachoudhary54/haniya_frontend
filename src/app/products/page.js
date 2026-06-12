"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./products.module.css";
import { useEffect, useState } from "react";

const products = [
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

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.productsSection}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Our Collections</h1>
            <p className={styles.subtitle}>
              Discover our range of premium shirts manufactured with uncompromising attention to detail and quality.
            </p>
          </div>

          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image src={product.imagePath} alt={product.name} layout="fill" className={styles.image} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.fabricName}>{product.name}</h3>
                  <p className={styles.description}>{product.description}</p>
                  <Link href={`/products/${product.id}`} className={styles.exploreBtn}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
