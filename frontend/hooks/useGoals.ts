'use client';

import { useEffect, useState } from 'react';
import { Goal } from '@/types';
import { apiClient } from '@/lib/api';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/goals').then((res) => {
      setGoals(res.data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  return { goals, isLoading };
}