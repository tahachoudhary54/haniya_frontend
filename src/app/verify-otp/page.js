"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./verify.module.css";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Allow taking the last character if they paste or type fast
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      
      // Focus the next empty input or the last one
      const focusIndex = Math.min(digits.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Dummy API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // router.push("/login"); // or wherever next
      alert("Email verified successfully! You can now sign in.");
      router.push("/login");
    } catch (err) {
      setError("Invalid OTP code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setError("");
    // Add logic to trigger resend email API
    alert("Verification code resent to your email.");
  };

  return (
    <>
      <Navbar />
      <main className={styles.authPage}>
        <div className={styles.splitContainer}>
          <div className={styles.imageSection}>
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageContent}>
              <h1 className={styles.imageTitle}>Secure Access</h1>
              <p className={styles.imageSubtitle}>Verify your identity to ensure the safety of your wholesale account and orders.</p>
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.formWrapper}>
              <h2 className={styles.formTitle}>Verify Email</h2>
              <p className={styles.formSubtitle}>We've sent a 6-digit code to your email address. Enter it below to verify your account.</p>
              
              {error && <div className={styles.errorMessage}>{error}</div>}
              
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.otpContainer} onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      className={styles.otpInput}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      required
                    />
                  ))}
                </div>
                
                <button type="submit" className={styles.submitBtn} disabled={loading || otp.join("").length !== 6}>
                  {loading ? "Verifying..." : "Verify Code"}
                </button>
              </form>
              
              <div className={styles.authFooter}>
                <p>
                  Didn't receive the code? 
                  <button 
                    className={styles.resendBtn} 
                    onClick={handleResend} 
                    disabled={timer > 0}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
                  </button>
                </p>
                <p style={{ marginTop: '15px' }}>
                  <Link href="/login">Back to Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
