"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import styles from "../../admin.module.css";
import API_URL from "@/lib/api";

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Shirts",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Please select an image");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // 1. Upload Image
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const uploadRes = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: imageFormData
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");
      const imagePath = await uploadRes.text();

      // 2. Create Product
      const productRes = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          image: imagePath
        })
      });

      if (!productRes.ok) throw new Error("Product creation failed");

      // Success
      router.push("/admin/products");

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save product");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/admin/products" style={{ color: '#4a5568', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={24} />
          </Link>
          <h1>Add New Product</h1>
        </div>
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
        {error && <div style={{ background: '#fed7d7', color: '#c53030', padding: '12px', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' }}>Product Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange}
              style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem' }}
              placeholder="e.g. Classic Oxford Shirt"
            />
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' }}>Price (₹)</label>
              <input 
                type="number" 
                name="price" 
                required 
                min="0"
                step="0.01"
                value={formData.price} 
                onChange={handleChange}
                style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem' }}
                placeholder="499.00"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' }}>Stock Quantity</label>
              <input 
                type="number" 
                name="stock" 
                required 
                min="0"
                value={formData.stock} 
                onChange={handleChange}
                style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem' }}
                placeholder="100"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' }}>Category</label>
              <input 
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Shirts"
                required
                style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', backgroundColor: 'white' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' }}>Product Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ padding: '9px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem' }}
              />
              {imagePreview && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} 
                  />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', color: '#4a5568', fontSize: '0.9rem' }}>Description</label>
            <textarea 
              name="description" 
              required 
              value={formData.description} 
              onChange={handleChange}
              rows="5"
              style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '1rem', fontFamily: 'inherit' }}
              placeholder="Describe the product details, material, fit, etc."
            ></textarea>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button type="submit" disabled={loading} className={styles.primaryBtn} style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <Save size={20} />
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
