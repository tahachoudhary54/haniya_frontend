"use client";

import styles from "./WhyChooseSection.module.css";

const features = [
  { 
    title: "Premium Fabrics", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ), 
    desc: "Sourcing only the finest materials from globally certified mills." 
  },
  { 
    title: "Skilled Workforce", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ), 
    desc: "Expert artisans and technicians dedicated to master craftsmanship." 
  },
  { 
    title: "Consistent Quality", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ), 
    desc: "Rigorous quality control ensuring perfection in every single unit." 
  },
  { 
    title: "Bulk Production Capacity", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ), 
    desc: "State-of-the-art facilities equipped for large scale manufacturing." 
  },
  { 
    title: "Competitive Pricing", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ), 
    desc: "Optimized processes delivering luxury quality at competitive B2B rates." 
  },
  { 
    title: "Worldwide Shipping", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ), 
    desc: "Reliable and efficient global logistics for timely deliveries." 
  }
];

export default function WhyChooseSection() {
  return (
    <section className={styles.section}>
      <div className="container">

        <div className={styles.header}>
          <h2 className={styles.title}>Why Leading Buyers Choose Haniya Garments</h2>
          <p className={styles.subtitle}>
            Delivering premium men's shirts through expert manufacturing, strict quality control and dependable wholesale partnerships.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconContainer}>
                  {feature.icon}
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.desc}</p>
                <div className={styles.cardGlow}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
