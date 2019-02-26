import test from 'ava';
import * as init from '..';

test('exposes interface', async (t) => {
  t.true(!!init.Flattener);
});
