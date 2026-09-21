// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/dashboard/Sidebar';
import Dashboard from '../src/pages/dashboardpage.jsx';
import InvoicesPage from '../src/pages/invoicetablepage.jsx'; // Ya phir direct InvoiceTable agar aapne page nahi banaya

function App() {
  // State to switch between main views
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* 1. Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Active Page View */}
      <main className="flex-1 overflow-x-hidden bg-slate-900">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'invoices' && <InvoicesPage />}
      </main>
    </div>
  );
}

export default App;