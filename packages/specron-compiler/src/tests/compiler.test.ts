import test from 'ava';
import * as glob from 'fast-glob';
import { Compiler } from '..';

test('compiles solidity contracts', (t) => {
  const compiler = new Compiler();
  compiler.require('./src/tests/assets/*.sol');
  t.is(compiler.serialize().length, 3);
});

test('saves compiled data as JSON files with ABI/BIN', async (t) => {
  const compiler = new Compiler();
  compiler.require('./src/tests/assets/*.sol');
  compiler.save('./build/foo');
  const files = glob.sync('./build/foo/*.json') as string[];
  t.is(files.length, 2);
});
