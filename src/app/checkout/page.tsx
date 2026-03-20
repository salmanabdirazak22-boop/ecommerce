"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zip: ''
  });

  if (status === 'loading') return <div className="container">Loading...</div>;

  if (status === 'unauthenticated') {
    router.push('/login?callbackUrl=/checkout');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingInfo: formData }),
      });

      const { url, error } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        alert(error || 'Failed to initiate checkout');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.checkoutPage}>
      <div className={`container ${styles.checkoutLayout}`}>
        
        <div className={styles.formSection}>
          <h1 className={styles.pageTitle}>LUMIÈRE Checkout</h1>
          <form onSubmit={handleCheckout}>
            
            <div className={styles.formGroup}>
              <h2>Contact Information</h2>
              <input 
                type="email" 
                name="email" 
                placeholder="Email address" 
                required 
                className={styles.input} 
                onChange={handleChange} 
                defaultValue={session?.user?.email || ''}
              />
            </div>

            <div className={styles.formGroup}>
              <h2>Shipping Address</h2>
              <div className={styles.inputRow}>
                <input type="text" name="firstName" placeholder="First name" required className={styles.input} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last name" required className={styles.input} onChange={handleChange} />
              </div>
              <input type="text" name="address" placeholder="Address" required className={styles.input} onChange={handleChange} />
              <div className={styles.inputRow}>
                <input type="text" name="city" placeholder="City" required className={styles.input} onChange={handleChange} />
                <input type="text" name="country" placeholder="Country" required className={styles.input} onChange={handleChange} />
                <input type="text" name="zip" placeholder="ZIP / Postal Code" required className={styles.input} onChange={handleChange} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <h2>Payment Method</h2>
              <Card padding="none" className={styles.paymentMethods}>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" value="credit_card" defaultChecked />
                  <span>Credit Card (Stripe)</span>
                </label>
                <div className={styles.divider}></div>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" value="paypal" disabled />
                  <span>PayPal (Coming Soon)</span>
                </label>
              </Card>
            </div>

            <Button type="submit" size="large" fullWidth variant="primary" className={styles.payBtn} disabled={loading || items.length === 0}>
              {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)} Now`}
            </Button>
            <p className={styles.secureNote}>🔒 100% Encrypted & Secure Checkout</p>

          </form>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summarySticky}>
            <h2>Order Summary</h2>
            
            <div className={styles.itemsList}>
              {items.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.itemImage} style={{ backgroundImage: `url(${item.image || ''})` }}>
                    <span className={styles.itemQuantity}>{item.quantity}</span>
                  </div>
                  <div className={styles.itemInfo}>
                    <h4>{item.name}</h4>
                  </div>
                  <div className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              {items.length === 0 && <p>Your cart is empty.</p>}
            </div>

            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
