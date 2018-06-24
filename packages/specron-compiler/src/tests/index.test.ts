import test from 'ava';
import * as compiler from '..';

test('exposes Compiler class', async (t) => {
  t.is(!!compiler.Compiler, true);
});
