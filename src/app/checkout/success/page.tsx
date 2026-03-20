import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

export default function CheckoutSuccessPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ marginBottom: '1rem' }}>Payment Successful!</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
            Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/dashboard">
              <Button variant="secondary">View My Orders</Button>
            </Link>
            <Link href="/shop">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
