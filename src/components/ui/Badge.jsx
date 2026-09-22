import React from 'react';
import { theme } from '../../theme/token';

const Badge = ({ variant = 'info', children, className = '' }) => {
  const badgeStyle = theme.elements.badge[variant] || theme.elements.badge.info;

  return (
    <span className={`${badgeStyle} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;