"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./manufacturing.module.css";

const steps = [
  { id: 1, title: "Fabric Selection", desc: "Sourcing premium yarns and textiles from globally renowned mills to ensure the highest quality foundation.", image: "/images/fabric.jpg" },
  { id: 2, title: "Pattern Development", desc: "Precision CAD pattern drafting for flawless fits, ensuring consistency across all sizes and styles.", image: "/images/pattern.jpg" },
  { id: 3, title: "Precision Cutting", desc: "Automated precision cutting machinery guarantees exact measurements and minimizes fabric waste.", image: "/images/cutting.jpg" },
  { id: 4, title: "Expert Stitching", desc: "Expert craftsmanship combining high-tech machinery with artisanal attention to detail in every seam.", image: "/images/stitching.jpg" },
  { id: 5, title: "Finishing", desc: "Premium treatments including anti-crease, bio-wash, and custom dyeing processes.", image: "/images/finishing.jpg" },
  { id: 6, title: "Quality Inspection", desc: "Rigorous multi-stage quality control to ensure every garment meets international standards.", image: "/images/quality-inspection.jpg" },
  { id: 7, title: "Packaging & Dispatch", desc: "Luxury packaging options ensuring products arrive in pristine condition, ready for retail.", image: "/images/packaging.jpg" }
];

export default function ManufacturingPage() {
  const itemsRef = useRef([]);

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

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.manufacturingSection}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Complete Manufacturing Process</h1>
            <p className={styles.subtitle}>
              Explore our 7-step production lifecycle, engineered for scale, precision, and world-class garment quality.
            </p>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineLine}></div>
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
                ref={el => itemsRef.current[index] = el}
              >
                <div className={styles.dot}></div>
                <div className={styles.content}>
                  <div className={styles.imageContainer}>
                    <div 
                      className={styles.stepImage} 
                      style={{ backgroundImage: `url("${step.image}")` }} 
                    />
                  </div>
                  <div className={styles.stepNumber}>0{step.id}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
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
