'use client';

import AccountCard from '@/components/AccountCard';
import { useAccounts } from '@/hooks/useAccounts';

export default function AccountsPage() {
  const { accounts, isLoading } = useAccounts();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Accounts</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {accounts.map((a) => (
          <AccountCard key={a.id} account={a} />
        ))}
      </div>
      {accounts.length === 0 && (
        <p className="text-center text-slate-400 py-8">No accounts yet</p>
      )}
    </div>
  );
}