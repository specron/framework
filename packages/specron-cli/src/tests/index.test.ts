import test from 'ava';
import * as util from 'util';
import * as cproc from 'child_process';

const exec = util.promisify(cproc.exec);

test('starts sandbox server', async (t) => {
  const command = `./bin/specron sandbox --port 8546 --ttl 1000`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('localhost:8546') !== -1);
  t.true(stderr === '');
});

test('initializes current folder', async (t) => {
  const cwd = `./node_modules/.tmp/init-${Date.now()}`;
  const command = `mkdir -p ${cwd}; cd ${cwd}; ../../../bin/specron init --name foo --description bar; echo code: $?`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('Continue by running the commands below:') !== -1);
  t.true(stdout.indexOf('code: 0') !== -1);
  t.true(stderr === '');
});

test('compiles smart contracts', async (t) => {
  const dist = `./node_modules/.tmp/compile-${Date.now()}`;
  const command = `./bin/specron compile --severities error warning --match ./src/tests/assets/*.sol --build ${dist}; echo code: $?`;
  const { stdout, stderr } = await exec(command);
  t.true(stdout.indexOf('Contracts') !== -1);
  t.true(stdout.indexOf('code: 0') !== -1);
  t.true(stderr === '');
});

test.serial('runs valid tests', async (t) => {
  const command = `./bin/specron test --match ./src/tests/assets/valid.hay.ts --require ts-node/register; echo code: $?`;
  const { stdout, stderr } = await exec(command)
  t.true(stdout.indexOf('code: 0') !== -1);
  t.true(stderr === '');
});

test.serial('runs invalid tests', async (t) => {
  const command = `./bin/specron test --match ./src/tests/assets/invalid.hay.ts --require ts-node/register; echo code: $?`;
  const { stdout, stderr } = await exec(command)
  t.true(stdout.indexOf('src/tests/assets/invalid.hay.ts') !== -1);
  t.true(stdout.indexOf('code: 1') !== -1);
  t.true(stderr === '');
});
