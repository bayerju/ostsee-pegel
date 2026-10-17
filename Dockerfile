# Build on GitHub Actions; Coolify only pulls the resulting image.
FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS build
RUN npm install --global pnpm@9.15.2
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile
COPY . .
# Only public values are accepted at build time. No production credentials.
ARG NEXT_PUBLIC_ENV=production
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG NEXT_PUBLIC_WEB_URL=https://ostsee-pegel.de
RUN CI=true NEXT_TELEMETRY_DISABLED=1 pnpm lint \
    && pnpm typecheck \
    && CI=true NEXT_TELEMETRY_DISABLED=1 pnpm build
RUN CI=true pnpm prune --prod --ignore-scripts && rm -rf .next/cache

FROM base AS runtime
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/package.json /app/next.config.js ./
COPY --from=build --chown=node:node /app/src/env.js ./src/env.js
COPY --chown=node:node deploy/healthcheck.mjs ./healthcheck.mjs
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=3 CMD ["node", "/app/healthcheck.mjs"]
# Preserve the existing start behavior, including Prisma schema synchronization.
CMD ["sh", "-c", "./node_modules/.bin/prisma db push && exec ./node_modules/.bin/next start --hostname 0.0.0.0"]
