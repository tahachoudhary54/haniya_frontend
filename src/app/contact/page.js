"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientInquirySection from "@/components/sections/ClientInquirySection";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.contactPage}>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>Contact Sales</h1>
            <p className={styles.subtitle}>
              Ready to partner with a world-class manufacturer? Our wholesale team is ready to assist you with bulk orders, custom manufacturing, and global logistics.
            </p>
          </div>
        </div>
        
        {/* Reuse the ClientInquirySection but remove its top padding since we have a hero here */}
        <div className={styles.formWrapper}>
          <ClientInquirySection />
        </div>
      </main>
      <Footer />
    </>
  );
}
