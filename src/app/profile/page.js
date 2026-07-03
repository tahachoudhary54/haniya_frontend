"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./profile.module.css";
import API_URL from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("haniya_user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchProfile(parsedUser.id);
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  const fetchProfile = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/api/users/${userId}/profile`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          fullName: data.fullName || "",
          companyName: data.companyName || "",
          email: data.email || "",
          phone: data.phone || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        // Update local storage
        localStorage.setItem("haniya_user", JSON.stringify(data));
        window.dispatchEvent(new Event("auth_change"));
      } else {
        setMessage({ type: "error", text: data.message || "Update failed." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error occurred." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '1px 0' }}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>My Profile</h1>
            <p>Manage your account details and business information.</p>
          </div>
          
          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              {message.text && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                  {message.text}
                </div>
              )}
              
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  disabled 
                  title="Email address cannot be changed."
                />
              </div>

              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Company/Business Name</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
