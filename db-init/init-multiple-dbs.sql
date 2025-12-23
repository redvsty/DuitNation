-- Create all databases for the microservices if they don't exist
SELECT 'CREATE DATABASE accounts'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'accounts')\gexec

SELECT 'CREATE DATABASE transactions'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'transactions')\gexec

SELECT 'CREATE DATABASE budgets'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'budgets')\gexec

SELECT 'CREATE DATABASE goals'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'goals')\gexec

SELECT 'CREATE DATABASE auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'auth')\gexec

-- Connect to accounts database and create extension if needed
\c accounts;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Connect to transactions database and create extension if needed
\c transactions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Connect to budgets database and create extension if needed
\c budgets;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Connect to goals database and create extension if needed
\c goals;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Connect to auth database and create extension if needed
\c auth;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";