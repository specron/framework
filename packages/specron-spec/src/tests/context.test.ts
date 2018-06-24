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

test('method `getAccounts` deploys contract from JSON file', async (t) => {
  const ctx = new Context(stage);
  const accounts = await ctx.getAccounts();
  t.true(accounts.length > 0);
});

test('method `requireContract` deploys contract from JSON file', async (t) => {
  const stage = new Stage(web3, reporter);
  const ctx = new Context(stage);
  const contact = await ctx.requireContract({ src: './src/tests/assets/Example.json' });
  const res = await contact.methods.test().call();
  t.is(res, '123457');
});

test('method `toTuple` transforms an object to tuple type', async (t) => {
  const ctx = new Context(stage);
  const tuple = ctx.toTuple({
    foo: "FOO",
    bar: ["BAR1", "BAR2"],
    baz: {
      bazfoo: [1, 2],
      bazbar: 'BAZBAR',
    },
    zed: [
      {
        zedfoo: [1, 2],
        zedbar: 'BAZBAR',
      }
    ]
  });
  t.deepEqual(tuple, [
    "FOO",
    ["BAR1", "BAR2"],
    [[1, 2], 'BAZBAR'],
    [[[1, 2], 'BAZBAR']],
  ]);
});
