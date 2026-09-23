// Create/Edit Purchase & Sale Form


// src/components/erp/InvoiceModalForm.jsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button, Input, Select } from '../ui/Index';
import { theme } from '../../theme/token';

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
    <div className={theme.elements.modal.overlay}>
      <div className={theme.elements.modal.panel}>
        {/* Modal Header */}
        <div className={theme.elements.modal.header}>
          <h2 className="font-heading text-base font-semibold text-slate-950 dark:text-slate-100">Create New Invoice</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close invoice form"
            className={theme.elements.button.icon}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Invoice Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
                <option value="SALE">Sale</option>
                <option value="PURCHASE">Purchase</option>
            </Select>
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <Input
            label="Party / Client Name"
            type="text"
            placeholder="e.g. Acme Corp / John Doe"
            value={formData.partyName}
            onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Subtotal (Rs.)"
              type="number"
              placeholder="0.00"
              value={formData.subtotal}
              onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
              required
            />
            <Select
              label="Payment Status"
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
            >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 border-t border-stone-200 pt-4 dark:border-slate-800">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Invoice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModalForm;