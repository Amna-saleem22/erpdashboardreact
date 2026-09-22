import React from 'react';
import { theme } from '../../theme/token';

const Input = ({ label, error, isMono = false, className = '', ...props }) => {
  const inputStyle = isMono ? theme.elements.form.inputMono : theme.elements.form.input;

  return (
    <div className="w-full">
      {label && <label className={theme.elements.form.label}>{label}</label>}
      <input className={`${inputStyle} ${className}`} {...props} />
      {error && <p className={theme.elements.p.error}>{error}</p>}
    </div>
  );
};

export default Input;