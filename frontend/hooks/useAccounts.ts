'use client';

import { useEffect, useState } from 'react';
import { Account } from '@/types';
import { apiClient } from '@/lib/api';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/accounts').then((res) => {
      setAccounts(res.data);
      setIsLoading(false);
    });
  }, []);

  return { accounts, isLoading };
}
