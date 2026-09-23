const escapeCsvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

const toCsv = (rows) => rows
  .map((row) => row.map(escapeCsvCell).join(','))
  .join('\n');

export const buildFinancialReportCsv = (records = [], metrics = {}) => {
  const safeRecords = Array.isArray(records) ? records : [];
  const summaryRows = [
    ['Financial Summary', 'Value'],
    ['Total Sales', metrics.totalSales || 0],
    ['Paid Sales', metrics.paidSales || 0],
    ['Total Purchases', metrics.totalPurchases || 0],
    ['Paid Purchases', metrics.paidPurchases || 0],
    ['Gross Profit', metrics.grossProfit || 0],
    ['Accounts Receivable', metrics.totalReceivables || 0],
    ['Accounts Payable', metrics.totalPayables || 0],
    [],
    ['Transaction Records'],
    ['Type', 'Invoice No', 'Date', 'Party Name', 'Subtotal', 'Tax', 'Total Amount', 'Payment Status', 'Payment Mode'],
  ];

  const transactionRows = safeRecords.length > 0
    ? safeRecords.map((row) => [
      row.type,
      row.invoiceNo,
      row.date,
      row.partyName,
      row.subtotal,
      row.taxAmount,
      row.totalAmount,
      row.paymentStatus,
      row.paymentMode,
    ])
    : [['No transaction records available']];

  return toCsv([...summaryRows, ...transactionRows]);
};

export const downloadFinancialReport = (records, metrics) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('Report downloads are only available in a browser.');
  }

  const csv = buildFinancialReportCsv(records, metrics);
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `erp-financial-report-${date}.csv`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 100);

  return { recordCount: Array.isArray(records) ? records.length : 0 };
};
