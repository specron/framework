import test from 'ava';
import * as util from 'util';
import * as cproc from 'child_process';

const exec = util.promisify(cproc.exec);

// test('starts sandbox server', async (t) => {
//   const command = `./bin/specron sandbox --port 8546 --host 127.0.0.1 --ttl 1000`;
//   const { stdout, stderr } = await exec(command);
//   t.true(stdout.indexOf('127.0.0.1:8546') !== -1);
//   t.true(stderr === '');
// });

// test('initializes current folder', async (t) => {
//   const cwd = `./node_modules/.tmp/init-${Date.now()}`;
//   const command = `mkdir -p ${cwd}; cd ${cwd}; ../../../bin/specron init --name foo --description bar`;
//   const { stdout, stderr } = await exec(command);
//   t.true(stdout.indexOf('Continue by running the commands below:') !== -1);
//   t.true(stderr === '');
// });

// test('compiles smart contracts', async (t) => {
//   const dist = `./node_modules/.tmp/compile-${Date.now()}`;
//   const command = `./bin/specron compile --match ./src/tests/assets/*.sol --build ${dist}`;
//   const { stdout, stderr } = await exec(command);
//   t.true(stdout.indexOf('Contracts') !== -1);
//   t.true(stderr === '');
// });

// test('runs tests', async (t) => {
//   const command = `./bin/specron test --match ./src/tests/assets/*.ts --require ts-node/register`;
//   const { stdout, stderr } = await exec(command);
//   t.true(stdout.indexOf('src/tests/assets/foo.hay.ts') !== -1);
//   t.true(stderr === '');
// });

test('foo', async (t) => {
  t.true(true);
});
