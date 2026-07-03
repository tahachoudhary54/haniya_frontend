"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./addresses.module.css";
import API_URL from "@/lib/api";

export default function AddressesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

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
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newAddresses = await res.json();
        setAddresses(newAddresses);
        setShowForm(false);
        setFormData({ label: "", address: "", city: "", postalCode: "", country: "" });
      }
    } catch (error) {
      console.error("Failed to add address");
    }
  };

  const handleDelete = async (addressId) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}/addresses/${addressId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        const newAddresses = await res.json();
        setAddresses(newAddresses);
      }
    } catch (error) {
      console.error("Failed to delete address");
    }
  };

  return (
    <>
      <Navbar />
      
      <main style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '1px 0' }}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h1>Saved Addresses</h1>
              <p>Manage your shipping locations for faster checkout.</p>
            </div>
            {!showForm && (
              <button className={styles.addBtn} onClick={() => setShowForm(true)}>
                <Plus size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
                Add New Address
              </button>
            )}
          </div>
          
          {showForm && (
            <div className={styles.formContainer}>
              <h3>Add New Address</h3>
              <form className={styles.form} onSubmit={handleAddAddress}>
                <div className={styles.formGroup}>
                  <label>Label (e.g. Office, Warehouse)</label>
                  <input type="text" name="label" value={formData.label} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Street Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className={styles.formGroup}>
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Postal Code</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Country</label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                
                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className={styles.saveBtn}>Save Address</button>
                </div>
              </form>
            </div>
          )}
          
          {loading ? (
            <p>Loading addresses...</p>
          ) : addresses.length === 0 && !showForm ? (
            <div className={styles.emptyState}>
              <h2>No Saved Addresses</h2>
              <p>You haven't saved any addresses yet. Add one to make wholesale checkout faster.</p>
            </div>
          ) : (
            <div className={styles.addressesGrid}>
              {addresses.map((addr) => (
                <div key={addr._id} className={styles.addressCard}>
                  <button 
                    className={styles.deleteBtn} 
                    onClick={() => handleDelete(addr._id)}
                    title="Delete Address"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className={styles.addressLabel}>{addr.label}</div>
                  <div className={styles.addressText}>
                    {addr.address}<br />
                    {addr.city}, {addr.postalCode}<br />
                    {addr.country}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
