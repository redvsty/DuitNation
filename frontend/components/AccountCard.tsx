'use client';

import { Account } from '@/types';

interface AccountCardProps {
  account: Account;
  onUpdate?: () => void;
}

export default function AccountCard({ account, onUpdate }: AccountCardProps) {
  const formatBalance = (balance: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Number(balance));
  };

  return (
    <div 
      className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 transition-colors cursor-pointer"
      style={{ borderLeftColor: account.color, borderLeftWidth: '4px' }}
      onClick={onUpdate}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-slate-50">{account.name}</h3>
          <p className="text-sm text-slate-400 capitalize">{account.type}</p>
        </div>
      </div>
      <p className="text-2xl font-semibold text-emerald-400">
        {formatBalance(account.balance)}
      </p>
    </div>
  );
}