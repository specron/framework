import { Spec } from '../..';

const spec = new Spec();

spec.test('provides assert', (ctx) => {
  ctx.true(true);
});

spec.test('provides web3', async (ctx) => {
  const accounts = await ctx.stage.web3.eth.getAccounts();
  ctx.is(accounts[0].substr(0, 2), '0x');
});

export default spec;
