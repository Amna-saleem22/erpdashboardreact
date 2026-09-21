// src/hooks/useTableFilter.js
import { useState, useMemo } from 'react';

export const useTableFilter = (initialData = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter Logic (Pure JS Data Processing)
  const filteredData = useMemo(() => {
    if (!Array.isArray(initialData)) return [];

    return initialData.filter((item) => {
      // 1. Tab / Type Match (e.g., 'PURCHASE' vs 'SALE')
      const matchesTab =
        activeTab === 'ALL' ? true : item.type === activeTab;

      // 2. Search Term Match (Invoice No ya Party Name)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        (item.invoiceNo && item.invoiceNo.toLowerCase().includes(searchLower)) ||
        (item.partyName && item.partyName.toLowerCase().includes(searchLower));

      // 3. Status Match (e.g., 'Paid', 'Partial', 'Unpaid')
      const matchesStatus =
        statusFilter === 'ALL' ? true : item.paymentStatus === statusFilter;

      // 4. Date Range Match
      const itemDate = item.date ? new Date(item.date) : null;
      const matchesStart = !startDate || (itemDate && itemDate >= new Date(startDate));
      const matchesEnd = !endDate || (itemDate && itemDate <= new Date(endDate));

      return matchesTab && matchesSearch && matchesStatus && matchesStart && matchesEnd;
    });
  }, [initialData, searchTerm, activeTab, statusFilter, startDate, endDate]);

  // Reset Filters Function
  const resetFilters = () => {
    setSearchTerm('');
    setActiveTab('ALL');
    setStartDate('');
    setEndDate('');
    setStatusFilter('ALL');
  };

  return {
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
  };
};