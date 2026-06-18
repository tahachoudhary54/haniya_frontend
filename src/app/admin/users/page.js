"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import { CheckCircle, XCircle, Shield, User } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (id) => {
    if (window.confirm("Manually verify this user? They will be able to log in without email verification.")) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}/verify`, {
          method: "PUT"
        });
        if (res.ok) {
          fetchUsers(); // refresh
        }
      } catch (error) {
        console.error("Failed to verify user:", error);
      }
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Manage Users & Partners</h1>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>Loading users...</div>
        ) : users.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>
            No users found.
          </div>
        ) : (
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Name / Company</th>
                <th>Contact Info</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div style={{ fontWeight: '600', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {user.role === 'admin' ? <Shield size={16} color="#d4af37" /> : <User size={16} color="#a0aec0" />}
                      {user.fullName}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#718096', marginTop: '4px' }}>
                      {user.companyName}
                    </div>
                  </td>
                  <td>
                    <div style={{ color: '#4a5568' }}>{user.email}</div>
                    <div style={{ fontSize: '0.85rem', color: '#718096' }}>{user.phone}</div>
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      background: user.role === 'admin' ? '#fefcbf' : '#e2e8f0',
                      color: user.role === 'admin' ? '#b7791f' : '#4a5568',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {user.role || 'User'}
                    </span>
                  </td>
                  <td>
                    {user.isVerified ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#38a169', fontSize: '0.85rem', fontWeight: '500' }}>
                        <CheckCircle size={16} /> Verified
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#e53e3e', fontSize: '0.85rem', fontWeight: '500' }}>
                        <XCircle size={16} /> Unverified
                      </span>
                    )}
                  </td>
                  <td style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {!user.isVerified && (
                      <button 
                        onClick={() => verifyUser(user._id)}
                        style={{
                          background: '#e2e8f0',
                          color: '#2d3748',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#cbd5e0'}
                        onMouseOut={(e) => e.target.style.background = '#e2e8f0'}
                      >
                        Verify User
                      </button>
                    )}
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
