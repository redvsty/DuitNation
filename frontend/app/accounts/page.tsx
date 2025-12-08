'use client';

import { useState } from 'react';
import AccountCard from '@/components/AccountCard';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAccounts } from '@/hooks/useAccounts';
import { apiClient } from '@/lib/api';

export default function AccountsPage() {
  const { accounts, isLoading, mutate } = useAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'bank',
    balance: '0',
    color: '#3b82f6'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/accounts', {
        ...formData,
        userId: 'demo-user' // Replace with actual user ID from auth
      });
      mutate(); // Refresh data
      setIsModalOpen(false);
      setFormData({ name: '', type: 'bank', balance: '0', color: '#3b82f6' });
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Accounts</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Account
          </button>
        </div>

        {accounts.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            title="No accounts yet"
            description="Create your first account to start managing your money"
            action={{
              label: 'Create Account',
              onClick: () => setIsModalOpen(true)
            }}
          />
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {accounts.map((a) => (
              <AccountCard key={a.id} account={a} onUpdate={mutate} />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Account"
        size="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Account Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Bank BCA"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none"
            >
              <option value="bank">Bank</option>
              <option value="cash">Cash</option>
              <option value="ewallet">E-Wallet</option>
              <option value="credit">Credit Card</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Initial Balance</label>
            <input
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              required
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full h-12 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-medium transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}