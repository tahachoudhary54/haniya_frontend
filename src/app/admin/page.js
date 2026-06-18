"use client";

import { useState, useEffect } from "react";
import styles from "./admin.module.css";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    activePartners: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const stats = [
    { label: "Total Revenue", value: `₹${data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: <DollarSign size={24} color="#d4af37" />, trend: "Updated now" },
    { label: "Total Orders", value: data.totalOrders.toString(), icon: <ShoppingBag size={24} color="#d4af37" />, trend: "Updated now" },
    { label: "Total Products", value: data.totalProducts.toString(), icon: <Package size={24} color="#d4af37" />, trend: "Updated now" },
    { label: "Active Partners", value: data.activePartners.toString(), icon: <Users size={24} color="#d4af37" />, trend: "Updated now" },
  ];

  if (loading) {
    return <div className={styles.loading}>Loading Dashboard...</div>;
  }

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
        <h1>Dashboard Overview</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ color: '#718096', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>{stat.label}</p>
                <h3 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1a202c', margin: 0, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  {stat.value}
                </h3>
              </div>
              <div style={{ padding: '12px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%' }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#48bb78', fontWeight: '500' }}>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableContainer}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1a202c' }}>Recent Orders</h2>
        </div>
        {data.recentOrders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>
            No recent orders.
          </div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <tr key={order._id}>
                    <td style={{ fontFamily: 'monospace' }}>#{order._id.substring(0, 8).toUpperCase()}</td>
                    <td>{order.user?.companyName || order.user?.fullName || 'Unknown Customer'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ fontWeight: '600' }}>₹{order.totalPrice.toFixed(2)}</td>
                    <td>
                      <span style={{ padding: '4px 8px', background: statusStyle.bg, color: statusStyle.color, borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {order.status}
                      </span>
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
