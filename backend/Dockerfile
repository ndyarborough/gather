FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

# Copy package files from builder stage
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy build output and Prisma files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/prisma ./src/prisma

# Create uploads directory
RUN mkdir -p uploads

# Expose the port that NestJS will run on
EXPOSE 3001

# Run Prisma generate at container startup and then start the app
CMD ["/bin/sh", "-c", "npx prisma generate && npm run start:prod"]