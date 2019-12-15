import * as yargs from 'yargs';
import initHandler from './commands/init';
import sandboxHandler from './commands/sandbox';
import compileHandler from './commands/compile';
import flattenHandler from './commands/flatten';
import testHandler from './commands/test';
import { getConfig } from './lib/env';

/**
 * Interface definition.
 */
const { argv } = yargs
  .usage('Usage: $0 --help')
  .command('compile', 'Compiles solidity contracts', (yargs) => yargs
    .usage('Usage: $0 --match *.sol --build ./build')
    .option('match', {
      array: true,
      description: 'Matching pattern',
    })
    .option('evmVersion', {
      string: true,
      description: 'EVM version which will be used',
    })
    .option('build', {
      string: true,
      description: 'Build folder path',
    })
    .option('severities', {
      array: true,
      description: 'Toggle error and warnings visibility',
    })
    .option('optimization', {
      number: true,
      description: 'Code optimization level',
    }),
    compileHandler)
  .command('flatten', 'Flattens solidity contracts', (yargs) => yargs
    .usage('Usage: $0 --match *.sol --build ./build')
    .option('match', {
      array: true,
      description: 'Matching pattern',
    })
    .option('build', {
      string: true,
      description: 'Build folder path',
    })
    .option('severities', {
      array: true,
      description: 'Toggle error and warnings visibility',
    }),
    flattenHandler)
  .command('init', 'Initializes project directory.',  (yargs) => yargs
    .option('name', {
      string: true,
      description: 'Project name',
    })
    .option('description', {
      string: true,
      description: 'Project description',
    }),
    initHandler)
  .command('sandbox', 'Starts Ethereum sandbox server.', (yargs) => yargs
    .option('port', {
      number: true,
      description: 'Server port number',
    }),
    sandboxHandler)
  .command('test', 'Runs tests', (yargs) => yargs
    .option('match', {
      array: true,
      description: 'Match pattern',
    })
    .option('require', {
      array: true,
      description: 'Require dependencies',
    })
    .option('server', {
      boolean: true,
      description: 'Start sandbox server',
    })
    .option('port', {
      number: true,
      description: 'Server port number',
    })
    .option('blockTime', {
      number: true,
      description: 'Seconds for automatic mining',
    })
    .option('coverage', {
      boolean: false,
      description: 'Test against code-coverage enabled web3 provider',
    }),
    testHandler)
  .epilog('Copyright © Xpepermint 2018.')
  .help()
  .version();

/**
 * Upgrading environment.
 */
getConfig(argv).require.forEach((v) => require(v));
