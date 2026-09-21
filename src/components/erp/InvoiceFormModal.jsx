// Create/Edit Purchase & Sale Form


// src/components/erp/InvoiceModalForm.jsx
import React, { useState } from 'react';

const InvoiceModalForm = ({ isOpen, onClose, onAddInvoice }) => {
  const [formData, setFormData] = useState({
    type: 'SALE',
    partyName: '',
    date: new Date().toISOString().split('T')[0],
    subtotal: '',
    paymentStatus: 'Pending',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.partyName || !formData.subtotal) return;

    const subtotal = parseFloat(formData.subtotal);
    const taxAmount = subtotal * 0.18; // 18% Tax
    const totalAmount = subtotal + taxAmount;

    const newInvoice = {
      id: Date.now(),
      invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      subtotal,
      taxAmount,
      totalAmount,
    };

    onAddInvoice(newInvoice);
    onClose();
    // Form Reset
    setFormData({
      type: 'SALE',
      partyName: '',
      date: new Date().toISOString().split('T')[0],
      subtotal: '',
      paymentStatus: 'Pending',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl p-6 text-slate-100 font-sans">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
          <h2 className="text-xl font-bold text-amber-400">Create New Invoice</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Invoice Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="SALE">Sale</option>
                <option value="PURCHASE">Purchase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Party / Client Name</label>
            <input
              type="text"
              placeholder="e.g. Acme Corp / John Doe"
              value={formData.partyName}
              onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Subtotal ($)</label>
              <input
                type="number"
                placeholder="0.00"
                value={formData.subtotal}
                onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 border-t border-slate-800 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModalForm;