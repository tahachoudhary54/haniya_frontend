"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./orders.module.css";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("haniya_user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      fetchOrders(parsedUser.id);
    } catch (e) {
      router.push("/login");
    }
  }, [router]);

  const fetchOrders = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/my-orders/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return styles.statusPending;
      case 'Processing': return styles.statusProcessing;
      case 'Shipped': return styles.statusShipped;
      case 'Delivered': return styles.statusDelivered;
      default: return styles.statusPending;
    }
  };

  return (
    <>
      <Navbar />
      
      <main style={{ minHeight: '80vh', backgroundColor: '#f8fafc', padding: '1px 0' }}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>My Orders</h1>
            <p>View your past wholesale orders and their current status.</p>
          </div>
          
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any wholesale orders yet.</p>
              <Link href="/products" className={styles.shopBtn}>Browse Products</Link>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderHeaderInfo}>
                      <div className={styles.infoBlock}>
                        <span className={styles.infoLabel}>Order Placed</span>
                        <span className={styles.infoValue}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={styles.infoBlock}>
                        <span className={styles.infoLabel}>Total Amount</span>
                        <span className={styles.infoValue}>₹{order.totalPrice.toFixed(2)}</span>
                      </div>
                      <div className={styles.infoBlock}>
                        <span className={styles.infoLabel}>Order #</span>
                        <span className={styles.infoValue}>{order._id.substring(18).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className={`${styles.status} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className={styles.orderBody}>
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className={styles.item}>
                        <img src={`http://localhost:5000${item.image}`} alt={item.name} className={styles.itemImg} />
                        <div className={styles.itemDetails}>
                          <div className={styles.itemName}>{item.name}</div>
                          <div className={styles.itemQty}>Qty: {item.qty} &times; ₹{item.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
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
