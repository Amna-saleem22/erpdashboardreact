// src/theme/tokens.js

/**
 ============================================================================
 ERP ENTERPRISE DESIGN SYSTEM TOKENS & HTML ELEMENTS PRESETS (LIGHT THEME)
 ============================================================================
 Is file mein light mode ke UI Colors, Typography, Backgrounds, Borders, Badges,
 aur Tamam HTML Elements ki base classes centralized hain.
 */

export const theme = {
  // --------------------------------------------------------------------------
  // 1. FONT FAMILIES
  // --------------------------------------------------------------------------
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Inter, "Plus Jakarta Sans", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },

  // --------------------------------------------------------------------------
  // 2. FONT SIZES & TYPOGRAPHY UTILITIES
  // --------------------------------------------------------------------------
  fontSize: {
    h1: 'text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-slate-900',
    h2: 'text-xl md:text-2xl font-bold tracking-tight font-heading text-slate-900',
    h3: 'text-lg font-bold tracking-normal font-heading text-slate-800',
    h4: 'text-base font-semibold tracking-normal font-heading text-slate-800',

    bodyLg: 'text-base font-normal leading-relaxed text-slate-700',
    bodyMd: 'text-sm font-normal leading-normal text-slate-600',
    bodySm: 'text-xs font-normal leading-tight text-slate-500',
    caption: 'text-[11px] font-medium tracking-wide text-slate-500',
    micro: 'text-[10px] font-bold uppercase tracking-wider text-slate-400',
  },

  // --------------------------------------------------------------------------
  // 3. COLOR PALETTE (DECENT LIGHT MODE)
  // --------------------------------------------------------------------------
  colors: {
    bg: {
      main: 'bg-slate-50',
      card: 'bg-white',
      hover: 'bg-slate-100/80',
      input: 'bg-white',
      modal: 'bg-slate-900/40',
    },

    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-600',
      muted: 'text-slate-400',
      accent: 'text-amber-600',
      inverse: 'text-white',
    },

    accent: {
      main: 'bg-amber-500 hover:bg-amber-600 text-white',
      subtle: 'bg-amber-50 text-amber-700 border-amber-200',
      border: 'border-amber-300',
      glow: 'shadow-[0_2px_10px_rgba(245,158,11,0.15)]',
    },

    status: {
      success: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
      },
      danger: {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        badge: 'bg-rose-50 text-rose-700 border border-rose-200/80',
      },
      warning: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        badge: 'bg-amber-50 text-amber-700 border border-amber-200/80',
      },
      info: {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        badge: 'bg-sky-50 text-sky-700 border border-sky-200/80',
      },
    },

    border: {
      subtle: 'border-slate-200/80',
      strong: 'border-slate-300',
      focus: 'focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none',
    },
  },

  // --------------------------------------------------------------------------
  // 4. HTML ELEMENTS READY PRESETS
  // --------------------------------------------------------------------------
  elements: {
    // --- Layout Containers (div, section, main, header, footer) ---
    div: {
      pageWrapper: 'min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-6 space-y-6',
      card: 'bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow',
      cardHeader: 'flex items-center justify-between pb-4 border-b border-slate-100 mb-4',
      cardFooter: 'pt-4 border-t border-slate-100 mt-4 flex items-center justify-between',
      section: 'space-y-4 p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs',
      flexBetween: 'flex items-center justify-between gap-4',
      flexCenter: 'flex items-center justify-center',
      grid4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
      grid2: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
      divider: 'h-px w-full bg-slate-200 my-4',
    },

    // --- Typography Elements (p, span, h1-h4, label) ---
    p: {
      lead: 'text-base text-slate-700 font-normal leading-relaxed',
      body: 'text-sm text-slate-600 font-normal leading-normal',
      sm: 'text-xs text-slate-500 font-normal leading-tight',
      caption: 'text-[11px] text-slate-400 font-medium tracking-wide',
      micro: 'text-[10px] text-slate-400 font-bold uppercase tracking-wider',
      error: 'text-xs text-rose-600 font-medium mt-1',
      success: 'text-xs text-emerald-600 font-medium mt-1',
    },

    h: {
      h1: 'text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-heading',
      h2: 'text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-heading',
      h3: 'text-lg font-bold text-slate-800 tracking-normal font-heading',
      h4: 'text-base font-semibold text-slate-800 tracking-normal font-heading',
    },

    // --- Form Controls (input, select, textarea, label) ---
    form: {
      label: 'block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider',
      input: 'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all shadow-2xs',
      inputMono: 'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-amber-700 font-mono placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all shadow-2xs',
      select: 'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all cursor-pointer shadow-2xs',
      textarea: 'w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all resize-none shadow-2xs',
      checkbox: 'w-4 h-4 rounded border-slate-300 bg-white text-amber-600 focus:ring-amber-500/30 focus:ring-offset-white',
    },

    // --- Buttons & Interactive Controls ---
    button: {
      primary: 'bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all shadow-xs active:scale-[0.98] flex items-center justify-center gap-2',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl text-xs border border-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2',
      outline: 'bg-white border border-slate-300 hover:border-amber-500 text-slate-700 hover:text-amber-600 font-medium px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-2xs',
      danger: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2',
      icon: 'p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-all shadow-2xs',
    },

    // --- Data Display (table, th, td, tr, badge) ---
    table: {
      wrapper: 'w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs',
      main: 'w-full text-left border-collapse',
      th: 'bg-slate-100/70 text-[10px] uppercase font-bold text-slate-600 tracking-wider p-3.5 border-b border-slate-200',
      td: 'p-3.5 text-xs text-slate-700 border-b border-slate-100 font-mono',
      tdText: 'p-3.5 text-xs text-slate-700 border-b border-slate-100 font-sans',
      trHover: 'hover:bg-slate-50 transition-colors',
    },

    // --- Status Badges ---
    badge: {
      success: 'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider',
      danger: 'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider',
      warning: 'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider',
      info: 'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200 uppercase tracking-wider',
    },
  },
};

export default theme;