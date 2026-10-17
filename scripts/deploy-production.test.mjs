import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, preflight, deploy, coolifyRequest } from './deploy-production.mjs';
const env = { COOLIFY_URL: 'https://coolify.example.test', COOLIFY_APP_UUID: 'app123', COOLIFY_API_TOKEN: 'read-write', COOLIFY_DEPLOY_TOKEN: 'deploy-only', DEPLOY_IMAGE: 'ghcr.io/bayerju/ostsee-pegel', DEPLOY_TAG: `sha-${'a'.repeat(40)}` };
const app = { build_pack: 'dockerimage', docker_registry_image_name: env.DEPLOY_IMAGE };
const json = value => new Response(JSON.stringify(value));

test('rejects insecure API URLs and missing deploy credentials', () => {
  validate(env);
  assert.throws(() => validate({...env, COOLIFY_URL:'http://coolify.example.test'}), /HTTPS/);
  assert.throws(() => validate({...env, COOLIFY_DEPLOY_TOKEN:''}), /COOLIFY_DEPLOY_TOKEN/);
});
test('refuses Git builds and unrelated images before modifying Coolify', async t => {
  t.mock.method(globalThis, 'fetch', async () => json({...app, build_pack:'nixpacks'}));
  await assert.rejects(preflight(env), /Docker Image/);
});
test('updates only the image tag and waits with separate deployment credentials', async t => {
  const calls = [];
  const responses = [app, {}, {deployments:[{resource_uuid:'app123', deployment_uuid:'job123'}]}, {status:'in_progress'}, {status:'finished'}];
  t.mock.method(globalThis, 'fetch', async (url, options) => { calls.push({url, options}); return json(responses.shift()); });
  await deploy(env, {pause:async () => {}, attempts:2});
  assert.deepEqual(JSON.parse(calls[1].options.body), {docker_registry_image_name:env.DEPLOY_IMAGE, docker_registry_image_tag:env.DEPLOY_TAG});
  assert.equal(calls[2].options.headers.Authorization, 'Bearer deploy-only');
  assert.equal(calls[3].options.headers.Authorization, 'Bearer read-write');
});
test('failure and timeout are not reported as successful deployments', async t => {
  let responses;
  t.mock.method(globalThis, 'fetch', async () => json(responses.shift()));
  for (const status of ['failed','cancelled','in_progress']) {
    responses = [app, {}, {deployments:[{resource_uuid:'app123', deployment_uuid:'job123'}]}, {status}];
    await assert.rejects(deploy(env, {pause:async () => {}, attempts:1}), /failed|cancelled|Timed out/);
  }
});
test('API errors do not expose response bodies', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('secret-value', {status:403}));
  await assert.rejects(coolifyRequest(env, '/applications'), error => error.message.includes('403') && !error.message.includes('secret-value'));
});
