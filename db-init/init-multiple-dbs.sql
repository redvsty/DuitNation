-- Create all databases for the microservices
CREATE DATABASE accounts;
CREATE DATABASE transactions;
CREATE DATABASE budgets;
CREATE DATABASE goals;
CREATE DATABASE auth;
CREATE DATABASE analytics;

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