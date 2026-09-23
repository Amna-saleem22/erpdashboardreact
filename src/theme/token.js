// src/theme/token.js

export const theme = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Inter, "Plus Jakarta Sans", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },

  // Semantic Tokens adapt automatically using CSS variables or Tailwind dark mode classes
  colors: {
    bg: {
      main: 'bg-stone-50 dark:bg-slate-950 transition-colors duration-200',
      card: 'bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 transition-colors duration-200',
      hover: 'hover:bg-stone-50 dark:hover:bg-slate-800/60',
      input: 'bg-white dark:bg-slate-900 border-stone-300 dark:border-slate-700 text-slate-900 dark:text-slate-100',
      subtle: 'bg-stone-100/70 dark:bg-slate-800/60',
    },

    text: {
      primary: 'text-slate-950 dark:text-slate-100',
      secondary: 'text-slate-600 dark:text-slate-400',
      muted: 'text-slate-400 dark:text-slate-500',
      accent: 'text-amber-600 dark:text-amber-500',
    },

    chart: {
      revenue: 'var(--chart-revenue)',
      expenses: 'var(--chart-expenses)',
      profit: 'var(--chart-profit)',
      grid: 'var(--chart-grid)',
      axis: 'var(--chart-axis)',
      tooltip: 'var(--chart-tooltip)',
    },

    metric: {
      sales: 'text-teal-700 dark:text-teal-400',
      purchases: 'text-slate-700 dark:text-slate-300',
      profit: 'text-amber-700 dark:text-amber-400',
      receivable: 'text-sky-700 dark:text-sky-400',
      payable: 'text-rose-700 dark:text-rose-400',
      loss: 'text-rose-700 dark:text-rose-400',
    },

    border: {
      subtle: 'border-stone-200/80 dark:border-slate-800',
      strong: 'border-stone-300 dark:border-slate-700',
      focus: 'focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none',
    },

    status: {
      success: {
        badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50',
        iconBg: 'bg-emerald-100/60 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      },
      danger: {
        badge: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50',
        iconBg: 'bg-rose-100/60 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400',
      },
      warning: {
        badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/50',
        iconBg: 'bg-amber-100/60 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
      },
      info: {
        badge: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200/80 dark:border-sky-800/50',
        iconBg: 'bg-sky-100/60 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400',
      },
      neutral: {
        badge: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
        iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
      }
    },
  },

  elements: {
    div: {
      pageWrapper: 'min-h-screen bg-stone-50 dark:bg-slate-950 text-slate-950 dark:text-slate-100 font-sans p-4 md:p-7 xl:p-9 transition-colors duration-200',
      contentWrapper: 'mx-auto max-w-[1480px] space-y-7',
      card: 'bg-white dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-all duration-200',
      grid4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
      grid5: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4',
    },

    sidebar: {
      aside: 'relative flex min-h-screen flex-col border-r border-stone-200 bg-white font-sans text-slate-900 transition-[width] duration-300 ease-out dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100',
      collapseButton: 'absolute -right-3 top-7 z-20 flex h-6 w-6 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-amber-500 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400',
      divider: 'mx-4 h-px bg-stone-200 dark:bg-slate-800',
      sectionLabel: 'mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500',
      item: 'group relative flex w-full items-center gap-3 rounded-lg text-xs font-medium transition-colors',
      itemActive: 'bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300',
      itemIdle: 'text-slate-500 hover:bg-stone-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
      brandMark: 'flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-lg font-black text-slate-950',
      brandText: 'truncate text-[13px] font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100',
      brandSubtext: 'mt-1 truncate text-[9px] font-semibold tracking-[0.1em] text-amber-600 dark:text-amber-400',
      userArea: 'flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-stone-50 dark:hover:bg-slate-800',
    },

    h: {
      h1: 'text-xl md:text-2xl font-semibold text-slate-950 dark:text-slate-100 tracking-tight font-heading',
      h2: 'text-lg md:text-xl font-semibold text-slate-950 dark:text-slate-100 tracking-tight font-heading',
      h3: 'text-sm md:text-base font-semibold text-slate-950 dark:text-slate-100 tracking-normal font-heading',
      h4: 'text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 font-heading',
    },

    p: {
      body: 'text-[13px] leading-5',
      sm: 'text-[11px] leading-4',
      xs: 'text-[11px] leading-4',
      error: 'mt-1 text-xs text-rose-600 dark:text-rose-400',
    },

    form: {
      label: 'block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider',
      input: 'w-full bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-lg px-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all',
      inputMono: 'w-full bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-lg px-3 py-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all',
      select: 'w-full bg-white dark:bg-slate-900 border border-stone-300 dark:border-slate-700 rounded-lg px-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all cursor-pointer',
    },

    modal: {
      overlay: 'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm',
      panel: 'w-full max-w-lg rounded-xl border border-stone-200 bg-white p-5 text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
      header: 'mb-5 flex items-center justify-between border-b border-stone-200 pb-4 dark:border-slate-800',
    },

    button: {
      primary: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold px-4 py-2.5 rounded-lg text-xs transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2',
      secondary: 'bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 text-slate-700 dark:text-slate-200 font-medium px-4 py-2.5 rounded-lg text-xs border border-stone-200 dark:border-slate-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xs',
      outline: 'bg-transparent border border-stone-300 dark:border-slate-700 hover:border-amber-500 text-slate-700 dark:text-slate-300 hover:text-amber-600 font-medium px-3.5 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5',
      icon: 'p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700 transition-all shadow-2xs',
    },

    table: {
      wrapper: 'w-full overflow-x-auto rounded-xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs',
      main: 'w-full text-left border-collapse',
      th: 'bg-stone-50/80 dark:bg-slate-800/50 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider p-3 border-b border-stone-200/80 dark:border-slate-800',
      td: 'p-3 text-[11px] text-slate-700 dark:text-slate-300 border-b border-stone-100 dark:border-slate-800/60 font-mono',
      tdText: 'p-3 text-[11px] text-slate-700 dark:text-slate-300 border-b border-stone-100 dark:border-slate-800/60 font-sans',
      trHover: 'hover:bg-amber-50/30 dark:hover:bg-slate-800/40 transition-colors',
    },

    badge: {
      success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 uppercase tracking-wider',
      danger: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 uppercase tracking-wider',
      warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 uppercase tracking-wider',
      info: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/60 uppercase tracking-wider',
      neutral: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-wider',
    },
  },
};

export default theme;