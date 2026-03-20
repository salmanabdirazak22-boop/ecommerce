import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

export default function CheckoutCancelPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h1 style={{ marginBottom: '1rem' }}>Checkout Cancelled</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
            Your payment was not processed. Your items are still in your cart if you'd like to try again.
          </p>
          <Link href="/checkout">
            <Button variant="primary">Return to Checkout</Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}
