// src/components/dashboard/FilterBar.jsx
import { Button, Input, Select } from '../ui/Index';

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
    <div className="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-stone-200/80 bg-stone-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
      {/* Search Input */}
      <div className="min-w-[220px] flex-1">
        <Input label="Search" type="text" placeholder="Invoice No / Party Name..." value={searchTerm} onChange={handleSearchChange} />
      </div>

      {/* Payment Status Dropdown */}
      <div className="min-w-[150px]">
        <Select
          label="Status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            if (onFilterChange) onFilterChange();
          }}
        >
          <option value="ALL">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Unpaid">Unpaid</option>
        </Select>
      </div>

      {/* Start Date */}
      <div className="min-w-[150px]">
        <Input label="From Date" type="date" value={startDate} onChange={(e) => {
            setStartDate(e.target.value);
            if (onFilterChange) onFilterChange();
          }} />
      </div>

      {/* End Date */}
      <div className="min-w-[150px]">
        <Input label="To Date" type="date" value={endDate} onChange={(e) => {
            setEndDate(e.target.value);
            if (onFilterChange) onFilterChange();
          }} />
      </div>

      {/* Reset Button */}
      <div>
        <Button
          variant="secondary"
          onClick={() => {
            resetFilters();
            if (onFilterChange) onFilterChange();
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;