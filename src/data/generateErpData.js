// src/data/generateErpData.js

const getRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const vendors = ['TechSource Solutions', 'Global Electronics', 'A1 Wholesalers', 'Apex Traders', 'Prime Logistics', 'Metro Components'];
const customers = ['Horizon Systems', 'Alpha Retail', 'Bright Vision Co.', 'Zentec Enterprises', 'Starlight Tech', 'Urban Mart'];

const productCatalog = [
  { name: 'Core i7 Processor 13th Gen', unitPrice: 320 },
  { name: '16GB DDR5 RAM Module', unitPrice: 65 },
  { name: '1TB NVMe M.2 SSD', unitPrice: 85 },
  { name: '27-inch 4K Monitor', unitPrice: 280 },
  { name: 'Mechanical RGB Keyboard', unitPrice: 45 },
  { name: 'Ergonomic Wireless Mouse', unitPrice: 25 },
  { name: 'Motherboard Z790 Chipset', unitPrice: 210 },
  { name: '750W Gold Power Supply', unitPrice: 110 }
];

const paymentStatuses = ['Paid', 'Unpaid', 'Partial'];
const paymentModes = ['Bank Transfer', 'Cash', 'Credit Card', 'Cheque'];

export const generateErpBookData = (totalRows = 400) => {
  const records = [];
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-09-20');

  for (let i = 1; i <= totalRows; i++) {
    const isPurchase = i % 2 === 0;
    const type = isPurchase ? 'PURCHASE' : 'SALE';
    const invoicePrefix = isPurchase ? 'PUR-2026-' : 'SL-2026-';
    const invoiceNo = `${invoicePrefix}${1000 + i}`;
    
    const partyName = isPurchase 
      ? vendors[Math.floor(Math.random() * vendors.length)]
      : customers[Math.floor(Math.random() * customers.length)];

    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let subtotal = 0;

    for (let j = 0; j < itemCount; j++) {
      const prod = productCatalog[Math.floor(Math.random() * productCatalog.length)];
      const qty = Math.floor(Math.random() * 10) + 1;
      const rate = isPurchase ? prod.unitPrice : Math.round(prod.unitPrice * 1.25);
      const lineTotal = qty * rate;

      subtotal += lineTotal;
      items.push({
        itemId: `ITEM-${j + 1}`,
        itemName: prod.name,
        qty: qty,
        rate: rate,
        amount: lineTotal
      });
    }

    const discount = Math.round(subtotal * (Math.random() > 0.5 ? 0.05 : 0));
    const taxableAmount = subtotal - discount;
    const taxRate = 18;
    const taxAmount = Math.round(taxableAmount * (taxRate / 100));
    const totalAmount = taxableAmount + taxAmount;

    const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
    let paidAmount = 0;
    if (paymentStatus === 'Paid') {
      paidAmount = totalAmount;
    } else if (paymentStatus === 'Partial') {
      paidAmount = Math.round(totalAmount * 0.4);
    } else {
      paidAmount = 0;
    }
    const dueAmount = totalAmount - paidAmount;

    records.push({
      id: `ERP-REC-${i.toString().padStart(4, '0')}`,
      type: type,
      invoiceNo: invoiceNo,
      date: getRandomDate(startDate, endDate),
      partyName: partyName,
      items: items,
      itemCount: items.length,
      subtotal: subtotal,
      discount: discount,
      taxableAmount: taxableAmount,
      taxRate: taxRate,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      paidAmount: paidAmount,
      dueAmount: dueAmount,
      paymentStatus: paymentStatus,
      paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
      notes: `${type.toLowerCase()} invoice generated automatically.`
    });
  }

  return records;
};

// 🔴 THIS WAS MISSING PREVIOUSLY:
export const mockData = generateErpBookData(400);