'use client';

import { useEffect, useState } from 'react';
import { Transaction } from '@/types';
import { apiClient } from '@/lib/api';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/transactions').then((res) => {
      setTransactions(res.data);
      setIsLoading(false);
    });
  }, []);

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium text-slate-50">{tx.description}</p>
              <p className="text-sm text-slate-400 mt-1">
                {formatDate(tx.date)} • Category: {tx.categoryId}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-lg font-semibold ${
                  tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
              </p>
              {tx.recurring && (
                <span className="text-xs text-blue-400">Recurring</span>
              )}
            </div>
          </div>
        </div>
      ))}
      {transactions.length === 0 && (
        <p className="text-center text-slate-400 py-8">No transactions yet</p>
      )}
    </div>
  );
}