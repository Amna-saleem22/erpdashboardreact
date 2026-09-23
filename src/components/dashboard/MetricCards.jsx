// src/components/erp/MetricCard.jsx
import { theme } from '../../theme/token';

const MetricCard = ({ title, value, subtitle, icon, badge }) => {
  const iconBgStyles = theme.colors.status.neutral.iconBg;

  return (
    <div className={`${theme.elements.div.card} flex min-h-[166px] flex-col justify-between group hover:border-amber-500/40 dark:hover:border-amber-500/40`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBgStyles} transition-colors`}>
            {icon}
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{title}</span>
            <span className="mt-0.5 block text-[10px] text-slate-400 dark:text-slate-500">{badge}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-lg font-semibold font-mono tracking-tight text-slate-900 dark:text-slate-100">
          {value}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-400">
        <span>{subtitle}</span>
        {badge && <span className={theme.elements.badge.neutral}>{badge}</span>}
      </div>
    </div>
  );
};

export default MetricCard;