"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Drawer } from '@/components/ui/Drawer/Drawer';
import { Button } from '@/components/ui/Button/Button';
import styles from './SmartCart.module.css';

export const SmartCart: React.FC = () => {
  const { isCartOpen, toggleCart, items, removeItem, updateQuantity, cartTotal } = useCart();

  return (
    <Drawer isOpen={isCartOpen} onClose={toggleCart} title="Your Cart" position="right">
      <div className={styles.cartContainer}>
        {items.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is currently empty.</p>
            <Button onClick={toggleCart} className={styles.continueBtn}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImageContainer}>
                     <div className={styles.imagePlaceholder}></div>
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                    &times;
                  </button>
                </div>
              ))}
            </div>
            
            <div className={styles.cartFooter}>
              <div className={styles.upsell}>
                <p><strong>Special Offer:</strong> Add a Silk Pillowcase for $19.99</p>
                <button className={styles.upsellBtn}>Add to Cart</button>
              </div>
              <div className={styles.summaryContainer}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button fullWidth variant="accent" className={styles.checkoutBtn}>
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};
