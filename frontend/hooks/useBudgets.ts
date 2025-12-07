'use client';

import { useEffect, useState } from 'react';
import { Budget } from '@/types';
import { apiClient } from '@/lib/api';

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/budgets').then((res) => {
      setBudgets(res.data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  return { budgets, isLoading };
}