'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', income: 10_000_000, expense: 7_000_000 },
  { month: 'Feb', income: 11_000_000, expense: 8_000_000 },
  { month: 'Mar', income: 12_000_000, expense: 7_500_000 }
];

export default function CashflowChart() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h3 className="mb-2 font-medium">Cashflow</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" />
            <Line type="monotone" dataKey="expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
