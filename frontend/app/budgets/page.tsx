'use client';

import BudgetProgress from '@/components/BudgetProgress';
import { useBudgets } from '@/hooks/useBudgets';

export default function BudgetsPage() {
  const { budgets, isLoading } = useBudgets();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Budgets</h2>
      <div className="space-y-3">
        {budgets.map((b) => (
          <BudgetProgress key={b.id} budget={b} />
        ))}
      </div>
      {budgets.length === 0 && (
        <p className="text-center text-slate-400 py-8">No budgets yet</p>
      )}
    </div>
  );
}