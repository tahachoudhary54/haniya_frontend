"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const { getCartCount, isInitialized } = useCart();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("haniya_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("auth_change", checkAuth);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth_change", checkAuth);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Manufacturing", path: "/manufacturing" },
    { name: "Wholesale", path: "/wholesale" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("haniya_user");
    setUser(null);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("auth_change"));
    router.push("/login");
  };

  const darkHeroPages = ['/', '/wholesale', '/about', '/contact'];
  const hasDarkHero = darkHeroPages.includes(pathname);
  const isHeroTransparent = hasDarkHero && !isScrolled;

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${isHeroTransparent ? styles.heroTransparent : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Haniya Garments Logo" className={styles.logoImg} />
        </Link>
        
        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileOpen : ""}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname === '/' && item.path === '/');
            // Since #about and #contact are on the home page, path matching is tricky for hash links in Next.js without custom logic,
            // but we can simply match the exact pathname for Products, Manufacturing, Wholesale.
            const isExactActive = pathname === item.path;

            return (
              <Link 
                key={item.name} 
                href={item.path} 
                className={`${styles.navLink} ${isExactActive ? styles.active : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          
          {user ? (
            <div className={styles.accountDropdown}>
              <button className={styles.loginBtn}>My Account</button>
              <div className={styles.dropdownMenu}>
                {user?.role === 'admin' && (
                  <Link href="/admin" className={styles.dropdownItem} onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
                )}
                {user?.role !== 'admin' && (
                  <>
                    <Link href="/profile" className={styles.dropdownItem} onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                    <Link href="/orders" className={styles.dropdownItem} onClick={() => setMobileMenuOpen(false)}>Orders</Link>
                    <Link href="/addresses" className={styles.dropdownItem} onClick={() => setMobileMenuOpen(false)}>Addresses</Link>
                  </>
                )}
                <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
              </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className={styles.loginBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              Partner Login
            </Link>
          )}

          {user && (
            <Link href="/cart" className={`${styles.cartIcon} ${styles.desktopCart}`} onClick={() => setMobileMenuOpen(false)}>
              <ShoppingCart size={24} />
              {isInitialized && getCartCount() > 0 && (
                <span className={styles.cartBadge}>{getCartCount()}</span>
              )}
            </Link>
          )}
        </div>

        <div className={styles.mobileActions}>
          {user && !mobileMenuOpen && (
            <Link href="/cart" className={`${styles.cartIcon} ${styles.mobileCart}`} onClick={() => setMobileMenuOpen(false)}>
              <ShoppingCart size={24} />
              {isInitialized && getCartCount() > 0 && (
                <span className={styles.cartBadge}>{getCartCount()}</span>
              )}
            </Link>
          )}
          <button className={styles.hamburger} onClick={toggleMobileMenu} aria-label="Toggle menu">
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar1Open : ""}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar2Open : ""}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar3Open : ""}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
