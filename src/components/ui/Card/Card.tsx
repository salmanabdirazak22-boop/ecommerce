import React, { HTMLAttributes } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  hoverEffect = false,
  className,
  ...props
}) => {
  const classes = [
    styles.card,
    styles[`pad-${padding}`],
    hoverEffect ? styles.hoverEffect : '',
    className || ''
  ].join(' ').trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
