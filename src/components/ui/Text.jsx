import React from 'react';
import { theme } from '../../theme/token';

const Text = ({ variant = 'body', color = 'secondary', children, className = '' }) => {
  // Direct elements preset se base class le raha hai
  const baseClass = theme.elements.p[variant] || theme.elements.p.body;
  const colorClass = theme.colors.text[color] ? theme.colors.text[color] : '';

  return <p className={`${baseClass} ${colorClass} ${className}`}>{children}</p>;
};

export default Text;