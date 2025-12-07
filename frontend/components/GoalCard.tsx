'use client';

import { Goal } from '@/types';

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const current = Number(goal.current);
  const target = Number(goal.target);
  const percentage = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-slate-50">{goal.name}</h3>
          <p className="text-sm text-slate-400">Target: {formatDate(goal.deadline)}</p>
        </div>
        {isCompleted && (
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
            Completed
          </span>
        )}
      </div>

      <div className="mb-3">
        <div className="w-full bg-slate-800 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all ${
              isCompleted ? 'bg-emerald-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-slate-400">
          {formatCurrency(current)}
        </span>
        <span className="text-slate-300 font-medium">
          {formatCurrency(target)}
        </span>
      </div>
      
      <p className="text-center text-sm text-slate-400 mt-2">
        {percentage.toFixed(1)}%
      </p>
    </div>
  );
}