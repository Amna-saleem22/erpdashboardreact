import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Button, ChartCard } from '../ui/Index';
import { theme } from '../../theme/token';

const AnalyticsCharts = ({ monthlyTrendsData }) => {
  const [chartType, setChartType] = useState('area'); // 'area' or 'bar'

  const chartColors = theme.colors.chart;

  return (
    <ChartCard
      title="Financial Analytics & Revenue Trends"
      subtitle="Monthly comparison of Revenue, Expenses, and Net Profit"
      actionButton={(
        <div className="flex gap-1 rounded-lg border border-stone-200 bg-stone-100/70 p-1 dark:border-slate-700 dark:bg-slate-800">
          <Button variant={chartType === 'area' ? 'primary' : 'secondary'} onClick={() => setChartType('area')}>Area View</Button>
          <Button variant={chartType === 'bar' ? 'primary' : 'secondary'} onClick={() => setChartType('bar')}>Bar View</Button>
        </div>
      )}
    >
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={{ stroke: chartColors.grid }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: chartColors.tooltip, borderColor: chartColors.grid, borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke={chartColors.revenue} fill={chartColors.revenue} fillOpacity={0.08} strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke={chartColors.expenses} fill={chartColors.expenses} fillOpacity={0.08} strokeWidth={2} />
              <Area type="monotone" dataKey="profit" name="Net Profit" stroke={chartColors.profit} fill={chartColors.profit} fillOpacity={0.08} strokeWidth={2} />
            </AreaChart>
          ) : (
            <BarChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={{ stroke: chartColors.grid }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: chartColors.tooltip, borderColor: chartColors.grid, borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="revenue" name="Revenue" fill={chartColors.revenue} radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill={chartColors.expenses} radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Net Profit" fill={chartColors.profit} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default AnalyticsCharts;