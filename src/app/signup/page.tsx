import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import styles from '../login/page.module.css'; // Reuse login styles

export default function SignupPage() {
  return (
    <main className={styles.loginPage}>
      <div className={`container ${styles.loginContainer}`}>
        <Card className={styles.loginCard}>
          <h1>Create Account</h1>
          <p>Join the LUMIÈRE community today.</p>
          
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Create a password" required />
            </div>
            
            <p className={styles.terms} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
            
            <Button fullWidth variant="primary" type="submit" className={styles.submitBtn}>
              Create Account
            </Button>
          </form>
          
          <div className={styles.footer}>
            <p>Already have an account? <a href="/login">Sign In</a></p>
          </div>
        </Card>
      </div>
    </main>
  );
}
