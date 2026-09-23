import { theme } from '../../theme/token';

const Select = ({ label, options = [], children, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className={theme.elements.form.label}>{label}</label>}
      <select className={`${theme.elements.form.select} ${className}`} {...props}>
        {children || options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;