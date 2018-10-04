import test from 'ava';
import { getConfig } from '../../lib/env';

test('method `getConfig` returns package.json specron configuration', async (t) => {
  t.deepEqual(getConfig(), {
    name: '',
    description: '',
    compiler: {
      build: './build',
      match: ['./src/**/*.sol'],
      severities: ['error', 'warning'],
    },
    sandbox: {
      port: 8545,
      host: 'localhost',
      ttl: 0,
    },
    test: {
      server: true,
      port: 8545,
      host: 'localhost',
      match: ['./src/**/*.hay.*'],
    },
    require: ['ts-node/register'],
  });
});

test('method `getConfig` merges received configuration', async (t) => {
  t.deepEqual(getConfig({
    match: ['foo'],
    host: 'foo',
    port: 100,
    require: ['bar'],
  }), {
    name: '',
    description: '',
    compiler: {
      build: './build',
      match: ['foo'],
      severities: ['error', 'warning'],
    },
    sandbox: {
      port: 100,
      host: 'foo',
      ttl: 0,
    },
    test: {
      server: true,
      port: 100,
      host: 'foo',
      match: ['foo'],
    },
    require: ['bar'],
  });
});
