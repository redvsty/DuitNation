'use client';

import DashboardStats from '@/components/DashboardStats';
import CashflowChart from '@/components/Charts/CashflowChart';
import ExpensePieChart from '@/components/Charts/ExpensePieChart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <DashboardStats />
      <div className="grid md:grid-cols-2 gap-6">
        <CashflowChart />
        <ExpensePieChart />
      </div>
    </div>
  );
}