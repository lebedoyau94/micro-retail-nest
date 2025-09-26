FROM node:20-alpine AS builder

WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
COPY apps/*/package.json ./apps/
COPY libs/*/package.json ./libs/

RUN pnpm install --prefer-frozen-lockfile

COPY . .

RUN pnpm --filter auth build

# -------- Runner --------
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.pnpm-store ./.
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/apps/auth/package.json ./

EXPOSE 3000
CMD ["node", "dist/apps/auth/apps/auth/src/main.js"]
