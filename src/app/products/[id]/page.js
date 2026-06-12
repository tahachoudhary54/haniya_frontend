import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./ProductDetail.module.css";
import { MessageCircle } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "./ProductGallery";

// Mock data fetcher
function getProductData(id) {
  const baseData = {
    id,
    name: "Classic White Oxford",
    fabric: "100% Egyptian Cotton",
    moq: 50,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    details: {
      weave: "Oxford",
      weight: "140 gsm",
      care: "Machine wash cold, tumble dry low"
    },
    pricing: [
      { qty: "50 - 199", price: "₹35.00" },
      { qty: "200 - 499", price: "₹32.00" },
      { qty: "500+", price: "₹29.00" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  };

  if (id === "rfd") {
    baseData.name = "R.F.D Shirts";
    baseData.images[0] = "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  } else if (id === "linen") {
    baseData.name = "Linen Shirts";
    baseData.images[0] = "/images/fabric.jpg";
  } else if (id === "rfd-double") {
    baseData.name = "RFD Double Shirts";
    baseData.images[0] = "/images/pattern.jpg";
  }

  return baseData;
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductData(id);

  let stockBadge = null;
  if (product.stock === 0) {
    stockBadge = <span className={`${styles.stockStatus} ${styles.outOfStock}`}>Out of Stock</span>;
  } else if (product.stock <= 15) {
    stockBadge = <span className={`${styles.stockStatus} ${styles.lowStock}`}>Only {product.stock} Left</span>;
  } else {
    // Requirements stated "Never show 'In Stock'". So we just don't show a badge if it's normal stock.
  }

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <ProductGallery images={product.images} />
          
          <div className={styles.info}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.fabric}>{product.fabric}</p>
            {stockBadge}

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Product Details</h3>
              <div className={styles.detailsList}>
                <div><span>MOQ:</span> {product.moq} pieces</div>
                <div><span>Weave:</span> {product.details.weave}</div>
                <div><span>Weight:</span> {product.details.weight}</div>
                <div><span>Care:</span> {product.details.care}</div>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Wholesale Pricing</h3>
              <table className={styles.pricingTable}>
                <thead>
                  <tr>
                    <th>Quantity (Pieces)</th>
                    <th>Price per Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {product.pricing.map((tier, idx) => (
                    <tr key={idx}>
                      <td>{tier.qty}</td>
                      <td>{tier.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Size Chart</h3>
              <div className={styles.sizeChart}>
                {product.sizes.map(size => (
                  <div key={size} className={styles.sizeBox}>{size}</div>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <AddToCartButton product={product} className={styles.btnQuote} />
              <button className={styles.btnWhatsapp}>
                <MessageCircle size={20} />
                WhatsApp Inquiry
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
