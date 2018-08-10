import test from 'ava';
import * as glob from 'fast-glob';
import { Compiler } from '..';

test('adds new source files', (t) => {
  const compiler = new Compiler();
  compiler.source('./src/tests/assets/*.sol');
  const files = Object.keys(compiler.input.sources);
  t.deepEqual(files, [
    './src/tests/assets/Token1.sol',
    './src/tests/assets/Token2.sol',
  ]);
});

test('compiles source files', (t) => {
  const compiler = new Compiler();
  compiler.source('./src/tests/assets/*.sol');
  compiler.compile();
  const contracts = Object.keys(compiler.output.contracts);
  t.deepEqual(contracts, [
    './src/tests/assets/Token1.sol',
    './src/tests/assets/Token2.sol',
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
    './build/foo/Token1.json',
    './build/foo/Token2.json',
  ]);
});
