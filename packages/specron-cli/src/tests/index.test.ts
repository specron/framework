import test from 'ava';
import * as util from 'util';
import * as cproc from 'child_process';

const exec = util.promisify(cproc.exec);

test('starts sandbox server', async (t) => {
  const command = `./bin/specron sandbox --port 8546 --host 127.0.0.1 --ttl 1000`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('127.0.0.1:8546') !== -1);
  t.true(stderr === '');
});

test('initializes current folder', async (t) => {
  const command = `./bin/specron init --name foo --description bar --root ./node_modules/.tmp/${Date.now()}`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('Done') !== -1);
  t.true(stderr === '');
});

test('compiles smart contracts', async (t) => {
  const command = `./bin/specron compile --match ./src/tests/assets/*.sol --build ./node_modules/.tmp/${Date.now()}`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('Done') !== -1);
  t.true(stderr === '');
});

test('runs tests', async (t) => {
  const command = `./bin/specron test --match ./src/tests/assets/*.ts --require ts-node/register`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('src/tests/assets/foo.hay.ts') !== -1);
  t.true(stderr === '');
});
