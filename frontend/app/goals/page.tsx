'use client';

import GoalCard from '@/components/GoalCard';
import { useGoals } from '@/hooks/useGoals';

export default function GoalsPage() {
  const { goals, isLoading } = useGoals();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Goals</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {goals.map((g) => (
          <GoalCard key={g.id} goal={g} />
        ))}
      </div>
      {goals.length === 0 && (
        <p className="text-center text-slate-400 py-8">No goals yet</p>
      )}
    </div>
  );
}