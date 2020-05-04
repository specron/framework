import test from 'ava';
import Web3 from 'web3';
import { Sandbox } from '@specron/sandbox';
import { Context, Stage, Reporter } from '../..';

const web3 = new Web3(Sandbox.createProvider());
const reporter = new Reporter({ mute: true });
const stage = new Stage(web3, reporter);

test('variable `web3` exposes the web3 instance', async (t) => {
  const stage = new Stage(web3, reporter);
  const ctx = new Context(stage);
  t.is(ctx.web3, web3);
});

test('method `deploy` deploys contract from JSON file', async (t) => {
  const stage = new Stage(web3, reporter);
  const ctx = new Context(stage);
  const contact = await ctx.deploy({
    src: './src/tests/assets/scaffold-b.json',
    contract: 'Main',
  });
  
  t.is(contact.instance.options.gas, 6000000);
  t.is(contact.instance.options.from, await stage.web3.eth.getAccounts().then((a) => a[0]));
  
  const res = await contact.instance.methods.test().call();
  t.is(res, '100');
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

test('method `sign` creates a signature and validates it', async (t) => {
  const ctx = new Context(stage);
  const data = web3.utils.randomHex(32);

  const signatureData = await ctx.sign({ data });

  const recover = await ctx.deploy({
    src: './src/tests/assets/scaffold-ecrecover.json',
    contract: 'recoverContract',
  });
  const address = await recover.instance.methods.recover(data, signatureData.r, signatureData.s, signatureData.v).call();
  t.is(address, await stage.web3.eth.getAccounts().then((a) => a[0]));
});

test('method `reverts` asserts that function throws a revert error', async (t) => {
  const ctx = new Context(stage);
  const results = [
    ctx.reverts(() => { throw new Error('revert'); }),
    await ctx.reverts(() => Promise.reject('revert'), 'foo'),
    await ctx.reverts(() => Promise.reject(new Error('revert foo')), 'foo'),
    ctx.reverts(() => { return; }, 'foo'),
    await ctx.reverts(() => Promise.resolve()),
  ];
  t.deepEqual(results, [
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'reverts',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'reverts',
      success: false,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'reverts',
      success: true,
    },
    {
      type: 'AssertionNote',
      message: 'foo',
      assertion: 'reverts',
      success: false,
    },
    {
      type: 'AssertionNote',
      message: null,
      assertion: 'reverts',
      success: false,
    },
  ]);
});
