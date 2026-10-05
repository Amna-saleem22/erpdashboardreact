import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  FileText
} from 'lucide-react';

export default function CustomerSupplierAnalysis({ rawData, currency }) {
  const [activeTab, setActiveTab] = useState('customers'); // 'customers' | 'suppliers'
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('ALL');
  
  // 📄 Pagination State - Exactly 5 Items Per Page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatAmount = (val) => `${currency.symbol}${Number(val || 0).toLocaleString(currency.locale)}`;

  // 🔍 Dynamic Column Keys Detection
  const columnKeys = useMemo(() => {
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return {
        partyKey: 'Party_Name',
        idKey: 'Invoice_ID',
        amountKey: 'Total_Amount',
        paidKey: 'Paid_Amount',
        typeKey: 'Type',
        dateKey: 'Date'
      };
    }

    const firstRow = rawData[0] || {};
    const keys = Object.keys(firstRow);

    const findKey = (keywords) => {
      return keys.find((key) => 
        keywords.some((kw) => key.toLowerCase().replace(/[^a-z0-9]/g, '').includes(kw))
      ) || keys[0];
    };

    return {
      partyKey: findKey(['party', 'customer', 'supplier', 'client', 'vendor', 'name', 'account']),
      idKey: findKey(['id', 'code', 'inv', 'num', 'ref']),
      amountKey: findKey(['totalamount', 'amount', 'total', 'val', 'price']) || keys[0],
      paidKey: findKey(['paidamount', 'paid', 'received', 'payment']),
      typeKey: findKey(['type', 'category', 'kind']),
      dateKey: findKey(['date', 'due', 'time', 'day'])
    };
  }, [rawData]);

  // Aggregation & Row Processing
  const processedEntities = useMemo(() => {
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) return [];

    const { partyKey, idKey, amountKey, paidKey, typeKey, dateKey } = columnKeys;
    const map = {};

    rawData.forEach((row, index) => {
      const partyName = String(row[partyKey] || `Entity ${index + 1}`).trim();
      const entityId = row[idKey] ? String(row[idKey]) : `ID-${partyName.replace(/\s+/g, '').toUpperCase()}`;
      
      const rawAmt = row[amountKey];
      const amount = typeof rawAmt === 'number' ? rawAmt : parseFloat(String(rawAmt || '0').replace(/[^0-9.-]+/g, '')) || 0;
      
      const rawPaid = paidKey ? row[paidKey] : null;
      const paid = rawPaid !== null && rawPaid !== undefined 
        ? (typeof rawPaid === 'number' ? rawPaid : parseFloat(String(rawPaid || '0').replace(/[^0-9.-]+/g, '')) || 0)
        : amount;

      const typeVal = String(row[typeKey] || '').toUpperCase();
      const isExpense = typeVal.includes('PURCHASE') || typeVal.includes('EXPENSE') || typeVal.includes('BILL') || amount < 0;

      if (activeTab === 'customers' && isExpense) return;
      if (activeTab === 'suppliers' && !isExpense) return;

      if (!map[partyName]) {
        map[partyName] = {
          id: entityId,
          name: partyName,
          totalVolume: 0,
          totalPaid: 0,
          outstanding: 0,
          transactionCount: 0,
          overdueDays: 0,
          rawRowData: row
        };
      }

      const absAmt = Math.abs(amount);
      const absPaid = Math.abs(paid);
      const remaining = absAmt - absPaid;

      map[partyName].totalVolume += absAmt;
      map[partyName].totalPaid += absPaid;
      map[partyName].outstanding += remaining > 0 ? remaining : 0;
      map[partyName].transactionCount += 1;

      // Overdue Days Dynamic Calculation
      if (remaining > 0 && row[dateKey]) {
        const txDate = new Date(row[dateKey]);
        if (!isNaN(txDate.getTime())) {
          const diffDays = Math.floor((new Date() - txDate) / (1000 * 60 * 60 * 24));
          if (diffDays > map[partyName].overdueDays) {
            map[partyName].overdueDays = diffDays;
          }
        }
      }
    });

    const list = Object.values(map).sort((a, b) => b.totalVolume - a.totalVolume);
    const totalCount = list.length;

    return list.map((item, index) => {
      let tier = 'MID';
      if (index < Math.ceil(totalCount * 0.2) || index === 0) tier = 'TOP';
      else if (index >= Math.floor(totalCount * 0.7)) tier = 'LOW';

      const requiresAction = item.overdueDays > 15 || (item.outstanding > 0 && (item.outstanding / (item.totalVolume || 1)) > 0.4);

      return { ...item, tier, requiresAction };
    });
  }, [rawData, activeTab, columnKeys]);

  // 🎯 Dynamic Action Status Evaluation Function
  const getDynamicActionStatus = (item, type) => {
    const { outstanding, totalVolume, overdueDays } = item;

    // Condition 1: Entirely Settled
    if (outstanding <= 0.01) {
      return {
        label: 'Account Clear',
        badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        icon: <CheckCircle2 className="w-3 h-3" />,
        actionText: type === 'customers' ? 'Eligible for Credit Upgrade' : 'Tier-1 Vendor'
      };
    }

    const unpaidRatio = outstanding / (totalVolume || 1);

    if (type === 'customers') {
      // Condition 2: High Risk / Legal
      if (overdueDays > 60 || unpaidRatio > 0.75) {
        return {
          label: 'Block Credit & Legal Notice',
          badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          icon: <ShieldAlert className="w-3 h-3 text-rose-400" />,
          actionText: 'Stop Deliveries Immediately'
        };
      }
      // Condition 3: Urgent Call Needed
      if (overdueDays > 30 || unpaidRatio > 0.4) {
        return {
          label: 'Urgent Call Needed',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          icon: <PhoneCall className="w-3 h-3 text-amber-400" />,
          actionText: 'Follow up for Direct Deposit'
        };
      }
      // Condition 4: Soft Reminder
      if (overdueDays > 0) {
        return {
          label: 'Send Email Reminder',
          badgeClass: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          icon: <Clock className="w-3 h-3 text-yellow-400" />,
          actionText: 'Send Ledger Copy'
        };
      }
      // Condition 5: Normal Term Pending
      return {
        label: 'Standard Terms Pending',
        badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        icon: <FileText className="w-3 h-3 text-sky-400" />,
        actionText: 'Due on Contract Date'
      };
    } else {
      // Suppliers / Vendors
      if (overdueDays > 40 || unpaidRatio > 0.6) {
        return {
          label: 'Payment Schedule Priority',
          badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          icon: <AlertTriangle className="w-3 h-3 text-rose-400" />,
          actionText: 'Partial Settlement Needed'
        };
      }
      if (overdueDays > 10) {
        return {
          label: 'Queue in Cashflow',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          icon: <Clock className="w-3 h-3 text-amber-400" />,
          actionText: 'Schedule in Weekly Batch'
        };
      }
      return {
        label: 'Regular Payable',
        badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        icon: <Zap className="w-3 h-3 text-sky-400" />,
        actionText: 'Pay On Agreed Invoice Terms'
      };
    }
  };

  // Immediate Action Items
  const immediateActionList = useMemo(() => {
    return processedEntities
      .filter((item) => item.outstanding > 0 && item.requiresAction)
      .sort((a, b) => b.outstanding - a.outstanding);
  }, [processedEntities]);

  // Filtered List
  const filteredList = useMemo(() => {
    return processedEntities.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.id.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (segmentFilter === 'TOP') return item.tier === 'TOP';
      if (segmentFilter === 'MID') return item.tier === 'MID';
      if (segmentFilter === 'LOW') return item.tier === 'LOW';
      if (segmentFilter === 'OVERDUE') return item.outstanding > 0 && item.overdueDays > 0;
      if (segmentFilter === 'ACTION_REQUIRED') return item.requiresAction;

      return true;
    });
  }, [processedEntities, searchTerm, segmentFilter]);

  // 📑 Pagination: Exactly 5 Items Per Page
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  
  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredList, currentPage]);

  const handleFilterChange = (filterId) => {
    setSegmentFilter(filterId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* Header & Category Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" /> Customer & Supplier Ledger Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic Header Mapping: ({columnKeys.partyKey}, {columnKeys.amountKey})
          </p>
        </div>

        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => { setActiveTab('customers'); setSegmentFilter('ALL'); setCurrentPage(1); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'customers' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            👥 Customers (Receivables)
          </button>
          <button
            onClick={() => { setActiveTab('suppliers'); setSegmentFilter('ALL'); setCurrentPage(1); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'suppliers' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🏢 Suppliers (Payables)
          </button>
        </div>
      </div>

      {/* ⚡ PRIORITY ACTION CARDS */}
      {immediateActionList.length > 0 && (
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <h3 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                ⚡ Priority Attention Items ({activeTab === 'customers' ? 'Collections' : 'Payables'})
              </h3>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
              {immediateActionList.length} Accounts Pending Action
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {immediateActionList.slice(0, 3).map((item) => {
              const statusInfo = getDynamicActionStatus(item, activeTab);
              return (
                <div 
                  key={item.name} 
                  className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-xl flex flex-col justify-between space-y-2 hover:border-amber-400/50 transition-all"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-xs font-bold text-white truncate max-w-[140px]">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{columnKeys.idKey}: {item.id}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${statusInfo.badgeClass}`}>
                      {statusInfo.icon} {statusInfo.label}
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-1">
                    <div>
                      <p className="text-[10px] text-slate-400">Outstanding Balance</p>
                      <p className="text-sm font-bold text-amber-400">{formatAmount(item.outstanding)}</p>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSearchTerm(item.name);
                        setSegmentFilter('ALL');
                        setCurrentPage(1);
                      }}
                      className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 🔎 SEARCH & TIER FILTERS */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between pt-2">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={`Search by Name or ID...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'ALL', label: 'ALL' },
            { id: 'TOP', label: '⭐ TOP 20%' },
            { id: 'MID', label: '🔷 MID 50%' },
            { id: 'LOW', label: '🔸 LOW 30%' },
            { id: 'OVERDUE', label: '🔴 OVERDUE' },
            { id: 'ACTION_REQUIRED', label: '⚡ ACTION REQD' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                segmentFilter === filter.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 📊 DATA TABLE (Strictly 5 Rows Per Page) */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/70 border-b border-slate-800 text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              <th className="py-3 px-4">{columnKeys.partyKey} ({activeTab === 'customers' ? 'Customer' : 'Supplier'})</th>
              <th className="py-3 px-4">Segment Tier</th>
              <th className="py-3 px-4 text-right">Volume</th>
              <th className="py-3 px-4 text-right">Settled</th>
              <th className="py-3 px-4 text-right">Outstanding</th>
              <th className="py-3 px-4 text-center">Dynamic Action Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs">
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-500">
                  No {activeTab} match the search query or filter selection.
                </td>
              </tr>
            ) : (
              paginatedList.map((item) => {
                const actionStatus = getDynamicActionStatus(item, activeTab);

                return (
                  <tr key={item.name} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Name & ID */}
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div className="text-slate-100 font-semibold">{item.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {columnKeys.idKey}: {item.id} | {item.transactionCount} Trans.
                      </div>
                    </td>

                    {/* Tier Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                        item.tier === 'TOP'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.tier === 'MID'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : 'bg-slate-700/40 text-slate-400 border border-slate-600/30'
                      }`}>
                        {item.tier}
                      </span>
                    </td>

                    {/* Total Volume */}
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-200">
                      {formatAmount(item.totalVolume)}
                    </td>

                    {/* Settled */}
                    <td className="py-3.5 px-4 text-right text-emerald-400 font-medium">
                      {formatAmount(item.totalPaid)}
                    </td>

                    {/* Outstanding Balance */}
                    <td className={`py-3.5 px-4 text-right font-bold ${
                      item.outstanding > 0 ? 'text-amber-400' : 'text-slate-400'
                    }`}>
                      {formatAmount(item.outstanding)}
                      {item.overdueDays > 0 && (
                        <div className="text-[10px] text-rose-400 font-normal">
                          {item.overdueDays}d overdue
                        </div>
                      )}
                    </td>

                    {/* Dynamic Action Status Indicator */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold border ${actionStatus.badgeClass}`}>
                          {actionStatus.icon} {actionStatus.label}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium">
                          {actionStatus.actionText}
                        </span>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 🔘 PAGINATION CONTROLS (Next & Previous) */}
      {filteredList.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400">
            Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold text-white">
              {Math.min(currentPage * itemsPerPage, filteredList.length)}
            </span>{' '}
            of <span className="font-semibold text-white">{filteredList.length}</span> entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPage === 1
                  ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <span className="text-xs text-slate-400 px-2 font-medium">
              Page <span className="text-white font-bold">{currentPage}</span> of{' '}
              <span className="text-white font-bold">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentPage === totalPages
                  ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}