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
 * Returns the first value of an arraye.
 */
export function getFirstValue(...values) {
  return values.filter((v) => typeof v !== 'undefined')[0];
}

/**
 * Returns Specron options.
 */
export function getConfig(argv?: any) {
  const defaults = {
    compiler: {},
    flattener: {},
    settings: {},
    sandbox: {},
    test: {},
    require: [],
    ...getPackage()['specron'],
  };
  const custom = argv || {};

  return {
    name: getFirstValue(custom['name'], defaults['name'], ''),
    description: getFirstValue(custom['description'], defaults['description'], ''),
    compiler: {
      build: getFirstValue(custom['build'], defaults['compiler']['build'], './build'),
      match: getFirstValue(custom['match'], defaults['compiler']['match'], []),
      severities: getFirstValue(custom['severities'], defaults['compiler']['severities'], ['error', 'warning']),
      evmVersion: getFirstValue(custom['evmVersion'], defaults['compiler']['evmVersion'], 'constantinople'),
    },
    flattener: {
      build: getFirstValue(custom['build'], defaults['flattener']['build'], './build'),
      match: getFirstValue(custom['match'], defaults['flattener']['match'], []),
      severities: getFirstValue(custom['severities'], defaults['flattener']['severities'], ['error', 'warning']),
    },
    settings: {
      optimization: getFirstValue(custom['optimization'], defaults['compiler']['optimization'], 200),
    },
    sandbox: {
      port: getFirstValue(custom['port'], defaults['sandbox']['port'], 8545),
      ttl: getFirstValue(custom['ttl'], defaults['sandbox']['ttl'], 0),
    },
    test: {
      server: custom['server'] !== false && defaults['test']['server'] !== false,
      port: getFirstValue(custom['port'], defaults['test']['port'], 8545),
      match: getFirstValue(custom['match'], defaults['test']['match'], []),
      blockTime: getFirstValue(custom['blockTime'], defaults['test']['blockTime'], null),
      coverage: custom['coverage'] === true || defaults['test']['coverage'] === true,
    },
    require: getFirstValue(custom['require'], defaults['require'], []),
  };
}
