// src/components/ui/ChartCard.jsx
import React from 'react';
import { theme } from '../../theme/token';
import Heading from './Heading';

/**
 * Reusable Chart Container Card Component
 * 
 * Props:
 * - title: Chart Heading Title
 * - subtitle: Small description
 * - totalValue: Highlighted Total Amount (e.g. "Rs. 450,000")
 * - children: Actual Recharts / Chart JSX element
 */
const ChartCard = ({
  title,
  subtitle,
  totalValue,
  children,
  className = '',
  actionButton = null,
}) => {
  return (
    <div className={`${theme.colors.bg.card} ${theme.colors.border.subtle} border rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between ${className}`}>
      
      {/* 1. Chart Header Section */}
      <div className="flex justify-between items-start mb-4 border-b border-slate-800/80 pb-3">
        <div>
          <Heading level="h3">{title}</Heading>
          {subtitle && (
            <p className={`text-xs ${theme.colors.text.secondary} mt-0.5`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Optional Action Button or Dropdown */}
        {actionButton && <div>{actionButton}</div>}
      </div>

      {/* 2. Optional Highlighted KPI Stat inside Chart */}
      {totalValue && (
        <div className="mb-4">
          <span className={`text-[10px] uppercase font-bold tracking-wider ${theme.colors.text.muted}`}>
            Period Metric
          </span>
          <p
            className={`text-2xl font-bold ${theme.colors.text.accent} mt-0.5`}
            style={{ fontFamily: theme.fontFamily.mono }}
          >
            {totalValue}
          </p>
        </div>
      )}

      {/* 3. Reusable Chart Render Area */}
      <div className="w-full h-64 flex items-center justify-center">
        {children}
      </div>
      
    </div>
  );
};

export default ChartCard;