"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Factory, ShieldCheck, Globe } from "lucide-react";
import styles from "./ProductionCapacitySection.module.css";

const stats = [
  { id: 1, label: "Years of Experience", target: 25, suffix: "+", description: "Trusted manufacturing expertise.", icon: Award },
  { id: 2, label: "Monthly Capacity", target: 100000, suffix: "+", description: "Scalable production for large orders.", icon: Factory },
  { id: 3, label: "Quality Inspection Rate", target: 100, suffix: "%", description: "Every garment inspected before dispatch.", icon: ShieldCheck },
  { id: 4, label: "Export Markets", target: 40, suffix: "+", description: "Serving clients across the globe.", icon: Globe }
];

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    let observer;
    let hasAnimated = false;

    const animateValue = (start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    };

    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateValue(0, target, 2000);
      }
    }, { threshold: 0.5 });

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  // Format large numbers with commas
  const formattedCount = count >= 1000 ? count.toLocaleString() : count;

  return (
    <div ref={countRef} className={styles.counterWrapper}>
      <span className={styles.number}>{formattedCount}</span>
      <span className={styles.suffix}>{suffix}</span>
    </div>
  );
};

export default function ProductionCapacitySection() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Production Capacity</h2>
          <p className={styles.subtitle}>
            Empowered by scale, driven by precision. Our infrastructure is built to deliver high-volume orders globally.
          </p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className={styles.statCard}>
                <div className={styles.iconWrapper}>
                  <Icon size={28} className={styles.icon} />
                </div>
                <Counter target={stat.target} suffix={stat.suffix} />
                <p className={styles.label}>{stat.label}</p>
                <p className={styles.description}>{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
