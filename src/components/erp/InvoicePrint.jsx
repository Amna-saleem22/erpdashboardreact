// print 

// src/components/erp/InvoicePrint.jsx
import { Printer, X } from 'lucide-react';
import { Badge, Button } from '../ui/Index';
import { theme } from '../../theme/token';

const InvoicePrint = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`${theme.elements.modal.overlay} items-start`}>
      {/* Container */}
      <div className="relative w-full max-w-2xl rounded-xl border border-stone-200 bg-white p-6 text-slate-900 shadow-xl print:w-full print:border-0 print:p-0 print:shadow-none md:p-8">
        {/* Non-Printable Header Toolbar */}
        <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-4 print:hidden">
          <h2 className="font-heading text-base font-semibold text-slate-900">Invoice Preview</h2>
          <div className="flex gap-2">
            <Button variant="primary" onClick={handlePrint}>
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </Button>
            <Button variant="secondary" onClick={onClose} aria-label="Close invoice preview">
              <X className="h-3.5 w-3.5" />
              Close
            </Button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-invoice" className="font-sans">
          {/* Invoice Header */}
          <div className="flex items-start justify-between border-b border-stone-200 pb-6">
            <div>
              <h1 className="font-heading text-xl font-semibold tracking-tight text-slate-950">ERP ENTERPRISE</h1>
              <p className="mt-1 text-xs text-slate-500">Commercial Billing & ERP Solution</p>
            </div>
            <div className="text-right">
              <Badge variant="warning" className="mb-2">
                {invoice.type} INVOICE
              </Badge>
              <p className="text-sm font-semibold text-slate-800">#{invoice.invoiceNo}</p>
              <p className="text-xs text-slate-500">Date: {invoice.date}</p>
            </div>
          </div>

          {/* Bill To Info */}
          <div className="my-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Billed To:</p>
            <h3 className="text-base font-semibold text-slate-800">{invoice.partyName}</h3>
            <p className="text-xs text-slate-500">Payment Status: <strong className="text-slate-800">{invoice.paymentStatus}</strong></p>
          </div>

          {/* Invoice Table */}
          <table className="my-6 w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-t border-stone-200 bg-stone-50">
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3 text-right">Subtotal</th>
                <th className="py-2 px-3 text-right">Tax (18%)</th>
                <th className="py-2 px-3 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-100">
                <td className="py-3 px-3 font-medium">Standard ERP Transaction ({invoice.type})</td>
                <td className="px-3 py-3 text-right">Rs. {invoice.subtotal.toLocaleString()}</td>
                <td className="px-3 py-3 text-right">Rs. {invoice.taxAmount.toLocaleString()}</td>
                <td className="px-3 py-3 text-right font-semibold">Rs. {invoice.totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Total Calculation Summary */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>Rs. {invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (18%):</span>
                <span>Rs. {invoice.taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 text-sm font-semibold text-slate-900">
                <span>Total Amount:</span>
                <span>Rs. {invoice.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-stone-200 pt-6 text-center text-xs text-slate-400">
            <p>Thank you for your business!</p>
            <p className="text-[10px] mt-1">This is a system generated document.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrint;