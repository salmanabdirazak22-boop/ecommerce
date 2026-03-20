import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function UserDashboard() {
  return (
    <main className={styles.dashboardPage}>
      <div className={`container ${styles.dashboardLayout}`}>
        
        <aside className={styles.sidebar}>
          <div className={styles.profileSummary}>
            <div className={styles.avatar}>JS</div>
            <h3>Jane Smith</h3>
            <p>jane.smith@example.com</p>
          </div>
          <nav className={styles.navMenu}>
            <Link href="/dashboard" className={styles.activeMenu}>My Orders</Link>
            <Link href="/dashboard/subscriptions">Subscriptions</Link>
            <Link href="/dashboard/wishlist">Wishlist</Link>
            <Link href="/dashboard/settings">Account Settings</Link>
          </nav>
          <Button fullWidth variant="secondary" style={{ marginTop: '2rem' }}>Sign Out</Button>
        </aside>

        <section className={styles.mainContent}>
          <h1>My Orders</h1>
          
          <div className={styles.orderList}>
            {[1, 2].map(order => (
              <Card key={order} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <span className={styles.orderLabel}>Order ID</span>
                    <span className={styles.orderValue}>#LUM-938{order}</span>
                  </div>
                  <div>
                    <span className={styles.orderLabel}>Date</span>
                    <span className={styles.orderValue}>Oct 1{order}, 2026</span>
                  </div>
                  <div>
                    <span className={styles.orderLabel}>Total</span>
                    <span className={styles.orderValue}>$298.00</span>
                  </div>
                  <div>
                    <span className={styles.orderLabel}>Status</span>
                    <span className={styles.statusBadge}>Shipped</span>
                  </div>
                </div>
                
                <div className={styles.orderItems}>
                  <div className={styles.itemRow}>
                    <div className={styles.itemImage}></div>
                    <div className={styles.itemDetails}>
                      <h4>Lumière Essential {order}</h4>
                      <p>Qty: 1</p>
                    </div>
                    <div className={styles.itemAction}>
                      <Button variant="secondary">Write Review</Button>
                    </div>
                  </div>
                </div>
                
                <div className={styles.orderFooter}>
                  <Button variant="secondary">Track Package</Button>
                  <Button variant="primary">Buy Again</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
