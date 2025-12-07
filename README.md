# Money Management Microservices

Aplikasi money management dengan arsitektur microservices menggunakan NestJS, PostgreSQL, Redis, dan Next.js.

## Struktur Proyek

```
├── services/
│   ├── account-service/      # Port 3001 - Manajemen akun
│   ├── transaction-service/  # Port 3002 - Manajemen transaksi
│   ├── budget-service/       # Port 3003 - Manajemen budget
│   ├── goal-service/         # Port 3004 - Manajemen goals
│   ├── analytics-service/    # Port 3005 - Analytics & reports
│   └── auth-service/         # Port 3006 - Authentication
├── gateway/                  # Port 3000 - API Gateway
├── frontend/                 # Port 3007 - Next.js UI
├── db-init/                  # Database initialization scripts
└── docker-compose.yml
```

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (untuk development lokal)
- PostgreSQL 15
- Redis 7

## Setup & Installation

### 1. Clone dan Install Dependencies (Local Development)

```bash
# Install dependencies untuk setiap service
cd services/account-service && npm install
cd ../transaction-service && npm install
cd ../budget-service && npm install
cd ../goal-service && npm install
cd ../analytics-service && npm install
cd ../auth-service && npm install
cd ../../gateway && npm install
cd ../frontend && npm install
```

### 2. Setup Database dengan Prisma

```bash
# Untuk setiap service yang menggunakan Prisma
cd services/account-service
npx prisma generate
npx prisma migrate dev --name init

cd ../transaction-service
npx prisma generate
npx prisma migrate dev --name init

cd ../budget-service
npx prisma generate
npx prisma migrate dev --name init

cd ../goal-service
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Run dengan Docker Compose

```bash
# Build dan run semua services
docker-compose up --build

# Atau run di background
docker-compose up -d --build

# Lihat logs
docker-compose logs -f

# Stop semua services
docker-compose down
```

## Database Schema

### Account Service
- **Database**: `accounts`
- **Table**: Account (id, userId, name, type, balance, color)

### Transaction Service
- **Database**: `transactions`
- **Tables**: 
  - Transaction (id, userId, accountId, categoryId, type, amount, description, date, recurring)
  - Category (id, name, type, icon)

### Budget Service
- **Database**: `budgets`
- **Table**: Budget (id, userId, categoryId, month, limit, spent)

### Goal Service
- **Database**: `goals`
- **Table**: Goal (id, userId, name, target, current, deadline)

## API Endpoints

### Gateway: http://localhost:3000/api

#### Accounts
- `GET /api/accounts` - List semua accounts
- `POST /api/accounts` - Create account baru
- `GET /api/accounts/:id` - Get account by ID
- `PATCH /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `PATCH /api/accounts/:id/balance` - Update balance

#### Transactions
- `GET /api/transactions` - List transactions (with filters)
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction by ID
- `PATCH /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/recurring` - Get recurring transactions

#### Budgets
- `GET /api/budgets` - List budgets
- `POST /api/budgets` - Create budget
- `GET /api/budgets/:id` - Get budget by ID
- `PATCH /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget
- `GET /api/budgets/progress?userId=...&month=YYYY-MM` - Get budget progress

#### Goals
- `GET /api/goals` - List goals
- `POST /api/goals` - Create goal
- `GET /api/goals/:id` - Get goal by ID
- `PATCH /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `PATCH /api/goals/:id/progress` - Update goal progress

#### Analytics
- `GET /api/analytics/cashflow?userId=...&from=...&to=...` - Cashflow analysis
- `GET /api/analytics/expenses?userId=...&from=...&to=...` - Expense breakdown
- `GET /api/analytics/income?userId=...&from=...&to=...` - Income breakdown
- `GET /api/analytics/summary?userId=...&from=...&to=...` - Financial summary
- `GET /api/analytics/trends?userId=...&months=6` - Trend analysis
- `GET /api/analytics/comparison?userId=...&from=YYYY-MM&to=YYYY-MM` - Period comparison

## Frontend Pages

- `/` - Home page
- `/dashboard` - Dashboard with stats and charts
- `/accounts` - List semua accounts
- `/transactions` - List semua transactions
- `/budgets` - Budget tracking
- `/goals` - Financial goals tracking

## Environment Variables

### Services
Setiap service membutuhkan `DATABASE_URL`:
```env
DATABASE_URL=postgresql://davan:Trinix%55@postgres:5432/[database_name]
```

### Auth Service
```env
JWT_SECRET=your-secret-key-change-in-production
REDIS_URL=redis://redis:6379
```

### Analytics Service
```env
TRANSACTION_SERVICE_URL=http://transaction-service:3002/api
ACCOUNT_SERVICE_URL=http://account-service:3001/api
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Development

### Run Service Individually (Local)

```bash
# Account Service
cd services/account-service
npm run start:dev

# Transaction Service
cd services/transaction-service
npm run start:dev

# Budget Service
cd services/budget-service
npm run start:dev

# Goal Service
cd services/goal-service
npm run start:dev

# Analytics Service
cd services/analytics-service
npm run start:dev

# Gateway
cd gateway
npm run start:dev

# Frontend
cd frontend
npm run dev
```

## Troubleshooting

### Database Connection Error
```bash
# Reset database
docker-compose down -v
docker-compose up -d postgres
# Wait for postgres to be ready, then run migrations
```

### Port Already in Use
```bash
# Stop semua containers
docker-compose down

# Check ports
lsof -i :3000
lsof -i :3001
# ... etc

# Kill process if needed
kill -9 [PID]
```

### Prisma Client Error
```bash
cd services/[service-name]
npx prisma generate
npm run build
```

## Testing

```bash
# Test API dengan curl
curl http://localhost:3000/api/accounts
curl http://localhost:3000/api/transactions
curl http://localhost:3000/api/budgets
curl http://localhost:3000/api/goals

# Create sample data
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"userId":"user1","name":"Bank BCA","type":"bank","balance":"5000000","color":"#3b82f6"}'
```

## Tech Stack

- **Backend**: NestJS, Prisma ORM, PostgreSQL
- **Cache**: Redis
- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Charts**: Recharts
- **API Client**: Axios
- **Containerization**: Docker, Docker Compose

## License

MIT