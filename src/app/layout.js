import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "HANIYA GARMENTS | Premium Men's Shirts Wholesale",
  description: "Supplying retailers and distributors with high-quality men's shirts crafted with precision.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

import { CartProvider } from "@/context/CartContext";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`} style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <CartProvider>
          {children}
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  );
}
