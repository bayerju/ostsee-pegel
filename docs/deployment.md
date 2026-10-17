# Production deployment

Next.js, PostgreSQL, Better Auth, scraping and notifications remain unchanged.
GitHub Actions builds a Docker image; Coolify pulls it from GHCR and runs it on
`prod`. No application compilation runs on the production server.

## Build and release

- CI builds the image, runs lint/typecheck, and boots it with a disposable
  PostgreSQL database. The smoke test checks the existing `prisma db push`
  startup, login, anonymous auth, protected redirects, public assets, runtime
  legal details and the non-root user.
- On `main`, **Deploy production** repeats verification with the production
  public build variables, pushes `ghcr.io/bayerju/ostsee-pegel:sha-<full SHA>`,
  updates the configured Coolify image tag, triggers deployment, and waits for
  success. Failed deployments and timeouts fail the workflow.
- Releases are serialized and do not cancel an active release. Images are
  tagged per commit; no `latest` tag is used. A rerun can overwrite a commit tag,
  so record the GHCR digest for a byte-for-byte rollback.
- `DEPLOY_ENABLED=true` is a repository variable enabling production releases.
  The `production` GitHub environment holds `COOLIFY_URL`, `COOLIFY_APP_UUID`,
  `NEXT_PUBLIC_POSTHOG_KEY`, and the secrets `COOLIFY_API_TOKEN` (read/write) and
  `COOLIFY_DEPLOY_TOKEN` (deploy-only). Never use a broad personal setup token.
- Runtime secrets stay in Coolify. The image accepts only the public Next build
  arguments `NEXT_PUBLIC_ENV`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_WEB_URL`.
  Public values are compiled into the image; changing them requires a rebuild.
- Impressum and privacy details are dynamically rendered from runtime variables.
  No database connection or production secret is needed to build the image.

The Docker image uses regular `next start`, port 3000, Node 22, and the existing
Prisma startup command. Prisma CLI is a production dependency because startup
already uses `prisma db push`. Schema changes retain that existing behavior;
this change does not establish a database migration history or database rollback.

## One-time cutover

`deploy/coolify.json` identifies the new image application and previous Nixpacks
application. Coolify 4.3.14 does not allow changing an application to `dockerimage`
through its update API, so a separate image application is prepared on the same
server, project, environment and Docker network. Keep the old app until verified.

1. Verify runtime environment values were copied, including the existing auth
   secret and database URL. Do not rotate them. Configure the production GitHub
   environment and restrict it to `main`. Verify the server's root Docker login
   can pull private GHCR images (the JR apps use the same registry).
2. Disable Git auto-deploy and PR previews on the old production application
   before merging, to prevent a simultaneous server build. Leave its running
   container and domain in place while the new image builds.
3. Enable `DEPLOY_ENABLED`, merge to `main`, and wait for the production workflow.
   The new application initially has no public domain. Verify the new container
   responds internally before switching traffic.
4. Move `https://ostsee-pegel.de` from the old app to the image app, redeploy the
   image app, and verify public homepage, login, legal details, and anonymous
   `/api/auth/get-session`. Verify the old container is no longer serving traffic
   before stopping it. Preserve the separate Pi application.
5. Verify external scrape and Telegram callers still reach their unchanged paths.
   Do not invoke the scrape or SMS test routes as a health check: they send messages.
   Inspect scheduled tasks associated with the old app before retiring it.

The GHCR package is public, matching this public repository, and linked to it.
No production secrets enter the image. GitHub Actions uses its automatic
`GITHUB_TOKEN` to publish. Registry credentials, when needed, live in the server
Docker login rather than application environment variables.

Coolify uses a command health check because the runtime image intentionally has
neither curl nor wget. The image includes the same native Docker health check. Configure
`health_check_type=cmd` with:

```sh
node /app/healthcheck.mjs
```

## Rollback

Choose a known-good image tag/digest in Coolify and redeploy. Do not rerun an old
GitHub commit to roll back. An image rollback does not undo database changes.
For the first cutover, retain the old app/image and restore its domain if needed.

## Local verification

```sh
CI=true pnpm lint
pnpm typecheck
node --test scripts/deploy-production.test.mjs
docker build -t ostsee-pegel:test .
node scripts/smoke-image.mjs ostsee-pegel:test
```

The smoke test creates and removes its own containers/network; it never uses the
production database or real messaging credentials.
