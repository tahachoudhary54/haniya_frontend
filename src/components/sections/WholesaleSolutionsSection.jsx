"use client";

import styles from "./WholesaleSolutionsSection.module.css";
import Link from "next/link";

const solutions = [
  { 
    id: 1, 
    title: "Bulk Orders", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
        <path d="m8 5.2 8.7 5" />
      </svg>
    ), 
    desc: "Scalable production for large volume requirements without compromising on premium quality." 
  },
  { 
    id: 2, 
    title: "Private Label", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <circle cx="7" cy="7" r="1.5"/>
      </svg>
    ), 
    desc: "Complete white-label solutions, allowing your brand's identity to shine on our superior garments." 
  },
  { 
    id: 3, 
    title: "Flexible MOQ", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ), 
    desc: "Accommodating Minimum Order Quantities designed to support both growing brands and established retailers." 
  },
  { 
    id: 4, 
    title: "Export Support", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <path d="M3.5 9h17"/>
        <path d="M3.5 15h17"/>
      </svg>
    ), 
    desc: "Comprehensive export documentation and logistics support for seamless international trade." 
  },
  { 
    id: 5, 
    title: "Custom Branding", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        <path d="M14.5 5.5l3 3"/>
      </svg>
    ), 
    desc: "Bespoke labeling, custom buttons, embroidery, and tailored packaging to elevate your brand presence." 
  },
  { 
    id: 6, 
    title: "Global Partnerships", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ), 
    desc: "Dedicated account management and priority production scheduling for our long-term supply partners." 
  }
];

export default function WholesaleSolutionsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Built for Wholesale Buyers</h2>
          <p className={styles.subtitle}>
            Comprehensive B2B solutions tailored for the unique needs of global retailers, fashion brands, and large-scale distributors.
          </p>
        </div>

        <div className={styles.grid}>
          {solutions.map((solution, index) => (
            <div 
              key={solution.id} 
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconContainer}>
                  {solution.icon}
                </div>
                <h3 className={styles.cardTitle}>{solution.title}</h3>
                <p className={styles.cardDesc}>{solution.desc}</p>
              </div>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
        
        <div className={styles.actionContainer}>
           <Link href="/wholesale" className={styles.btnLink}>
             Explore All Wholesale Benefits <span className={styles.arrow}>→</span>
           </Link>
        </div>
      </div>
    </section>
  );
}
