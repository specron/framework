import test from 'ava';
import * as glob from 'fast-glob';
import { Flattener } from '..';

test('adds new source files', (t) => {
  const flattener = new Flattener();
  flattener.source('./src/tests/assets/*.sol');
  t.deepEqual(flattener.sources, [
    './src/tests/assets/token-a.sol',
    './src/tests/assets/token-b.sol',
    './src/tests/assets/token-c.sol',
  ]);
});

test('flattens source files', (t) => {
  const flattener = new Flattener();
  flattener.source('./src/tests/assets/*.sol');
  flattener.flatten();
  const files = Object.keys(flattener.output.sources);
  t.deepEqual(files, [
    './src/tests/assets/token-a.sol',
    './src/tests/assets/token-b.sol',
    './src/tests/assets/token-c.sol',
  ]);
});

test('saves flattened sources to destination', (t) => {
  const flattener = new Flattener();
  flattener.source('./src/tests/assets/*.sol');
  flattener.flatten();
  flattener.save('./build/bar');
  const files = glob.sync('./build/bar/*.sol') as string[];
  t.deepEqual(files, [
    './build/bar/token-a.sol',
    './build/bar/token-b.sol',
    './build/bar/token-c.sol',
  ]);
});
