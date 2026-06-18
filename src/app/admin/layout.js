"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from "lucide-react";
import styles from "./admin.module.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Haniya Admin</h2>
        </div>
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
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
