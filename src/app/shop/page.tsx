"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function ShopPage() {
  return (
    <div className={`container ${styles.shopPage}`}>
      <div className={styles.shopHeader}>
        <h1>All Products</h1>
        <p>Curated minimalist luxury for your modern life.</p>
      </div>

      <div className={styles.shopLayout}>
        <aside className={styles.filters}>
          <h3>Filters</h3>
          
          <div className={styles.filterGroup}>
            <h4>Category</h4>
            <ul>
              <li><label><input type="checkbox" /> Home Decor</label></li>
              <li><label><input type="checkbox" /> Lifestyle</label></li>
              <li><label><input type="checkbox" /> Tech Accessories</label></li>
              <li><label><input type="checkbox" /> Essentials</label></li>
            </ul>
          </div>
          
          <div className={styles.filterGroup}>
            <h4>Price Range</h4>
            <ul>
              <li><label><input type="radio" name="price" /> Under $50</label></li>
              <li><label><input type="radio" name="price" /> $50 - $150</label></li>
              <li><label><input type="radio" name="price" /> Over $150</label></li>
            </ul>
          </div>

          <Button fullWidth variant="secondary" className={styles.filterBtn}>Apply Filters</Button>
        </aside>

        <section className={styles.productGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Link href={`/product/lumiere-essential-${item}`} key={item}>
              <Card hoverEffect padding="none" className={styles.productCard}>
                <div className={styles.productImage}></div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>Lumière Essential {item}</h3>
                  <div className={styles.productMeta}>
                    <p className={styles.productPrice}>${(129 + item * 10).toFixed(2)}</p>
                    <div className={styles.rating}>★★★★★</div>
                  </div>
                  <Button fullWidth variant="primary" style={{ marginTop: '1rem' }} onClick={(e) => { e.preventDefault(); console.log('Add to cart'); }}>Add to Cart</Button>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
