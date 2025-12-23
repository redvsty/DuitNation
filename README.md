# Money Management Microservices

Aplikasi money management dengan arsitektur microservices menggunakan NestJS, PostgreSQL, Redis, dan Next.js.

## 🏗️ Struktur Proyek

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

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 20+ (untuk development lokal)
- PostgreSQL 15
- Redis 7

## 🚀 Quick Start

### 1. Setup Environment Variables

```bash
cp .env.example .env
# Edit .env file with your credentials
```

### 2. Run with Docker Compose (Recommended)

```bash
# Build dan run semua services
docker-compose up --build

# Atau run di background
docker-compose up -d --build

# Lihat logs
docker-compose logs -f

# Lihat logs service tertentu
docker-compose logs -f auth-service

# Stop semua services
docker-compose down

# Stop dan hapus volumes (reset database)
docker-compose down -v
```

### 3. Development Setup (Local)

```bash
# Run setup script
chmod +x dev-setup.sh
./dev-setup.sh

# Or manual setup:
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

### 4. Database Migrations

```bash
# Run migration script
chmod +x migrate-all.sh
./migrate-all.sh

# Or migrate individual service
cd services/account-service
npx prisma generate --schema=src/prisma/schema.prisma
npx prisma migrate dev --name init --schema=src/prisma/schema.prisma
# Or for quick development:
npx prisma db push --schema=src/prisma/schema.prisma
```

## 🗄️ Database Schema

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

### Auth Service
- **Database**: `auth`
- **Tables**:
  - User (id, email, password, name)
  - RefreshToken (id, userId, token, expiresAt)

## 🔌 API Endpoints

### Gateway: http://localhost:3000/api

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile
- `GET /api/auth/health` - Health check

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

## 🖥️ Frontend Pages

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Dashboard with stats and charts
- `/accounts` - List semua accounts
- `/transactions` - List semua transactions
- `/budgets` - Budget tracking
- `/goals` - Financial goals tracking

## 🔧 Development

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

# Auth Service
cd services/auth-service
npm run start:dev

# Gateway
cd gateway
npm run start:dev

# Frontend
cd frontend
npm run dev
```

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Reset database
docker-compose down -v
docker-compose up -d postgres

# Wait for postgres to be ready (check logs)
docker-compose logs -f postgres

# Run migrations again
./migrate-all.sh
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

# On Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

### Prisma Client Error

```bash
cd services/[service-name]
npx prisma generate --schema=src/prisma/schema.prisma
npm run build
```

### Container Health Check Failing

```bash
# Check container logs
docker-compose logs [service-name]

# Check container health status
docker inspect --format='{{json .State.Health}}' [container-name]

# Restart specific service
docker-compose restart [service-name]
```

### Frontend Build Error

```bash
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

### CORS Error

Pastikan environment variable `NEXT_PUBLIC_API_URL` di frontend sudah benar:
- Development: `http://localhost:3000/api`
- Production: Sesuaikan dengan URL production

## 🧪 Testing

### Test API dengan curl

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create account (with token)
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"userId":"user-id","name":"Bank BCA","type":"bank","balance":"5000000","color":"#3b82f6"}'
```

## 📊 Monitoring

### Check Service Health

```bash
# Check all services
curl http://localhost:3000/api/auth/health
curl http://localhost:3001/api/accounts
curl http://localhost:3002/api/transactions
curl http://localhost:3003/api/budgets
curl http://localhost:3004/api/goals
curl http://localhost:3005/api/analytics/summary?userId=test

# Check container stats
docker stats
```

## 🔐 Security Notes

⚠️ **Important**: Sebelum deploy ke production:

1. Change `JWT_SECRET` di `.env`
2. Use strong passwords untuk database
3. Enable HTTPS
4. Set proper CORS origins
5. Add rate limiting
6. Enable database SSL
7. Use secrets management (e.g., AWS Secrets Manager)

## 🚢 Production Deployment

```bash
# Build for production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# Or deploy to cloud (AWS, GCP, Azure, etc.)
```

## 📝 Tech Stack

- **Backend**: NestJS, Prisma ORM, PostgreSQL
- **Cache**: Redis
- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Charts**: Recharts
- **API Client**: Axios
- **Authentication**: JWT, Passport
- **Containerization**: Docker, Docker Compose

## 📄 License

MIT

## 👥 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📞 Support

For issues and questions, please open an issue on GitHub.