// src/components/erp/InvoiceTable.jsx
import React, { useState } from 'react';
import { mockData } from '../../data/generateErpData';
import { useTableFilter } from '../hook/useTableFilter';
import InvoiceModalForm from './InvoiceFormModal';
import InvoicePrint from './InvoicePrint';

// Import Shared Design System Atomic UI Tokens
import { 
  Heading, 
  Text, 
  Button, 
  Card, 
  Table, 
  Th, 
  Td, 
  Tr, 
  Badge, 
  Input, 
  Select 
} from '../ui/Index';

const InvoiceTable = () => {
  // ==========================================
  // 1. MODAL STATES (Form & Print Views)
  // ==========================================
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  // ==========================================
  // 2. PAGINATION STATE
  // ==========================================
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // ==========================================
  // 3. FILTER HOOK INTEGRATION
  // ==========================================
  const {
    filteredData,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    statusFilter,
    setStatusFilter,
    resetFilters
  } = useTableFilter(mockData);

  // ==========================================
  // 4. PAGINATION CALCULATIONS
  // ==========================================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Handler: Form Submission
  const handleAddInvoice = (newInvoice) => {
    console.log("New Invoice Created:", newInvoice);
    setIsFormOpen(false);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen font-sans space-y-6">
      
      {/* ========================================================= */}
      /* HEADER SECTION: Title, Description & Action Buttons       */
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Heading level="h1">Invoice Management</Heading>
          <Text variant="sm" className="text-slate-500 mt-1">
            View, search, filter, and manage Purchase and Sale book registers.
          </Text>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <Button 
            variant="primary" 
            onClick={() => setIsFormOpen(true)}
          >
            + Create Invoice
          </Button>
        </div>
      </div>

      {/* ========================================================= */}
      /* MAIN CONTENT CARD: Contains Filters, Tabs, & Table        */
      {/* ========================================================= */}
      <Card className="bg-white border-slate-200/80 p-5 shadow-xs space-y-4">
        
        {/* ------------------------------------------------------- */}
        {/* INLINE FILTER BAR SECTION (Merged from FilterBar)       */}
        {/* ------------------------------------------------------- */}
        <div className="flex flex-wrap gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          
          {/* Filter 1: Search Bar */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">Search</label>
            <Input
              type="text"
              placeholder="Invoice No / Party Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Filter change par page 1 par reset karein
              }}
            />
          </div>

          {/* Filter 2: Payment Status Dropdown */}
          <div className="w-full sm:w-auto min-w-[140px]">
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="ALL">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </Select>
          </div>

          {/* Filter 3: Start Date */}
          <div className="w-full sm:w-auto">
            <label className="block text-xs font-medium text-slate-600 mb-1">From Date</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter 4: End Date */}
          <div className="w-full sm:w-auto">
            <label className="block text-xs font-medium text-slate-600 mb-1">To Date</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter 5: Reset Button */}
          <div>
            <Button
              variant="secondary"
              onClick={() => {
                resetFilters();
                setCurrentPage(1);
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* TAB NAVIGATION: All / Purchase Book / Sale Book         */}
        {/* ------------------------------------------------------- */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {['ALL', 'PURCHASE', 'SALE'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab === 'ALL' ? 'All Records' : tab === 'PURCHASE' ? 'Purchase Book' : 'Sale Book'}
            </Button>
          ))}
        </div>

        {/* ------------------------------------------------------- */}
        {/* DATA TABLE SECTION                                     */}
        {/* ------------------------------------------------------- */}
        <Table>
          <thead>
            <Tr header>
              <Th>Type</Th>
              <Th>Invoice No</Th>
              <Th>Date</Th>
              <Th>Party Name</Th>
              <Th align="right">Subtotal</Th>
              <Th align="right">Tax (18%)</Th>
              <Th align="right">Total Amount</Th>
              <Th align="center">Status</Th>
              <Th align="center">Action</Th>
            </Tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <Tr key={row.id}>
                  {/* Register Type Tag */}
                  <Td>
                    <Badge variant={row.type === 'PURCHASE' ? 'info' : 'success'}>
                      {row.type}
                    </Badge>
                  </Td>

                  {/* Invoice Code */}
                  <Td isMono className="font-medium text-slate-900">
                    {row.invoiceNo}
                  </Td>

                  {/* Date */}
                  <Td isMono={false}>{row.date}</Td>

                  {/* Party Name */}
                  <Td isMono={false} className="font-medium text-slate-800">
                    {row.partyName}
                  </Td>

                  {/* Financial Metrics */}
                  <Td align="right">${row.subtotal.toLocaleString()}</Td>
                  <Td align="right">${row.taxAmount.toLocaleString()}</Td>
                  <Td align="right" className="font-semibold text-slate-900">
                    ${row.totalAmount.toLocaleString()}
                  </Td>

                  {/* Payment Status Badge */}
                  <Td align="center">
                    <Badge 
                      variant={
                        row.paymentStatus === 'Paid' ? 'success' :
                        row.paymentStatus === 'Partial' ? 'warning' : 'danger'
                      }
                    >
                      {row.paymentStatus}
                    </Badge>
                  </Td>

                  {/* Actions */}
                  <Td align="center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInvoiceForPrint(row)}
                    >
                      Print
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              /* Empty State */
              <Tr>
                <Td colSpan="9" align="center" className="py-8 text-slate-400">
                  No records found matching the active filters.
                </Td>
              </Tr>
            )}
          </tbody>
        </Table>

        {/* ------------------------------------------------------- */}
        {/* TABLE PAGINATION FOOTER                                 */}
        {/* ------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-2">
          <div>
            Showing {filteredData.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} records
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg font-semibold">
              {currentPage} / {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* ========================================================= */}
      /* MODAL RENDERING (Invoice Form & Invoice Print View)       */
      {/* ========================================================= */}
      
      {/* Create Invoice Modal */}
      {isFormOpen && (
        <InvoiceModalForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddInvoice={handleAddInvoice}
        />
      )}

      {/* Printable Invoice Modal */}
      {selectedInvoiceForPrint && (
        <InvoicePrint
          invoice={selectedInvoiceForPrint}
          onClose={() => setSelectedInvoiceForPrint(null)}
        />
      )}
    </div>
  );
};

export default InvoiceTable;