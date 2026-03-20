import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <div className={`container ${styles.loginContainer}`}>
        <Card className={styles.loginCard}>
          <h1>Welcome Back</h1>
          <p>Login to your account to continue.</p>
          
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            
            <div className={styles.actions}>
              <label className={styles.remember}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className={styles.forgot}>Forgot password?</a>
            </div>
            
            <Button fullWidth variant="primary" type="submit" className={styles.submitBtn}>
              Sign In
            </Button>
          </form>
          
          <div className={styles.footer}>
            <p>Don't have an account? <a href="/signup">Create One</a></p>
          </div>
        </Card>
      </div>
    </main>
  );
}
