import React from 'react';
import { theme } from '../../theme/token';

const Button = ({ variant = 'primary', children, className = '', ...props }) => {
  const btnStyle = theme.elements.button[variant] || theme.elements.button.primary;

  return (
    <button className={`${btnStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;