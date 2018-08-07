import test from 'ava';
import tuple from '../../methods/tuple';

test('transforms an object to tuple', async (t) => {
  const res = tuple({
    foo: "FOO",
    bar: ["BAR1", "BAR2"],
    baz: {
      bazfoo: [1, 2],
      bazbar: 'BAZBAR',
    },
    zed: [
      {
        zedfoo: [1, 2],
        zedbar: 'BAZBAR',
      }
    ]
  });
  t.deepEqual(res, [
    "FOO",
    ["BAR1", "BAR2"],
    [[1, 2], 'BAZBAR'],
    [[[1, 2], 'BAZBAR']],
  ]);
});
