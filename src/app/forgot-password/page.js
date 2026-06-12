"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./forgot-password.module.css";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setSuccess("We've sent a 6-digit reset code to your email.");
      } else {
        setError(data.message || "Failed to send reset code.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login with success query parameter
        router.push("/login?reset=success");
      } else {
        setError(data.message || "Failed to reset password.");
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
              
              {step === 1 ? (
                <>
                  <h2 className={styles.formTitle}>Password Recovery</h2>
                  <p className={styles.formSubtitle}>Enter your business email to receive a password reset code.</p>
                  
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  {success && <div className={styles.successMessage}>{success}</div>}
                  
                  <form className={styles.form} onSubmit={handleSendOtp}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Business Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="john@company.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading} 
                      />
                    </div>
                    
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                      {loading ? "Sending..." : "Send Reset Code"}
                    </button>
                  </form>
                  
                  <div className={styles.authFooter}>
                    <p>Remember your password? <Link href="/login">Sign In Here</Link></p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Reset Password</h2>
                  <p className={styles.formSubtitle}>Enter the 6-digit code sent to <strong>{email}</strong> and your new password.</p>
                  
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  {success && <div className={styles.successMessage}>{success}</div>}
                  
                  <form className={styles.form} onSubmit={handleResetPassword}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="otp">Reset Code (OTP)</label>
                      <input 
                        type="text" 
                        id="otp" 
                        placeholder="Enter 6-digit code" 
                        required 
                        maxLength="6"
                        onChange={(e) => setOtp(e.target.value)} 
                        value={otp} 
                        disabled={loading} 
                        style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.2em' }}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="newPassword">New Password</label>
                      <div className={styles.passwordWrapper}>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          id="newPassword" 
                          placeholder="Create a strong password" 
                          required 
                          onChange={(e) => setNewPassword(e.target.value)} 
                          value={newPassword} 
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

                    <div className={styles.inputGroup}>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <div className={styles.passwordWrapper}>
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          id="confirmPassword" 
                          placeholder="Confirm your new password" 
                          required 
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          value={confirmPassword} 
                          disabled={loading} 
                        />
                        <button 
                          type="button" 
                          className={styles.eyeBtn} 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
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
                    
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>
                  </form>
                  
                  <div className={styles.authFooter}>
                    <p>Didn't receive the email? <button type="button" onClick={handleSendOtp} disabled={loading} className={styles.textBtn}>Resend Code</button></p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.imageSection}>
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageContent}>
              <h1 className={styles.imageTitle}>Secure Account Recovery</h1>
              <p className={styles.imageSubtitle}>Quickly and safely regain access to your wholesale dashboard.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
