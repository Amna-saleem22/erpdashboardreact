// src/pages/InvoicesPage.jsx
import { useState } from 'react';
import { FilePlus2 } from 'lucide-react';
import InvoiceTable from '../components/erp/InvoiceTable';
import InvoiceModalForm from '../components/erp/InvoiceFormModal';
import InvoicePrint from '../components/erp/InvoicePrint';
import { Heading, Text, Button } from '../components/ui/Index';
import { theme } from '../theme/token';

const InvoicesPage = () => {
  // Modal states for New Invoice and Print View
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  const handleAddInvoice = (newInvoice) => {
    console.log("New Invoice Added:", newInvoice);
    setIsFormOpen(false);
  };

  return (
    <div className={theme.elements.div.pageWrapper}>
      <div className={theme.elements.div.contentWrapper}>
      
      {/* Header & Main Primary Action Button */}
      <div className="flex flex-col gap-5 border-b border-stone-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
        <div>
          <Heading level="h1">Invoice Management</Heading>
          <Text variant="sm" className="mt-1 max-w-xl text-slate-500 dark:text-slate-400">
            View, search, filter, and manage Purchase and Sale book registers.
          </Text>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={() => setIsFormOpen(true)}>
            <FilePlus2 className="h-3.5 w-3.5" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Main Table Card Wrapper */}
      <InvoiceTable onPrintInvoice={(invoice) => setSelectedInvoiceForPrint(invoice)} />

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
    </div>
  );
};

export default InvoicesPage;