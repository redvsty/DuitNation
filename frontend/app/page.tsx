import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Money Management App</h1>
      <p className="text-slate-300">
        Kelola akun, transaksi, budget, dan goals dengan arsitektur microservices.
      </p>
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-medium"
        >
          Buka Dashboard
        </Link>
      </div>
    </main>
  );
}
