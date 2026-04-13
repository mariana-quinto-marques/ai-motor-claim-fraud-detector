'use client';

import { AppProvider, useApp } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import DashboardPage from '@/components/dashboard/DashboardPage';
import ClaimsPage from '@/components/claims/ClaimsPage';
import FraudHubPage from '@/components/fraud/FraudHubPage';
import ReportsPage from '@/components/reports/ReportsPage';
import ClaimDetailPanel from '@/components/detail/ClaimDetailPanel';
import Toast from '@/components/ui/Toast';
import FloatingTooltip from '@/components/FloatingTooltip';

function Dashboard() {
  const { state } = useApp();

  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <div className={`page${state.activePage === 'dashboard' ? ' on' : ''}`}>
            <DashboardPage />
          </div>
          <div className={`page${state.activePage === 'claims' ? ' on' : ''}`}>
            <ClaimsPage />
          </div>
          <div className={`page${state.activePage === 'fraud' ? ' on' : ''}`}>
            <FraudHubPage />
          </div>
          <div className={`page${state.activePage === 'reports' ? ' on' : ''}`}>
            <ReportsPage />
          </div>
        </div>
      </div>
      <ClaimDetailPanel />
      <Toast />
      <FloatingTooltip />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
