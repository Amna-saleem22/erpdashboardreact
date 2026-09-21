import React, { useState } from 'react';
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

const AnalyticsCharts = ({ monthlyTrendsData }) => {
  const [chartType, setChartType] = useState('area'); // 'area' or 'bar'

  return (
    <div>
      {/* Header & Controls */}
      <div>
        <h3>Financial Analytics & Revenue Trends</h3>
        <p>Monthly comparison of Revenue, Expenses, and Net Profit</p>
        
        {/* View Toggle Buttons */}
        <div>
          <button onClick={() => setChartType('area')}>
            Area View
          </button>
          <button onClick={() => setChartType('bar')}>
            Bar View
          </button>
        </div>
      </div>

      {/* Chart Render Area */}
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="Revenue" />
              <Area type="monotone" dataKey="expenses" name="Expenses" />
              <Area type="monotone" dataKey="profit" name="Net Profit" />
            </AreaChart>
          ) : (
            <BarChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" />
              <Bar dataKey="expenses" name="Expenses" />
              <Bar dataKey="profit" name="Net Profit" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;