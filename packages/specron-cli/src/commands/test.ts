import { Runner, Spec, Stage, Reporter } from '@specron/spec';
import { Sandbox } from '@specron/sandbox';
import * as Web3 from 'web3';
import { getConfig } from '../lib/env';

/**
 * Runs tests.
 */
export default async function (argv) {
  const config = getConfig(argv);

  const sandbox = new Sandbox();
  const web3 = new (Web3 as any)(`http://${config.test.host}:${config.test.port}`);
  const reporter = new Reporter();
  const stage = new Stage(web3, reporter);
  const test = new Spec(stage);

  if (config.test.server) {
    await sandbox.listen(config.test.port, config.test.host);
  }

  const runner = new Runner();
  await runner.require(...config.test.match);
  runner.results.forEach((result) => {
    const message = result.file.substr(process.cwd().length + 1);
    test.spec(message, result.spec);
  });

  try {
    await test.perform();
  } catch (e) {
    console.log(e);
    process.exit(2);
  }

  if (config.test.server) {
    await sandbox.close();
  }

  process.exit(reporter.failedCount ? 1 : 0);
}
