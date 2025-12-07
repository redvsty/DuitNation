import TransactionList from '@/components/TransactionList';

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Transactions</h2>
      <TransactionList />
    </div>
  );
}
