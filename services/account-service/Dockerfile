FROM node:20-alpine3.18 AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine3.18
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl wget

# Copy built assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy Prisma schema
COPY --from=builder /app/src/prisma ./src/prisma

RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 3001

CMD ["node", "dist/main.js"]