import React from 'react';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function InfluencerDashboard() {
  return (
    <main className={styles.dashboardPage}>
      <div className={`container ${styles.dashboardLayout}`}>
        
        <aside className={styles.sidebar}>
          <div className={styles.profileSummary}>
            <div className={styles.avatar}>AL</div>
            <h3>Alex Luxe</h3>
            <p className={styles.badge}>Diamond Partner</p>
          </div>
          <nav className={styles.navMenu}>
            <span className={styles.activeMenu}>Overview</span>
            <span>Analytics</span>
            <span>Payouts</span>
            <span>Marketing Assets</span>
          </nav>
        </aside>

        <section className={styles.mainContent}>
          <h1>Partner Dashboard</h1>
          
          <div className={styles.statsGrid}>
            <Card className={styles.statCard}>
              <h3>Total Earnings</h3>
              <p className={styles.statValue}>$4,250.00</p>
              <span className={styles.trendUp}>+12.5% this month</span>
            </Card>
            <Card className={styles.statCard}>
              <h3>Clicks (30d)</h3>
              <p className={styles.statValue}>12,408</p>
              <span className={styles.trendUp}>+5.2% this month</span>
            </Card>
            <Card className={styles.statCard}>
              <h3>Conversion Rate</h3>
              <p className={styles.statValue}>3.8%</p>
              <span className={styles.trendDown}>-0.4% from last month</span>
            </Card>
          </div>

          <Card className={styles.linkSection}>
            <h2>Your Tracking Link</h2>
            <div className={styles.linkRow}>
              <input type="text" readOnly value="https://lumiere.com/?ref=alexluxe20" className={styles.affiliateLink} />
              <Button variant="primary">Copy Link</Button>
            </div>
            <p className={styles.linkHelp}>Share this link to earn 10% commission on all sales generated within 30 days of clicking.</p>
          </Card>

          <h2>Recent Referrals</h2>
          <Card className={styles.tableCard} padding="none">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order Value</th>
                  <th>Commission</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Today, 2:45 PM</td>
                  <td>$299.00</td>
                  <td>$29.90</td>
                  <td><span className={styles.statusPending}>Pending</span></td>
                </tr>
                <tr>
                  <td>Yesterday</td>
                  <td>$159.00</td>
                  <td>$15.90</td>
                  <td><span className={styles.statusCleared}>Cleared</span></td>
                </tr>
              </tbody>
            </table>
          </Card>

        </section>

      </div>
    </main>
  );
}
