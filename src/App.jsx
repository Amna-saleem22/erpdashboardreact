// src/App.jsx
import { useState } from 'react';
import Sidebar from './components/dashboard/Sidebar';
import Dashboard from '../src/components/erp/dashboardpage.jsx';
import InvoicesPage from './pages/invoicetablepage.jsx';

function App() {
  // State to switch between main views
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-stone-50 text-slate-950 font-sans transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {/* 1. Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Active Page View */}
      <main className="min-w-0 flex-1 overflow-x-hidden bg-stone-50 dark:bg-slate-950">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'invoices' && <InvoicesPage />}
      </main>
    </div>
  );
}

export default App;