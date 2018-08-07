import test from 'ava';
import { Sandbox } from '@specron/sandbox';
import * as Web3 from 'web3';
import { Context, Stage, Reporter } from '..';

const web3 = new (Web3 as any)('http://localhost:8545') as Web3.default;
const reporter = new Reporter();
const stage = new Stage(web3, reporter);
const sandbox = new Sandbox();

test.before(async () => {
  sandbox.listen(8545);
});

test.after(async () => {
  sandbox.close();
});

test('variable `web3` exposes the web3 instance', async (t) => {
  const stage = new Stage(web3, reporter);
  const ctx = new Context(stage);
  t.is(ctx.web3, web3);
});

test('method `deploy` deploys contract from JSON file', async (t) => {
  const stage = new Stage(web3, reporter);
  const ctx = new Context(stage);
  const contact = await ctx.deploy({ src: './src/tests/assets/Example.json' });
  const res = await contact.methods.test().call();
  t.is(res, '123457');
});

test('method `tuple` transforms an object to tuple type', async (t) => {
  const ctx = new Context(stage);
  const tuple = ctx.tuple({
    foo: "FOO",
  });
  t.deepEqual(tuple, [
    "FOO",
  ]);
});
