"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import styles from './ProductReviews.module.css';

interface Review {
  id: string;
  rating: number;
  comment: string;
  videoUrl?: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

export default function ProductReviews({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    videoUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return alert('Please login to leave a review');
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, productId }),
      });
      
      if (res.ok) {
        alert('Review submitted! It will appear once approved by an admin.');
        setShowForm(false);
        setFormData({ rating: 5, comment: '', videoUrl: '' });
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to submit review');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Customer Reviews ({reviews.length})</h3>
        {!showForm && (
          <Button variant="accent" size="small" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <Card className={styles.reviewForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Rating</label>
              <select 
                value={formData.rating} 
                onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                className={styles.select}
              >
                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Comment</label>
              <textarea 
                required
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                placeholder="Share your experience..."
                className={styles.textarea}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Video URL (YouTube/TikTok/Loom)</label>
              <input 
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                placeholder="https://..."
                className={styles.input}
              />
            </div>
            <div className={styles.formActions}>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className={styles.reviewsList}>
        {reviews.length === 0 ? (
          <p className={styles.noReviews}>No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewUser}>
                <div className={styles.avatar} style={{ backgroundImage: review.user.image ? `url(${review.user.image})` : 'none' }}>
                  {!review.user.image && review.user.name.charAt(0)}
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{review.user.name}</span>
                  <span className={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={styles.stars}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p className={styles.comment}>{review.comment}</p>
              {review.videoUrl && (
                <div className={styles.videoBadge}>
                  <span className={styles.videoIcon}>🎥</span> Video Review Available
                  <a href={review.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>View Video</a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
