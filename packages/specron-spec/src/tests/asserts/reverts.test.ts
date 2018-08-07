import test from 'ava';
import reverts from '../../asserts/reverts';

test('succeeds for values that revert', async (t) => {
  t.true(reverts(() => { throw new Error('revert') }));
  t.true(await reverts(() => Promise.reject('revert')));
});

test('succeeds for values that do not revert', async (t) => {
  t.false(reverts(() => { throw new Error() }));
  t.false(reverts(() => { return; }));
  t.false(await reverts(() => Promise.resolve()));
});
