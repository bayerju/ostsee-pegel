import { execFileSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const image = process.argv[2];
if (!image) throw new Error('Usage: node scripts/smoke-image.mjs IMAGE');
const prefix = `ostsee-smoke-${process.pid}`;
const docker = (...args) => execFileSync('docker', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const check = (condition, message) => { if (!condition) throw new Error(message); };
try {
  docker('network', 'create', prefix);
  docker('run', '-d', '--name', `${prefix}-db`, '--network', prefix,
    '-e', 'POSTGRES_PASSWORD=smoke-only', 'postgres:16-alpine');
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { docker('exec', `${prefix}-db`, 'pg_isready', '-U', 'postgres'); ready = true; break; } catch { await sleep(1000); }
  }
  check(ready, 'Disposable PostgreSQL did not start');
  const env = {
    DATABASE_URL: `postgresql://postgres:smoke-only@${prefix}-db:5432/postgres`,
    BETTER_AUTH_SECRET: 'smoke-only-secret-with-at-least-32-characters',
    BETTER_AUTH_URL: 'http://localhost:3000',
    PLUNK_API_KEY: 'smoke-only',
    IMPRINT_NAME: 'Runtime Imprint Smoke Test',
    IMPRINT_ADDRESS: 'Runtime Address', IMPRINT_CITY: 'Runtime City', IMPRINT_EMAIL: 'test@example.test',
    TWILIO_ACCOUNT_SID: `AC${'0'.repeat(32)}`, TWILIO_AUTH_TOKEN: 'smoke-only', TWILIO_VERIFY_SERVICE_SID: 'smoke-only',
  };
  docker('run', '-d', '--name', `${prefix}-app`, '--network', prefix,
    '-p', '127.0.0.1::3000', ...Object.entries(env).flatMap(([k,v]) => ['-e', `${k}=${v}`]), image);
  const port = docker('port', `${prefix}-app`, '3000/tcp').split(':').at(-1);
  const base = `http://127.0.0.1:${port}`;
  ready = false;
  for (let i = 0; i < 90; i++) {
    try { const r = await fetch(`${base}/login`, { signal: AbortSignal.timeout(2000) }); if (r.ok) { ready = true; break; } } catch { /* still starting */ }
    await sleep(1000);
  }
  check(ready, 'Application did not start with the production command');
  check(docker('exec', `${prefix}-app`, 'id', '-u') !== '0', 'Runtime must not run as root');
  for (const path of ['/imprint', '/privacy-policy']) {
    const r = await fetch(`${base}${path}`);
    check(r.ok && (await r.text()).includes(env.IMPRINT_NAME), `${path} must render runtime configuration`);
  }
  const session = await fetch(`${base}/api/auth/get-session`);
  // Better Auth 1.2.5 returns an empty JSON response for anonymous sessions.
  const sessionBody = await session.text();
  check(session.status === 200 && ['', 'null'].includes(sessionBody.trim()), 'Anonymous Better Auth session failed');
  const protectedPage = await fetch(`${base}/protected/settings`, { redirect: 'manual' });
  check([302,307].includes(protectedPage.status) && protectedPage.headers.get('location')?.includes('/login'), 'Protected page must redirect');
  const home = await fetch(base);
  const html = await home.text();
  check(home.ok, 'Homepage failed');
  const asset = html.match(/src="([^\"]*\/_next\/static\/[^\"]+\.js)"/)?.[1];
  check(asset && (await fetch(new URL(asset, base))).ok, 'Next.js static assets must be served');
  console.log('Image smoke test passed: database startup, auth, redirects, runtime legal details, assets, non-root user.');
} catch (error) {
  // Only disposable test credentials are used in these logs.
  try { console.error(docker('logs', `${prefix}-app`)); } catch { /* container may not exist */ }
  throw error;
} finally {
  for (const name of [`${prefix}-app`, `${prefix}-db`]) { try { docker('rm', '-f', name); } catch { /* already removed */ } }
  try { docker('network', 'rm', prefix); } catch { /* network may not exist */ }
}
