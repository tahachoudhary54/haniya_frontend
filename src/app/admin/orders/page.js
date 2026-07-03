"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import { CheckCircle, Truck, Package, Clock } from "lucide-react";
import API_URL from "@/lib/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (id) => {
    if (window.confirm("Mark this order as delivered?")) {
      try {
        const res = await fetch(`${API_URL}/api/orders/${id}/deliver`, {
          method: "PUT"
        });
        if (res.ok) {
          fetchOrders(); // refresh
        }
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={16} />;
      case 'Processing': return <Package size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return { bg: '#feebc8', color: '#dd6b20' };
      case 'Processing': return { bg: '#e2e8f0', color: '#4a5568' };
      case 'Shipped': return { bg: '#bee3f8', color: '#3182ce' };
      case 'Delivered': return { bg: '#c6f6d5', color: '#38a169' };
      default: return { bg: '#e2e8f0', color: '#4a5568' };
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Manage Orders</h1>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>
            No orders found.
          </div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <tr key={order._id}>
                    <td style={{ fontWeight: '500', fontFamily: 'monospace' }}>
                      {order._id.substring(0, 8).toUpperCase()}
                    </td>
                    <td>
                      <div style={{ fontWeight: '500', color: '#2d3748' }}>{order.user?.fullName || 'Unknown User'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#a0aec0' }}>{order.user?.email}</div>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ fontWeight: '600' }}>₹{order.totalPrice.toFixed(2)}</td>
                    <td>
                      <span style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px', 
                        background: statusStyle.bg, 
                        color: statusStyle.color, 
                        borderRadius: '20px', 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold' 
                      }}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {!order.isDelivered && (
                        <button 
                          onClick={() => markAsDelivered(order._id)}
                          style={{
                            background: '#0d2b4d',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
