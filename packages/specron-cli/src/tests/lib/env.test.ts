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
      evmVersion: 'constantinople',
    },
    flattener: {
      build: './build',
      match: ['./src/**/*.sol'],
      severities: ['error', 'warning'],
    },
    settings: {
      optimization: 200,
    },
    sandbox: {
      port: 8545,
      ttl: 0,
    },
    test: {
      server: true,
      port: 8545,
      match: ['./src/**/*.hay.*'],
      blockTime: null,
      coverage: false,
    },
    require: ['ts-node/register'],
  });
});

test('method `getConfig` merges received configuration', async (t) => {
  t.deepEqual(getConfig({
    match: ['foo'],
    port: 100,
    require: ['bar'],
    blockTime: 1,
    optimization: 0,
  }), {
    name: '',
    description: '',
    compiler: {
      build: './build',
      match: ['foo'],
      severities: ['error', 'warning'],
      evmVersion: 'constantinople',
    },
    flattener: {
      build: './build',
      match: ['foo'],
      severities: ['error', 'warning'],
    },
    settings: {
      optimization: 0,
    },
    sandbox: {
      port: 100,
      ttl: 0,
    },
    test: {
      server: true,
      port: 100,
      match: ['foo'],
      blockTime: 1,
      coverage: false,
    },
    require: ['bar'],
  });
});
