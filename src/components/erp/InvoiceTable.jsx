// src/components/erp/InvoiceTable.jsx
import { useState } from 'react';
import { Printer, RotateCcw, Search } from 'lucide-react';
import { mockData } from '../../data/generateErpData';
import { useTableFilter } from '../hook/useTableFilter';
import InvoiceModalForm from './InvoiceFormModal';
import InvoicePrint from './InvoicePrint';

import {
  Heading, Text, Button, Card, Table, Th, Td, Tr, Badge, Input, Select
} from '../ui/Index';

const InvoiceTable = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const {
    filteredData, searchTerm, setSearchTerm, activeTab, setActiveTab,
    startDate, setStartDate, endDate, setEndDate, statusFilter, setStatusFilter, resetFilters
  } = useTableFilter(mockData);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleAddInvoice = (newInvoice) => {
    console.log("New Invoice Created:", newInvoice);
    setIsFormOpen(false);
  };

  return (
    <Card className="space-y-5 p-5 md:p-6">
      {/* HEADER & TABS */}
      <div className="flex flex-col gap-4 border-b border-stone-100 pb-1 md:flex-row md:items-center md:justify-between dark:border-slate-800">
        <div>
          <Heading level="h3">Transaction Records</Heading>
          <Text variant="sm" className="text-slate-500 dark:text-slate-400 mt-0.5">
            Audit trail for Purchase and Sale register transactions.
          </Text>
        </div>

        <div className="flex self-start gap-1 rounded-lg border border-stone-200 bg-stone-100/80 p-1 dark:border-slate-700 dark:bg-slate-800 md:self-auto">
          {['ALL', 'PURCHASE', 'SALE'].map((tab) => (
          <Button
              key={tab}
              variant={activeTab === tab ? 'primary' : 'secondary'}
              className="px-3 py-2 text-[11px]"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab === 'ALL' ? 'All Books' : tab === 'PURCHASE' ? 'Purchase Book' : 'Sale Book'}
            </Button>
          ))}
        </div>
      </div>

      {/* FILTER BAR SECTION */}
      <div className="grid grid-cols-1 items-end gap-3 rounded-lg border border-stone-200/80 bg-stone-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">Search records</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              type="text"
              placeholder="Invoice code or party name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <Select
            label="Payment status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </Select>
        </div>

        <div className="lg:col-span-2">
          <Input
            label="From Date"
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="lg:col-span-2">
          <Input
            label="To Date"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="lg:col-span-2 flex gap-2">
            <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              resetFilters();
              setCurrentPage(1);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset filters
          </Button>
        </div>
      </div>

      {/* DATA TABLE */}
      <Table>
        <thead>
          <Tr header>
            <Th>Type</Th>
            <Th>Invoice Code</Th>
            <Th>Date</Th>
            <Th>Party Name</Th>
            <Th align="right">Subtotal</Th>
            <Th align="right">Tax</Th>
            <Th align="right">Total Amount</Th>
            <Th align="center">Status</Th>
            <Th align="center">Action</Th>
          </Tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row) => (
              <Tr key={row.id}>
                <Td>
                  <Badge variant={row.type === 'PURCHASE' ? 'info' : 'success'}>
                    {row.type}
                  </Badge>
                </Td>
                <Td isMono className="font-semibold text-slate-900 dark:text-slate-100">
                  {row.invoiceNo}
                </Td>
                <Td isMono={false}>{formatDate(row.date)}</Td>
                <Td isMono={false} className="font-medium text-slate-800 dark:text-slate-200">
                  {row.partyName}
                </Td>
                <Td align="right">Rs. {row.subtotal.toLocaleString()}</Td>
                <Td align="right">Rs. {row.taxAmount.toLocaleString()}</Td>
                <Td align="right" className="font-bold text-slate-900 dark:text-slate-100">
                  Rs. {row.totalAmount.toLocaleString()}
                </Td>
                <Td align="center">
                  {(() => {
                    const paymentStatus = String(row.paymentStatus || 'Unknown');
                    const statusVariant = paymentStatus === 'Paid'
                      ? 'success'
                      : paymentStatus === 'Partial'
                        ? 'warning'
                        : paymentStatus === 'Unpaid'
                          ? 'danger'
                          : 'neutral';

                    return (
                      <Badge variant={statusVariant} className="min-w-[68px] justify-center">
                        {paymentStatus}
                      </Badge>
                    );
                  })()}
                </Td>
                <Td align="center">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedInvoiceForPrint(row)}
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span className="sr-only">Print invoice</span>
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="9" align="center" className="py-8 text-slate-400">
                No matching financial records found.
              </Td>
            </Tr>
          )}
        </tbody>
      </Table>

      {/* PAGINATION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div>
          Showing {filteredData.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} records
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="rounded-lg bg-stone-100 px-3 py-1 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
            {currentPage} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>

      {isFormOpen && (
        <InvoiceModalForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddInvoice={handleAddInvoice}
        />
      )}

      {selectedInvoiceForPrint && (
        <InvoicePrint
          invoice={selectedInvoiceForPrint}
          onClose={() => setSelectedInvoiceForPrint(null)}
        />
      )}
    </Card>
  );
};

export default InvoiceTable;