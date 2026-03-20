"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'reviews'>('details');

  const product = {
    id: `prod-${params.slug}`,
    name: params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    price: 159.00,
    comparePrice: 220.00,
    description: "Experience the epitome of minimalist luxury. Crafted with exceptional materials and precision engineering, this piece elevates your daily routine while seamlessly blending into your modern aesthetic.",
    features: [
      "Premium aerospace-grade materials",
      "Ergonomic, balanced design",
      "Lifetime limited warranty",
      "Eco-friendly packaging"
    ]
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity
    });
  };

  return (
    <main className={styles.productPage}>
      <div className={`container ${styles.productLayout}`}>
        
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
             <div className={styles.imagePlaceholder}>
               <span className={styles.zoomHint}>Hover to zoom</span>
             </div>
          </div>
          <div className={styles.thumbnails}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.thumbnailPlaceholder}></div>
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.breadcrumbs}>
            Home / Shop / {product.name}
          </div>
          
          <h1 className={styles.title}>{product.name}</h1>
          
          <div className={styles.priceContainer}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span className={styles.comparePrice}>${product.comparePrice.toFixed(2)}</span>
            <span className={styles.saveBadge}>Save $61.00</span>
          </div>
          
          <div className={styles.urgency}>
            <span className={styles.pulsingDot}></span>
            <span><strong>14 people</strong> are viewing this right now</span>
          </div>

          <p className={styles.description}>{product.description}</p>
          
          <ul className={styles.features}>
            {product.features.map((feat, i) => (
              <li key={i}>✓ {feat}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <div className={styles.quantity}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <Button className={styles.addToCartBtn} onClick={handleAddToCart}>
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>

          <Button fullWidth variant="accent" className={styles.buyNowBtn}>
            Buy it Now
          </Button>

          <div className={styles.guarantees}>
            <div className={styles.guarantee}><span className={styles.icon}>🚚</span> Free Global Shipping</div>
            <div className={styles.guarantee}><span className={styles.icon}>↩️</span> 30-Day Returns</div>
            <div className={styles.guarantee}><span className={styles.icon}>🔒</span> Secure Checkout</div>
          </div>

          <div className={styles.tabs}>
            <div className={styles.tabHeaders}>
              <button className={activeTab === 'details' ? styles.activeTab : ''} onClick={() => setActiveTab('details')}>Details</button>
              <button className={activeTab === 'shipping' ? styles.activeTab : ''} onClick={() => setActiveTab('shipping')}>Shipping</button>
              <button className={activeTab === 'reviews' ? styles.activeTab : ''} onClick={() => setActiveTab('reviews')}>Reviews</button>
            </div>
            <div className={styles.tabContent}>
              {activeTab === 'details' && <p>Detailed specifications would go here. Material compositions, dimensions, and care instructions.</p>}
              {activeTab === 'shipping' && <p>Free standard shipping on all orders. Express options available at checkout. Dispatches within 24 hours.</p>}
              {activeTab === 'reviews' && <p>★★★★★ (4.8 based on 124 reviews)<br/><br/>"Absolutely transformative product. Could not recommend more highly." - Sarah T.</p>}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
