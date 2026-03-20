"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import styles from './page.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
  image?: string;
  category?: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  useEffect(() => {
    if (status === 'authenticated' && (session?.user as any).role === 'ADMIN') {
      fetchProducts();
    }
  }, [status]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      const res = await fetch(`/api/admin/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editForm }),
      });
      if (res.ok) {
        alert('Product updated!');
        setEditingId(null);
        fetchProducts();
      }
    } catch (err) {
      alert('Failed to update');
    }
  };

  if (status === 'loading') return <div className="container">Loading...</div>;
  if ((session?.user as any)?.role !== 'ADMIN') return <div className="container">Unauthorized</div>;

  return (
    <main className={styles.adminPage}>
      <div className="container">
        <h1 className={styles.title}>Admin Control Center</h1>
        
        <Card className={styles.section}>
          <h2>Inventory Management</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>
                      {editingId === p.id ? (
                        <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className={styles.editInput} />
                      ) : p.name}
                    </td>
                    <td>
                      {editingId === p.id ? (
                        <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className={styles.editInput} />
                      ) : `$${p.price}`}
                    </td>
                    <td>
                      {editingId === p.id ? (
                        <input type="number" value={editForm.inventory} onChange={e => setEditForm({...editForm, inventory: Number(e.target.value)})} className={styles.editInput} />
                      ) : p.inventory}
                    </td>
                    <td>{p.category || 'N/A'}</td>
                    <td>
                      {editingId === p.id ? (
                        <div className={styles.actions}>
                          <Button size="small" onClick={handleUpdate}>Save</Button>
                          <Button size="small" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <Button size="small" variant="accent" onClick={() => handleEdit(p)}>Edit</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className={styles.section}>
          <h2>Product Image Management</h2>
          <p>Click edit on a product above to update its image URL or upload new assets.</p>
          {editingId && (
            <div className={styles.imageEdit}>
               <label>Image URL</label>
               <input 
                value={editForm.image || ''} 
                onChange={e => setEditForm({...editForm, image: e.target.value})} 
                className={styles.fullInput} 
                placeholder="https://..."
               />
               {editForm.image && <img src={editForm.image} alt="Preview" className={styles.preview} />}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
