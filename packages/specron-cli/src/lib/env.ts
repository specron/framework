import * as pt from 'path';

/**
 * Returns package.json data.
 */
export function getPackage() {
  try {
    return require(pt.join(process.cwd(), 'package.json')) || {};
  } catch (e) {
    return {};
  }
}

/**
 * Returns Specron options.
 */
export function getConfig(argv?: any) {
  const defaults = {
    compiler: {},
    sandbox: {},
    test: {},
    require: [],
    ...getPackage()['specron'],
  };
  const custom = argv || {};
  return {
    name: custom['name'] || defaults['name'] || '',
    description: custom['description'] || defaults['description'] || '',
    compiler: {
      build: custom['build'] || defaults['compiler']['build'] || './build',
      match: custom['match'] || defaults['compiler']['match'] || [],
      severities: custom['severities'] || defaults['compiler']['severities'] || ['error', 'warning'],
    },
    sandbox: {
      port: custom['port'] || defaults['sandbox']['port'] || 8545,
      ttl: custom['ttl'] || defaults['sandbox']['ttl'] || 0,
    },
    test: {
      server: custom['server'] !== false && defaults['test']['server'] !== false,
      port: custom['port'] || defaults['test']['port'] || 8545,
      match: custom['match'] || defaults['test']['match'] || [],
      blockTime: custom['blockTime'] || defaults['test']['blockTime'] || null,
    },
    require: custom['require'] || defaults['require'] || [],
  };
}
