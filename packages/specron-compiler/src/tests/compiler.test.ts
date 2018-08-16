import test from 'ava';
import * as glob from 'fast-glob';
import { Compiler } from '..';

test('adds new source files', (t) => {
  const compiler = new Compiler();
  compiler.source('./src/tests/assets/*.sol');
  const files = Object.keys(compiler.input.sources);
  t.deepEqual(files, [
    './src/tests/assets/token-a.sol',
    './src/tests/assets/token-b.sol',
    './src/tests/assets/token-c.sol',
  ]);
});

test('compiles source files', (t) => {
  const compiler = new Compiler();
  compiler.source('./src/tests/assets/*.sol');
  compiler.compile();
  const contracts = Object.keys(compiler.output.contracts);
  t.deepEqual(contracts, [
    './src/tests/assets/token-a.sol',
    './src/tests/assets/token-b.sol',
    './src/tests/assets/token-c.sol',
    '@0xcert/ethereum-utils/contracts/math/SafeMath.sol',
  ]);
});

test('saves compiled sources to destination', async (t) => {
  const compiler = new Compiler();
  compiler.source('./src/tests/assets/*.sol');
  compiler.compile();
  compiler.save('./build/foo');
  const files = glob.sync('./build/foo/*.json') as string[];
  t.deepEqual(files, [
    './build/foo/token-a.json',
    './build/foo/token-b.json',
    './build/foo/token-c.json',
  ]);
});
