import { Spec } from '@specron/spec';

const spec = new Spec();

spec.test('returns boolean', async (ctx) => {
  const main = await ctx.requireContract({ src: './build/Main.json' });
  const value = await main.methods.works().call();
  ctx.is(value, '100');
});

export default spec;