FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build for production, use dev script for development with volumes
RUN pnpm run build

EXPOSE 3001

# For development with hot reload, use: CMD ["pnpm", "run", "dev"]
CMD ["pnpm", "start"]

