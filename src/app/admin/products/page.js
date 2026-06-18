"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import styles from "../admin.module.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          fetchProducts(); // refresh
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Manage Products</h1>
        <Link href="/admin/products/new" className={styles.primaryBtn}>
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>
            No products found. Click "Add New Product" to create one.
          </div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img 
                      src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
                      alt={product.name} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                    />
                  </td>
                  <td style={{ fontWeight: '500', color: '#2d3748' }}>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      background: product.stock > 10 ? '#c6f6d5' : '#fed7d7', 
                      color: product.stock > 10 ? '#2f855a' : '#c53030', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold' 
                    }}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.edit}`} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.delete}`} onClick={() => handleDelete(product._id)} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
