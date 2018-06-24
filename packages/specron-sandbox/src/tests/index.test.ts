import test from 'ava';
import * as sandbox from '..';

test('exposes Sandbox class', async (t) => {
  t.true(!!sandbox.Sandbox);
});
