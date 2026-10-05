// // src/data/generateErpData.js

// const getRandomDate = (start, end) => {
//   const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//   return date.toISOString().split('T')[0];
// };

// const vendors = ['TechSource Solutions', 'Global Electronics', 'A1 Wholesalers', 'Apex Traders', 'Prime Logistics', 'Metro Components'];
// const customers = ['Horizon Systems', 'Alpha Retail', 'Bright Vision Co.', 'Zentec Enterprises', 'Starlight Tech', 'Urban Mart'];

// const productCatalog = [
//   { name: 'Core i7 Processor 13th Gen', unitPrice: 320 },
//   { name: '16GB DDR5 RAM Module', unitPrice: 65 },
//   { name: '1TB NVMe M.2 SSD', unitPrice: 85 },
//   { name: '27-inch 4K Monitor', unitPrice: 280 },
//   { name: 'Mechanical RGB Keyboard', unitPrice: 45 },
//   { name: 'Ergonomic Wireless Mouse', unitPrice: 25 },
//   { name: 'Motherboard Z790 Chipset', unitPrice: 210 },
//   { name: '750W Gold Power Supply', unitPrice: 110 }
// ];

// const paymentStatuses = ['Paid', 'Unpaid', 'Partial'];
// const paymentModes = ['Bank Transfer', 'Cash', 'Credit Card', 'Cheque'];

// export const generateErpBookData = (totalRows = 400) => {
//   const records = [];
//   const startDate = new Date('2026-01-01');
//   const endDate = new Date('2026-09-20');

//   for (let i = 1; i <= totalRows; i++) {
//     const isPurchase = i % 2 === 0;
//     const type = isPurchase ? 'PURCHASE' : 'SALE';
//     const invoicePrefix = isPurchase ? 'PUR-2026-' : 'SL-2026-';
//     const invoiceNo = `${invoicePrefix}${1000 + i}`;
    
//     const partyName = isPurchase 
//       ? vendors[Math.floor(Math.random() * vendors.length)]
//       : customers[Math.floor(Math.random() * customers.length)];

//     const itemCount = Math.floor(Math.random() * 3) + 1;
//     const items = [];
//     let subtotal = 0;

//     for (let j = 0; j < itemCount; j++) {
//       const prod = productCatalog[Math.floor(Math.random() * productCatalog.length)];
//       const qty = Math.floor(Math.random() * 10) + 1;
//       const rate = isPurchase ? prod.unitPrice : Math.round(prod.unitPrice * 1.25);
//       const lineTotal = qty * rate;

//       subtotal += lineTotal;
//       items.push({
//         itemId: `ITEM-${j + 1}`,
//         itemName: prod.name,
//         qty: qty,
//         rate: rate,
//         amount: lineTotal
//       });
//     }

//     const discount = Math.round(subtotal * (Math.random() > 0.5 ? 0.05 : 0));
//     const taxableAmount = subtotal - discount;
//     const taxRate = 18;
//     const taxAmount = Math.round(taxableAmount * (taxRate / 100));
//     const totalAmount = taxableAmount + taxAmount;

//     const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
//     let paidAmount = 0;
//     if (paymentStatus === 'Paid') {
//       paidAmount = totalAmount;
//     } else if (paymentStatus === 'Partial') {
//       paidAmount = Math.round(totalAmount * 0.4);
//     }
//     const dueAmount = totalAmount - paidAmount;

//     records.push({
//       id: `ERP-REC-${i.toString().padStart(4, '0')}`,
//       type: type,
//       invoiceNo: invoiceNo,
//       date: getRandomDate(startDate, endDate),
//       partyName: partyName,
//       items: items,
//       itemCount: items.length,
//       subtotal: subtotal,
//       discount: discount,
//       taxableAmount: taxableAmount,
//       taxRate: taxRate,
//       taxAmount: taxAmount,
//       totalAmount: totalAmount,
//       paidAmount: paidAmount,
//       dueAmount: dueAmount,
//       paymentStatus: paymentStatus,
//       paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
//       notes: `${type.toLowerCase()} invoice generated automatically.`
//     });
//   }

//   return records;
// };

// // 🔴 THIS WAS MISSING PREVIOUSLY:
// export const mockData = generateErpBookData(400);



import fs from 'fs';
import * as XLSX from 'xlsx';

// Sample Parties (Vendors and Customers)
const customers = [
  'Apex Traders', 'Crescent Logistics', 'Al-Madina Enterprises', 
  'United Retailers', 'Indus Trading Co', 'Khyber Goods', 
  'Mehran Supplies', 'Sufi Tech Solutions', 'Zainab General Store', 'Bismillah Mart'
];

const vendors = [
  'National Distributors', 'Global Wholesale Co', 'Pak Paper Mills', 
  'Awan Packaging', 'Siddiqui Electronics', 'Standard Chemicals', 
  'Hashmi Trading Corp', 'Karachi Wholesale Depot'
];

// Random helper functions
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate 300 Rows of Purchase & Sale Data
const generate300ErpRecords = () => {
  const records = [];
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-09-30');

  for (let i = 1; i <= 300; i++) {
    // Random date between Jan 2026 and Sep 2026
    const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const dateObj = new Date(randomTimestamp);
    const dateStr = dateObj.toISOString().split('T')[0];

    // 60% Chance of SALE, 40% Chance of PURCHASE
    const type = Math.random() > 0.4 ? 'SALE' : 'PURCHASE';
    
    const partyName = type === 'SALE' ? getRandomItem(customers) : getRandomItem(vendors);
    
    // Amount range: Rs. 5,000 to Rs. 250,000
    const totalAmount = getRandomInt(50, 2500) * 100;

    // Payment Status Logic
    const statusRoll = Math.random();
    let paymentStatus = 'Paid';
    let paidAmount = totalAmount;

    if (statusRoll < 0.25) {
      // Unpaid
      paymentStatus = 'Unpaid';
      paidAmount = 0;
    } else if (statusRoll < 0.45) {
      // Partial
      paymentStatus = 'Partial';
      paidAmount = Math.round((totalAmount * getRandomInt(30, 70)) / 100);
    }

    records.push({
      'ID': `INV-2026-${String(i).padStart(4, '0')}`,
      'Date': dateStr,
      'Type': type,
      'Party Name': partyName,
      'Total Amount': totalAmount,
      'Paid Amount': paidAmount,
      'Payment Status': paymentStatus
    });
  }

  // Sort by date ascending
  return records.sort((a, b) => new Date(a.Date) - new Date(b.Date));
};

// Create Excel Workbook and save to disk
const exportToExcel = () => {
  console.log('Generating 300 Purchase and Sale transactions...');
  const data = generate300ErpRecords();

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set column widths for clean visual alignment
  worksheet['!cols'] = [
    { wch: 15 }, // ID
    { wch: 12 }, // Date
    { wch: 12 }, // Type
    { wch: 25 }, // Party Name
    { wch: 15 }, // Total Amount
    { wch: 15 }, // Paid Amount
    { wch: 15 }  // Payment Status
  ];

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchase_Sale_Book');

  // Save file
  const fileName = 'ERP_Purchase_Sale_300_Rows.xlsx';
  XLSX.writeFile(workbook, fileName);

  console.log(`Success! File generated: ${fileName}`);
};

// Run script
exportToExcel();