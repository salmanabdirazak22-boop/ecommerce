import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>LUMIÈRE</h2>
          <p className={styles.tagline}>Curated excellence for the modern lifestyle.</p>
        </div>
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h3>Shop</h3>
            <ul>
              <li><Link href="/shop/new">New Arrivals</Link></li>
              <li><Link href="/shop/best">Best Sellers</Link></li>
              <li><Link href="/shop/sale">Sale</Link></li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h3>Support</h3>
            <ul>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping & Returns</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} LUMIÈRE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
