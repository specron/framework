import test from 'ava';
import * as init from '..';

test('exposes Generator class', async (t) => {
  t.true(!!init.Generator);
});
