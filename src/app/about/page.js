"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import Image from "next/image";
import ProductionCapacitySection from "@/components/sections/ProductionCapacitySection";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.aboutPage}>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>About Haniya Garments</h1>
            <p className={styles.subtitle}>
              Decades of excellence in premium men's shirt manufacturing. We are the trusted partners behind global fashion brands.
            </p>
          </div>
        </div>
        
        <div className={styles.contentSection}>
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyText}>
                <h2 className={styles.sectionTitle}>Our Legacy of Quality</h2>
                <p className={styles.text}>
                  Established with a vision to redefine B2B apparel manufacturing, Haniya Garments has grown into a state-of-the-art facility serving clients across the globe. Our commitment to precision, scalability, and uncompromising quality standards has made us the manufacturer of choice for retailers, wholesalers, and premium private labels.
                </p>
                <p className={styles.text}>
                  We believe that a great garment starts long before the first cut. It begins with sourcing the finest raw materials, investing in advanced machinery, and cultivating a workforce of master artisans. Every shirt that leaves our facility carries our signature of excellence.
                </p>
              </div>
              <div className={styles.storyImageWrapper}>
                <Image 
                  src="/images/stitching.jpg"
                  alt="Haniya Garments Manufacturing Excellence"
                  fill
                  className={styles.storyImage}
                  sizes="(max-width: 968px) 100vw, 50vw"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.floatingBadge}>
                  25+ Years Manufacturing Excellence
                </div>
              </div>
            </div>
          </div>
        </div>

        <WhyChooseSection />
        <ProductionCapacitySection />
      </main>
      <Footer />
    </>
  );
}
