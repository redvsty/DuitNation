'use client';

import { Budget } from '@/types';

interface BudgetProgressProps {
  budget: Budget;
}

export default function BudgetProgress({ budget }: BudgetProgressProps) {
  const spent = Number(budget.spent);
  const limit = Number(budget.limit);
  const percentage = Math.min((spent / limit) * 100, 100);
  const isOverBudget = spent > limit;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-slate-50">Category {budget.categoryId}</h3>
          <p className="text-sm text-slate-400">{budget.month}</p>
        </div>
        <span className={`text-sm font-medium ${isOverBudget ? 'text-red-400' : 'text-emerald-400'}`}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      
      <div className="mb-2">
        <div className="w-full bg-slate-800 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all ${
              isOverBudget ? 'bg-red-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-slate-400">
          {formatCurrency(spent)} / {formatCurrency(limit)}
        </span>
        {isOverBudget && (
          <span className="text-red-400 font-medium">Over Budget!</span>
        )}
      </div>
    </div>
  );
}