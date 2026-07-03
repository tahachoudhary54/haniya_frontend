"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./signup.module.css";
import API_URL from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const inputRefs = useRef([]);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      const focusIndex = Math.min(digits.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsOtpSent(true);
      } else {
        setError(data.message || "Failed to sign up.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpValue }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success! Redirect to login
        router.push("/login?verified=true");
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.authPage}>
        <div className={styles.splitContainer}>
          <div className={styles.formSection}>
            <div className={styles.formWrapper}>
              
              {!isOtpSent ? (
                <>
                  <h2 className={styles.formTitle}>Wholesale Application</h2>
                  <p className={styles.formSubtitle}>Apply for a B2B partner account to access wholesale pricing.</p>
                  
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  
                  <form className={styles.form} onSubmit={handleSignupSubmit}>
                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="fullName">Full Name *</label>
                        <input type="text" id="fullName" placeholder="John Doe" required onChange={handleChange} value={formData.fullName} disabled={loading} />
                      </div>
                      <div className={styles.inputGroup}>
                        <label htmlFor="companyName">Company / Brand *</label>
                        <input type="text" id="companyName" placeholder="Your Brand Ltd." required onChange={handleChange} value={formData.companyName} disabled={loading} />
                      </div>
                      <div className={styles.inputGroup}>
                        <label htmlFor="email">Business Email *</label>
                        <input type="email" id="email" placeholder="john@company.com" required onChange={handleChange} value={formData.email} disabled={loading} />
                      </div>
                      <div className={styles.inputGroup}>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+1 (555) 000-0000" onChange={handleChange} value={formData.phone} disabled={loading} />
                      </div>
                      <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label htmlFor="password">Password *</label>
                        <div className={styles.passwordWrapper}>
                          <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            placeholder="Create a strong password" 
                            required 
                            onChange={handleChange} 
                            value={formData.password} 
                            disabled={loading} 
                          />
                          <button 
                            type="button" 
                            className={styles.eyeBtn} 
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                      {loading ? "Sending OTP..." : "Submit Application"}
                    </button>
                  </form>
                  
                  <div className={styles.authFooter}>
                    <p>Already a partner? <Link href="/login">Sign In Here</Link></p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Verify Your Email</h2>
                  <p className={styles.formSubtitle}>We've sent a 6-digit OTP to <strong>{formData.email}</strong>. Please enter it below to verify your account.</p>
                  
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  
                  <form className={styles.form} onSubmit={handleOtpSubmit}>
                    <div className={styles.otpContainer} onPaste={handleOtpPaste}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          maxLength={1}
                          className={styles.otpInput}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          ref={(el) => (inputRefs.current[index] = el)}
                          required
                          disabled={loading}
                        />
                      ))}
                    </div>
                    
                    <button type="submit" className={styles.submitBtn} disabled={loading || otp.join("").length !== 6}>
                      {loading ? "Verifying..." : "Verify Account"}
                    </button>
                  </form>
                  
                  <div className={styles.authFooter}>
                    <p>Didn't receive the email? <button type="button" onClick={handleSignupSubmit} disabled={loading} className={styles.textBtn}>Resend OTP</button></p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.imageSection}>
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageContent}>
              <h1 className={styles.imageTitle}>Join Our Network</h1>
              <p className={styles.imageSubtitle}>Partner with a world-class manufacturer and elevate your brand's collection.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
