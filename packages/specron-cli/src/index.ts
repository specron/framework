import * as yargs from 'yargs';
import initHandler from './commands/init';
import sandboxHandler from './commands/sandbox';
import compileHandler from './commands/compile';
import testHandler from './commands/test';

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
      default: ['./src/**/*.sol'],
    })
    .option('build', {
      string: true,
      description: 'Build folder path',
      default: './build',
    })
    .option('severities', {
      array: true,
      description: 'Toggle error and warnings visibility',
      default: ['error', 'warning'],
    }),
    compileHandler)
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
      default: 8545,
    })
    .option('host', {
      string: true,
      description: 'Server host name',
      default: 'localhost',
    })
    .option('ttl', {
      string: true,
      description: 'TTL after the server is shutdown',
    }),
    sandboxHandler)
  .command('test', 'Runs tests', (yargs) => yargs
    .option('match', {
      array: true,
      description: 'Match pattern',
      default: ['./src/**/*.test.*'],
    })
    .option('require', {
      array: true,
      description: 'Require dependencies',
    })
    .option('server', {
      boolean: true,
      description: 'Start sandbox server',
      default: 8545,
    })
    .option('port', {
      number: true,
      description: 'Server port number',
      default: 8545,
    })
    .option('host', {
      string: true,
      description: 'Server host name',
      default: 'localhost',
    }),
    testHandler)
  .epilog('Copyright © Xpepermint 2018.')
  .help()
  .version();

/**
 * Upgrading environment.
 */
if (Array.isArray(argv.require)) {
  argv.require.forEach((v) => require(v));
}
