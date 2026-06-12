"use client";

import { useEffect, useRef } from "react";
import styles from "./ManufacturingExcellenceSection.module.css";
import Link from "next/link";
import Image from "next/image";

const keySteps = [
  { 
    id: 1, 
    title: "Fabric Selection", 
    desc: "Sourcing premium yarns and textiles from globally renowned mills.", 
    image: "/images/fabric.jpg" 
  },
  { 
    id: 2, 
    title: "Expert Stitching", 
    desc: "Expert craftsmanship combining high-tech machinery with artisanal attention.", 
    image: "/images/stitching.jpg" 
  },
  { 
    id: 3, 
    title: "Quality Inspection", 
    desc: "Rigorous multi-stage quality control to ensure every garment meets international standards.", 
    image: "/images/quality-inspection.jpg" 
  }
];

export default function ManufacturingExcellenceSection() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        
        <div className={styles.header}>
          <h2 className={styles.title}>Manufacturing Excellence</h2>
          <p className={styles.subtitle}>
            From premium fabric sourcing to final quality inspection, every shirt undergoes a carefully controlled manufacturing process.
          </p>
        </div>

        <div className={styles.processContainer}>
          <div className={styles.processLine}></div>
          
          <div className={styles.grid}>
            {keySteps.map((step, index) => (
              <div 
                key={step.id} 
                className={styles.card}
                ref={el => itemsRef.current[index] = el}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className={styles.imageContainer}>
                  <Image 
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.stepBadge}>0{step.id}</div>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.actionContainer}>
           <Link href="/manufacturing" className={styles.btnLink}>
             View Complete Production Process <span className={styles.arrow}>→</span>
           </Link>
        </div>
      </div>
    </section>
  );
}
