import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className="animate-fade-in">Elevate Your Everyday</h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover minimalist luxury products designed for the modern aesthetic. Curated with excellence, delivered to your door.
          </p>
          <div className={`${styles.heroCta} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
            <Link href="/shop">
              <Button className={styles.ctaBtn} variant="primary">Shop Collection</Button>
            </Link>
            <Link href="/categories">
              <Button className={styles.ctaBtn} variant="secondary">View Lookbook</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2>Shop by Category</h2>
          <Link href="/categories" className={styles.viewAll}>View All</Link>
        </div>
        <div className={styles.categoryGrid}>
          {['Home Decor', 'Lifestyle', 'Tech Accessories'].map((category, idx) => (
            <Link href={`/category/${category.toLowerCase().replace(' ', '-')}`} key={idx}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryImage}></div>
                <div className={styles.categoryOverlay}>
                  <h3>{category}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <div className={`container ${styles.section}`}>
          <div className={styles.sectionHeader}>
            <h2>Trending Now</h2>
            <Link href="/shop/trending" className={styles.viewAll}>Shop Trending</Link>
          </div>
          <div className={styles.productGrid}>
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} hoverEffect padding="none" className={styles.productCard}>
                <div className={styles.productImage}>
                  <div className={styles.badge}>Bestseller</div>
                </div>
                <div className={styles.productInfo}>
                  <h3>Lumière Essential {item}</h3>
                  <p className={styles.productPrice}>$129.00 <span className={styles.comparePrice}>$189.00</span></p>
                  <Button fullWidth variant="primary" style={{ marginTop: '1rem' }}>Add to Cart</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition / Testimonials */}
      <section className={`container ${styles.section} ${styles.testimonials}`}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Choose LUMIÈRE</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✦</div>
            <h3>Premium Quality</h3>
            <p>Sourced from the finest manufacturers globally.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✦</div>
            <h3>Fast Shipping</h3>
            <p>Express global delivery direct to your door.</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>✦</div>
            <h3>Secure Checkout</h3>
            <p>100% secure payment processing via Stripe & PayPal.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
