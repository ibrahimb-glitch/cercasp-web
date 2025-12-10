# Multi-stage build for NestJS API
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/
COPY packages/db/package.json ./packages/db/

# Install dependencies
RUN yarn install --frozen-lockfile --ignore-engines

# Copy source code
COPY apps/api ./apps/api
COPY packages/db ./packages/db
COPY turbo.json ./
COPY tsconfig.json ./

# Build the API
WORKDIR /app/apps/api
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/
RUN yarn install --production --frozen-lockfile --ignore-engines

# Copy built application
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/src/prisma ./apps/api/src/prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Start the application
CMD ["node", "apps/api/dist/main"]
