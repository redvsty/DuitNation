export type Account = {
    id: string;
    userId: string;
    name: string;
    type: string;
    balance: string;
    color: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type Transaction = {
    id: string;
    userId: string;
    accountId: string;
    categoryId: string;
    type: 'income' | 'expense';
    amount: string;
    description: string;
    date: string;
    recurring: boolean;
    recurringFrequency?: string | null;
  };
  
  export type Budget = {
    id: string;
    userId: string;
    categoryId: string;
    month: string;
    limit: string;
    spent: string;
  };
  
  export type Goal = {
    id: string;
    userId: string;
    name: string;
    target: string;
    current: string;
    deadline: string;
  };
  