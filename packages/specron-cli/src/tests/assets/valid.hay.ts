import { Spec } from '@specron/spec';

const spec = new Spec();

spec.test('foo', async (context) => {
  context.true(true);
});

spec.test('bar', async (context) => {
  context.true(true);
  context.true(true);
  context.false(false);
});

export default spec;
