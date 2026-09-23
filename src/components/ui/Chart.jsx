// src/components/ui/ChartCard.jsx
import { theme } from '../../theme/token';
import Heading from './Heading';

const ChartCard = ({ title, subtitle, children, className = '', actionButton = null }) => {
  return (
    <div className={`${theme.elements.div.card} ${className}`}>
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-stone-200/80 pb-4 sm:flex-row sm:items-center dark:border-slate-800">
        <div>
          <Heading level="h3">{title}</Heading>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {actionButton && <div>{actionButton}</div>}
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;