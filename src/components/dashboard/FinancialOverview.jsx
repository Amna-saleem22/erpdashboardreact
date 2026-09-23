import { ArrowDownLeft, ArrowUpRight, CalendarRange, CircleDollarSign, CreditCard, Wallet } from 'lucide-react';
import { Badge, Card, Heading, Text } from '../ui/Index';

const formatCurrency = (value) => `Rs. ${(value || 0).toLocaleString()}`;

const OverviewRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between border-b border-stone-100 py-2.5 last:border-0 dark:border-slate-800">
    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
    <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">{value}</span>
  </div>
);

const FinancialOverview = ({ monthlyInsight, paymentSummary, cashFlow }) => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <Card className="p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <Heading level="h4">Cash Flow Overview</Heading>
          <Text variant="xs" className="mt-1">Money received versus money paid</Text>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Wallet className="h-4 w-4" />
        </div>
      </div>
      <OverviewRow label="Cash received" value={formatCurrency(cashFlow.received)} icon={ArrowDownLeft} />
      <OverviewRow label="Cash paid" value={formatCurrency(cashFlow.paid)} icon={ArrowUpRight} />
      <div className="mt-2 flex items-center justify-between border-t border-stone-200 pt-3 dark:border-slate-700">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Net cash flow</span>
        <span className="font-mono text-sm font-semibold text-slate-950 dark:text-slate-100">{formatCurrency(cashFlow.net)}</span>
      </div>
    </Card>

    <Card className="p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <Heading level="h4">Payment Status</Heading>
          <Text variant="xs" className="mt-1">Invoice settlement overview</Text>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <CreditCard className="h-4 w-4" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {paymentSummary.items.map((item) => (
          <div key={item.label} className="rounded-lg border border-stone-200 p-2 text-center dark:border-slate-700">
            <Badge variant={item.variant}>{item.label}</Badge>
            <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.count}</div>
            <div className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">invoices</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">Outstanding balance</span>
        <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(paymentSummary.outstanding)}</span>
      </div>
    </Card>

    <Card className="p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <Heading level="h4">Monthly Insight</Heading>
          <Text variant="xs" className="mt-1">Latest trading period performance</Text>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <CalendarRange className="h-4 w-4" />
        </div>
      </div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{monthlyInsight.month}</span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">Profit margin {monthlyInsight.margin}%</span>
      </div>
      <OverviewRow label="Revenue" value={formatCurrency(monthlyInsight.revenue)} icon={CircleDollarSign} />
      <OverviewRow label="Expenses" value={formatCurrency(monthlyInsight.expenses)} icon={ArrowUpRight} />
      <div className="mt-2 flex items-center justify-between border-t border-stone-200 pt-3 dark:border-slate-700">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Net profit</span>
        <span className="font-mono text-sm font-semibold text-slate-950 dark:text-slate-100">{formatCurrency(monthlyInsight.profit)}</span>
      </div>
    </Card>
  </div>
);

export default FinancialOverview;
