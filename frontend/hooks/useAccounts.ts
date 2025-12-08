'use client';

import { useEffect, useState } from 'react';
import { Account } from '@/types';
import { apiClient } from '@/lib/api';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/accounts');
      setAccounts(res.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { 
    accounts, 
    isLoading, 
    error,
    mutate: fetchAccounts
  };
}