import React from 'react';
import { theme } from '../../theme/token';

const Select = ({ label, options = [], className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className={theme.elements.form.label}>{label}</label>}
      <select className={`${theme.elements.form.select} ${className}`} {...props}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt} className="bg-slate-900 text-slate-100">
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;