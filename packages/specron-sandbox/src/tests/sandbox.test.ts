import test from 'ava';
import * as request from 'supertest';
import { Sandbox } from '../sandbox';

const sandbox = new Sandbox();

test.before(async () => {
  await sandbox.listen(8911);
})
test.after(async () => {
  sandbox.close();
});

test('listens for requests', async (t) => {
  const res = await request('http://localhost:8911')
    .get('/')
    .catch((e) => e.response);
  t.is(res.status, 400);
});
