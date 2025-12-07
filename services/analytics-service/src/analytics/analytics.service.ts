import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

type RangeParams = {
  userId: string;
  from?: string;
  to?: string;
};

type TrendsParams = {
  userId: string;
  months: number;
};

type ComparisonParams = {
  userId: string;
  from: string; // YYYY-MM
  to: string;   // YYYY-MM
};

@Injectable()
export class AnalyticsService {
  private readonly transactionBaseUrl: string;
  private readonly accountBaseUrl: string;

  constructor(private readonly http: HttpService) {
    this.transactionBaseUrl = process.env.TRANSACTION_SERVICE_URL || 'http://transaction-service:3002/api';
    this.accountBaseUrl = process.env.ACCOUNT_SERVICE_URL || 'http://account-service:3001/api';
  }

  // Helper: panggil transaction-service GET /transactions dengan filter
  private async fetchTransactions(params: RangeParams & { type?: 'income' | 'expense' }) {
    const { userId, from, to, type } = params;

    const url = `${this.transactionBaseUrl}/transactions`;
    const res = await firstValueFrom(
      this.http.get(url, {
        params: {
          userId,
          from,
          to,
          type,
        },
      }),
    );

    return res.data as Array<{
      id: string;
      type: 'income' | 'expense';
      amount: string;
      date: string;
      categoryId: string;
      accountId: string;
    }>;
  }

  async getCashflow(params: RangeParams) {
    const [incomes, expenses] = await Promise.all([
      this.fetchTransactions({ ...params, type: 'income' }),
      this.fetchTransactions({ ...params, type: 'expense' }),
    ]);

    const groupByMonth = (items: typeof incomes | typeof expenses) => {
      const map: Record<string, number> = {};
      for (const tx of items) {
        const month = tx.date.slice(0, 7); // YYYY-MM
        map[month] = (map[month] || 0) + Number(tx.amount);
      }
      return map;
    };

    const incomeByMonth = groupByMonth(incomes);
    const expenseByMonth = groupByMonth(expenses);

    const months = Array.from(new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)])).sort();

    return months.map((m) => ({
      month: m,
      income: incomeByMonth[m] || 0,
      expense: expenseByMonth[m] || 0,
      net: (incomeByMonth[m] || 0) - (expenseByMonth[m] || 0),
    }));
  }

  async getExpenseBreakdown(params: RangeParams) {
    const expenses = await this.fetchTransactions({ ...params, type: 'expense' });

    const byCategory: Record<string, number> = {};
    for (const tx of expenses) {
      byCategory[tx.categoryId] = (byCategory[tx.categoryId] || 0) + Number(tx.amount);
    }

    const total = Object.values(byCategory).reduce((a, b) => a + b, 0);

    return Object.entries(byCategory).map(([categoryId, amount]) => ({
      categoryId,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }));
  }

  async getIncomeBreakdown(params: RangeParams) {
    const incomes = await this.fetchTransactions({ ...params, type: 'income' });

    const byCategory: Record<string, number> = {};
    for (const tx of incomes) {
      byCategory[tx.categoryId] = (byCategory[tx.categoryId] || 0) + Number(tx.amount);
    }

    const total = Object.values(byCategory).reduce((a, b) => a + b, 0);

    return Object.entries(byCategory).map(([categoryId, amount]) => ({
      categoryId,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }));
  }

  async getSummary(params: RangeParams) {
    const [incomes, expenses] = await Promise.all([
      this.fetchTransactions({ ...params, type: 'income' }),
      this.fetchTransactions({ ...params, type: 'expense' }),
    ]);

    const totalIncome = incomes.reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

    const net = totalIncome - totalExpense;

    // (Opsional) bisa tarik total balance dari account-service juga
    let totalBalance = 0;
    try {
      const res = await firstValueFrom(
        this.http.get(`${this.accountBaseUrl}/accounts`, {
          params: { userId: params.userId },
        }),
      );
      const accounts = res.data as Array<{ balance: string }>;
      totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
    } catch {
      // kalau gagal, biarin 0
    }

    return {
      totalIncome,
      totalExpense,
      net,
      totalBalance,
      period: {
        from: params.from || null,
        to: params.to || null,
      },
    };
  }

  async getTrends(params: TrendsParams) {
    // Untuk contoh: panggil cashflow, lalu potong N bulan terakhir
    const now = new Date();
    const fromDate = new Date(now);
    fromDate.setMonth(fromDate.getMonth() - (params.months - 1));

    const from = fromDate.toISOString().slice(0, 10);
    const to = now.toISOString().slice(0, 10);

    const cashflow = await this.getCashflow({ userId: params.userId, from, to });

    return {
      months: params.months,
      data: cashflow,
    };
  }

  async getComparison(params: ComparisonParams) {
    // Bandingkan dua bulan: from dan to (YYYY-MM)
    const [fromYear, fromMonth] = params.from.split('-').map(Number);
    const [toYear, toMonth] = params.to.split('-').map(Number);

    const fromStart = new Date(fromYear, fromMonth - 1, 1);
    const fromEnd = new Date(fromYear, fromMonth, 0); // last day

    const toStart = new Date(toYear, toMonth - 1, 1);
    const toEnd = new Date(toYear, toMonth, 0);

    const [fromSummary, toSummary] = await Promise.all([
      this.getSummary({
        userId: params.userId,
        from: fromStart.toISOString().slice(0, 10),
        to: fromEnd.toISOString().slice(0, 10),
      }),
      this.getSummary({
        userId: params.userId,
        from: toStart.toISOString().slice(0, 10),
        to: toEnd.toISOString().slice(0, 10),
      }),
    ]);

    return {
      from: {
        month: params.from,
        ...fromSummary,
      },
      to: {
        month: params.to,
        ...toSummary,
      },
      diff: {
        income: (toSummary as any).totalIncome - (fromSummary as any).totalIncome,
        expense: (toSummary as any).totalExpense - (fromSummary as any).totalExpense,
        net: (toSummary as any).net - (fromSummary as any).net,
      },
    };
  }
}
