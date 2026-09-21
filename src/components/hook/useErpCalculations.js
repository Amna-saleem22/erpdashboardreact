//// Profit, Total, Tax calculations hook
// src/hooks/useErpCalculations.js
import { useMemo } from 'react';

export const useErpCalculations = (data = []) => {
  return useMemo(() => {
    let totalSales = 0;
    let totalPurchases = 0;
    let totalReceivables = 0;
    let totalPayables = 0;
    let paidSales = 0;
    let paidPurchases = 0;

    data.forEach((row) => {
      const total = Number(row.totalAmount) || 0;
      const due = Number(row.dueAmount) || 0;
      const paid = Number(row.paidAmount) || 0;

      if (row.type === 'SALE') {
        totalSales += total;
        totalReceivables += due;
        paidSales += paid;
      } else if (row.type === 'PURCHASE') {
        totalPurchases += total;
        totalPayables += due;
        paidPurchases += paid;
      }
    });

    const grossProfit = totalSales - totalPurchases;

    return {
      totalSales,
      totalPurchases,
      grossProfit,
      totalReceivables,
      totalPayables,
      paidSales,
      paidPurchases,
      totalCount: data.length
    };
  }, [data]);
};