"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, LayoutDashboard, Package, ShoppingBag, Users, LogOut, Home } from "lucide-react";
import styles from "./admin.module.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const storedUser = localStorage.getItem("haniya_user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.role === 'admin') {
            setIsAdmin(true);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
      // If not admin, redirect
      router.push("/");
    };

    checkAdmin();
  }, [router]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  if (loading) {
    return <div className={styles.loading}>Loading Admin Panel...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("haniya_user");
    window.dispatchEvent(new Event("auth_change"));
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingBag size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.adminLayout}>
      <div className={styles.mobileHeader}>
        <button onClick={toggleSidebar} className={styles.menuBtn}>
          <Menu size={24} />
        </button>
        <h2>Haniya Admin</h2>
      </div>

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2>Haniya Admin</h2>
          <button className={styles.closeBtn} onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backBtn}>
            <Home size={20} />
            <span>Back to Shop</span>
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
