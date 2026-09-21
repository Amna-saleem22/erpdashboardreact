// src/components/dashboard/FilterBar.jsx
import React from 'react';

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  statusFilter,
  setStatusFilter,
  resetFilters,
  onFilterChange
}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onFilterChange) onFilterChange();
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
      {/* Search Input */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">Search</label>
        <input
          type="text"
          placeholder="Invoice No / Party Name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Payment Status Dropdown */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            if (onFilterChange) onFilterChange();
          }}
          className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-amber-400"
        >
          <option value="ALL">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">From Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            if (onFilterChange) onFilterChange();
          }}
          className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">To Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            if (onFilterChange) onFilterChange();
          }}
          className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Reset Button */}
      <div className="self-end">
        <button
          type="button"
          onClick={() => {
            resetFilters();
            if (onFilterChange) onFilterChange();
          }}
          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;