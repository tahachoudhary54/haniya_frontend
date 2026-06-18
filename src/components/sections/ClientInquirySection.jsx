"use client";

import { Factory, PhoneCall, Mail } from "lucide-react";
import styles from "./ClientInquirySection.module.css";

export default function ClientInquirySection() {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.contentInfo}>
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>Partner With Us</h2>
              <p className={styles.contactSubtitle}>
                Ready to elevate your collection with premium men's shirts? Get in touch with our dedicated B2B sales team to discuss your specific requirements.
              </p>
              
              <div className={styles.contactDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.icon}>
                    <Factory size={24} strokeWidth={1.5} />
                  </span>
                  <div>
                    <strong>Headquarters</strong>
                    <p>123 Manufacturing District, Global Apparel Hub</p>
                  </div>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.icon}>
                    <PhoneCall size={24} strokeWidth={1.5} />
                  </span>
                  <div>
                    <strong>Global Sales</strong>
                    <p>+91 74001 66461</p>
                  </div>
                </div>
                
                <div className={styles.detailItem}>
                  <span className={styles.icon}>
                    <Mail size={24} strokeWidth={1.5} />
                  </span>
                  <div>
                    <strong>Email Inquiry</strong>
                    <p>noorhaniya2024@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <h3 className={styles.formTitle}>Wholesale Inquiry Form</h3>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" placeholder="John Doe" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="company">Company Name *</label>
                  <input type="text" id="company" placeholder="Your Brand Ltd." required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Business Email *</label>
                  <input type="email" id="email" placeholder="john@company.com" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="+1 (555) 000-0000" />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="requirement">Product Requirement *</label>
                  <select id="requirement" required>
                    <option value="">Select an option</option>
                    <option value="rfd">R.F.D Shirts</option>
                    <option value="linen">Linen Shirts</option>
                    <option value="oxford">Oxford Shirts</option>
                    <option value="rfd-double">RFD Double Shirts</option>
                    <option value="custom">Custom Manufacturing</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label htmlFor="message">Message / Details</label>
                  <textarea id="message" rows="4" placeholder="Tell us about your estimated quantities, timeline, and specific needs..."></textarea>
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>Submit Inquiry</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
