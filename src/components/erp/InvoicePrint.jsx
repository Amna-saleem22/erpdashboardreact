// print 

// src/components/erp/InvoicePrint.jsx
import React from 'react';

const InvoicePrint = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Container */}
      <div className="w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl p-8 relative print:p-0 print:shadow-none print:w-full">
        {/* Non-Printable Header Toolbar */}
        <div className="flex justify-between items-center mb-6 border-b pb-4 print:hidden">
          <h2 className="text-lg font-bold text-slate-800">Invoice Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400"
            >
              🖨️ Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300"
            >
              Close
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-invoice" className="font-sans">
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b pb-6">
            <div>
              <h1 className="text-2xl font-black tracking-wide text-slate-900">ERP ENTERPRISE</h1>
              <p className="text-xs text-slate-500 mt-1">Commercial Billing & ERP Solution</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded uppercase mb-2">
                {invoice.type} INVOICE
              </span>
              <p className="text-sm font-bold text-slate-800">#{invoice.invoiceNo}</p>
              <p className="text-xs text-slate-500">Date: {invoice.date}</p>
            </div>
          </div>

          {/* Bill To Info */}
          <div className="my-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Billed To:</p>
            <h3 className="text-lg font-bold text-slate-800">{invoice.partyName}</h3>
            <p className="text-xs text-slate-500">Payment Status: <strong className="text-slate-800">{invoice.paymentStatus}</strong></p>
          </div>

          {/* Invoice Table */}
          <table className="w-full text-left text-xs my-6 border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-t border-slate-200">
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3 text-right">Subtotal</th>
                <th className="py-2 px-3 text-right">Tax (18%)</th>
                <th className="py-2 px-3 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-3 font-medium">Standard ERP Transaction ({invoice.type})</td>
                <td className="py-3 px-3 text-right">${invoice.subtotal.toLocaleString()}</td>
                <td className="py-3 px-3 text-right">${invoice.taxAmount.toLocaleString()}</td>
                <td className="py-3 px-3 text-right font-bold">${invoice.totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Total Calculation Summary */}
          <div className="flex justify-end mt-6">
            <div className="w-1/2 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>${invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (18%):</span>
                <span>${invoice.taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-sm text-slate-900">
                <span>Total Amount:</span>
                <span className="text-amber-600">${invoice.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 mt-8 text-center text-xs text-slate-400">
            <p>Thank you for your business!</p>
            <p className="text-[10px] mt-1">This is a system generated document.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrint;