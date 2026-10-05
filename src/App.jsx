// src/App.jsx
import Dashboard from '../src/components/erp/dashboardpage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-950 font-sans transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {/* Main Active Page View */}
      <main className="w-full min-w-0 flex-1 overflow-x-hidden bg-stone-50 dark:bg-slate-950">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;