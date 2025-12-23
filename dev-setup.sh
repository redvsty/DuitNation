#!/bin/bash

set -e

echo "🚀 Money Management App - Development Setup"
echo "==========================================="

# Check if .env exists
if [ ! -f .env ]; then
  echo "⚠️  .env file not found. Creating from .env.example..."
  cp .env.example .env
  echo "✅ .env file created. Please update it with your credentials."
  exit 1
fi

# Install dependencies for all services
echo ""
echo "📦 Installing dependencies..."

services=(
  "services/account-service"
  "services/transaction-service"
  "services/budget-service"
  "services/goal-service"
  "services/analytics-service"
  "services/auth-service"
  "gateway"
  "frontend"
)

for service in "${services[@]}"; do
  echo "  → Installing ${service}..."
  cd "${service}"
  npm install --silent
  cd - > /dev/null
done

echo "✅ All dependencies installed"

# Start Docker containers
echo ""
echo "🐳 Starting Docker containers..."
docker compose up -d postgres redis

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Run migrations
echo ""
echo "🗄️  Running database migrations..."

for service in "account-service" "transaction-service" "budget-service" "goal-service" "auth-service"; do
  echo "  → Migrating ${service}..."
  cd "services/${service}"
  
  # Generate Prisma Client
  npx prisma generate --schema=src/prisma/schema.prisma
  
  # Run migrations (use push for development, migrate deploy for production)
  npx prisma db push --schema=src/prisma/schema.prisma --skip-generate
  
  cd ../..
done

echo "✅ All migrations completed"

echo ""
echo "✨ Setup completed successfully!"
echo ""
echo "To start the development servers:"
echo "  1. Start backend services:"
echo "     npm run dev (in each service directory)"
echo ""
echo "  2. Start API Gateway:"
echo "     cd gateway && npm run start:dev"
echo ""
echo "  3. Start Frontend:"
echo "     cd frontend && npm run dev"
echo ""
echo "Or use Docker Compose:"
echo "  docker compose up --build"
echo ""
