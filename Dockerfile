FROM node:22.18-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@latest-10 && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build:prod && pnpm prune --prod

FROM node:22.18-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "./dist/apps/backoffice/backend/start.js"]