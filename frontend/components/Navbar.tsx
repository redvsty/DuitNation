'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/accounts', label: 'Accounts' },
    { href: '/transactions', label: 'Transactions' },
    { href: '/budgets', label: 'Budgets' },
    { href: '/goals', label: 'Goals' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-emerald-500">
            Money Manager
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex gap-1">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-500 text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
                  <span className="text-sm text-slate-400">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}