import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.companyInfo}>
            <div className={styles.logo}>Haniya Garments</div>
            <p className={styles.tagline} style={{ fontWeight: 600, color: 'var(--color-champagne)', marginBottom: '10px' }}>Premium Men's Shirt Manufacturer & Wholesaler</p>
            <p className={styles.description}>
              Dedicated to setting global standards in quality, scale, and craftsmanship for forward-thinking fashion brands and retailers.
            </p>
            <div className={styles.socialLinksTop}>
              <a 
                href="https://www.instagram.com/haniya_garment/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIconLink}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/products" className={styles.link}>Products</Link>
            <Link href="/manufacturing" className={styles.link}>Manufacturing</Link>
            <Link href="/wholesale" className={styles.link}>Wholesale</Link>
            <Link href="/contact" className={styles.link}>Contact Us</Link>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <p className={styles.contactItem}><strong>Email:</strong> noorhaniya2024@gmail.com</p>
            <p className={styles.contactItem}><strong>WhatsApp:</strong> +91 74001 66461</p>

          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Haniya Garments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
