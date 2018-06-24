import test from 'ava';
import { Runner } from '..';

test('method `require` loads spec files based on pattern', async (t) => {
  const runner = new Runner();
  await runner.require('./src/tests/assets/*.hay.ts');
  t.is(runner.results.length, 1);
});
