#!/bin/bash

# Migration script for all microservices
set -e

echo "🚀 Starting database migrations for all services..."

# Array of services
services=(
  "account-service"
  "transaction-service"
  "budget-service"
  "goal-service"
  "auth-service"
)

# Migrate each service
for service in "${services[@]}"; do
  echo ""
  echo "📦 Migrating ${service}..."
  cd "services/${service}"
  
  # Generate Prisma Client
  echo "  → Generating Prisma Client..."
  npx prisma generate --schema=src/prisma/schema.prisma
  
  # Run migrations
  echo "  → Running migrations..."
  npx prisma migrate deploy --schema=src/prisma/schema.prisma || \
  npx prisma db push --schema=src/prisma/schema.prisma
  
  cd ../..
  echo "  ✅ ${service} migrated successfully"
done

echo ""
echo "✨ All migrations completed successfully!"
