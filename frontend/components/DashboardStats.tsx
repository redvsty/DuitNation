'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

type Stats = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  net: number;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    net: 0,
  });

  useEffect(() => {
    // Fetch summary from analytics service
    apiClient.get('/analytics/summary?userId=demo-user')
      .then((res) => {
        setStats(res.data);
      })
      .catch(() => {
        // Default fallback data
        setStats({
          totalBalance: 25_000_000,
          totalIncome: 12_000_000,
          totalExpense: 7_500_000,
          net: 4_500_000,
        });
      });
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const statItems = [
    {
      label: 'Total Balance',
      value: stats.totalBalance,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Total Income',
      value: stats.totalIncome,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Total Expense',
      value: stats.totalExpense,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Net',
      value: stats.net,
      color: stats.net >= 0 ? 'text-emerald-400' : 'text-red-400',
      bgColor: stats.net >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10',
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`rounded-xl border border-slate-800 ${item.bgColor} p-4`}
        >
          <p className="text-sm text-slate-400 mb-1">{item.label}</p>
          <p className={`text-2xl font-semibold ${item.color}`}>
            {formatCurrency(item.value)}
          </p>
        </div>
      ))}
    </div>
  );
}