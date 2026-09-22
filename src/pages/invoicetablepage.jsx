// src/pages/InvoicesPage.jsx
import React, { useState } from 'react';
import InvoiceTable from '../components/erp/InvoiceTable';
import InvoiceModalForm from '../components/erp/InvoiceFormModal';
import InvoicePrint from '../components/erp/InvoicePrint';
import { Heading, Text, Button, Card } from '../components/ui/Index';

const InvoicesPage = () => {
  // Modal states for New Invoice and Print View
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  const handleAddInvoice = (newInvoice) => {
    console.log("New Invoice Added:", newInvoice);
    setIsFormOpen(false);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen font-sans space-y-6">
      
      {/* Header & Main Primary Action Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Heading level="h1">Invoice Management</Heading>
          <Text variant="sm" className="text-slate-500 mt-1">
            View, search, filter, and manage Purchase and Sale book registers.
          </Text>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            onClick={() => setIsFormOpen(true)}
          >
            + Create Invoice
          </Button>
        </div>
      </div>

      {/* Main Table Card Wrapper */}
      <Card className="bg-white border-slate-200/80 p-5 shadow-xs">
        <InvoiceTable 
          onPrintInvoice={(invoice) => setSelectedInvoiceForPrint(invoice)} 
        />
      </Card>

      {/* Invoice Form Modal */}
      {isFormOpen && (
        <InvoiceModalForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddInvoice={handleAddInvoice}
        />
      )}

      {/* Print Preview Modal */}
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