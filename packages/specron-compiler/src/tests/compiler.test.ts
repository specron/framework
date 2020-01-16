import test from 'ava';
import * as glob from 'fast-glob';
import { Compiler } from '..';

test('adds new source files', async (t) => {
  const compiler = new Compiler();
  await compiler.source('./src/tests/assets/*.sol');
  const files = Object.keys(compiler.input.sources);
  t.deepEqual(files, [
    './src/tests/assets/token-a.sol',
    './src/tests/assets/token-b.sol',
    './src/tests/assets/token-c.sol',
  ]);
});

test('compiles source files', async (t) => {
  const compiler = new Compiler();
  await compiler.source('./src/tests/assets/*.sol');
  await compiler.compile();
  const contracts = Object.keys(compiler.output.contracts);
  t.deepEqual(contracts, [
    './src/tests/assets/token-a.sol',
    './src/tests/assets/token-b.sol',
    './src/tests/assets/token-c.sol',
  ]);
});

test('cleans compiled output', async (t) => {
  const compiler = new Compiler();
  await compiler.source('./src/tests/assets/*.sol');
  await compiler.compile();
  compiler.clean();
  Object.keys(compiler.output.contracts).forEach((element) => {
    t.is(Object.keys(compiler.output.contracts[element]).length, 1);
  });
});

test('saves compiled sources to destination', async (t) => {
  const compiler = new Compiler();
  await compiler.source('./src/tests/assets/*.sol');
  await compiler.compile();
  compiler.save('./build/foo');
  const files = glob.sync('./build/foo/*.json') as string[];
  t.deepEqual(files, [
    './build/foo/token-a.json',
    './build/foo/token-b.json',
    './build/foo/token-c.json',
  ]);
});
