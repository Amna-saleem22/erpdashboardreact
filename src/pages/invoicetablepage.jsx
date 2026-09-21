// src/pages/InvoicesPage.jsx
import React, { useState } from 'react';
import InvoiceTable from '../components/erp/InvoiceTable';
import InvoiceModalForm from '../components/erp/InvoiceFormModal';
import InvoicePrint from '../components/erp/InvoicePrint';

const InvoicesPage = () => {
  // Modal states for New Invoice and Print View
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  return (
    <div className="p-6 bg-slate-900 min-h-screen font-sans">
      {/* Top Header & Primary Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-amber-400">Invoice Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            View, search, filter, and manage Purchase and Sale book registers.
          </p>
        </div>

       
      </div>

      {/* Main Invoice Table Component (Includes FilterBar and Actions) */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl">
        <InvoiceTable onPrintInvoice={(invoice) => setSelectedInvoiceForPrint(invoice)} />
      </div>

      {/* Reusable Form Modal */}
      {isFormOpen && (
        <InvoiceModalForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* Reusable Print Preview Modal */}
      {selectedInvoiceForPrint && (
        <InvoicePrint
          invoice={selectedInvoiceForPrint}
          onClose={() => setSelectedInvoiceForPrint(null)}
        />
      )}
    </div>
  );
};

export default InvoicesPage;