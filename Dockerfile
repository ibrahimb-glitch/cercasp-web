# Multi-stage build for NestJS API
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json yarn.lock ./
COPY turbo.json ./

# Copy workspace package files
COPY apps/api/package.json ./apps/api/
COPY packages/ ./packages/

# Install all dependencies
RUN yarn install --frozen-lockfile --ignore-engines

# Copy source code
COPY apps/api ./apps/api
COPY tsconfig.json ./

# Generate Prisma Client
WORKDIR /app/apps/api
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Build the API
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/node_modules ./node_modules

# Copy built files and Prisma
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/src/prisma ./apps/api/src/prisma
COPY --from=builder /app/apps/api/node_modules/.prisma ./apps/api/node_modules/.prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the application
CMD ["node", "apps/api/dist/main"]
