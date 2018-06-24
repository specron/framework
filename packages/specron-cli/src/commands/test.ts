import { Runner, Spec, Stage, Reporter } from '@specron/spec';
import { Sandbox } from '@specron/sandbox';
import * as Web3 from 'web3';

/**
 * Runs tests.
 */
export default async function (argv) {
  const { match, server, host, port } = argv;

  const sandbox = new Sandbox();
  const web3 = new (Web3 as any)('http://localhost:8545');
  const reporter = new Reporter();
  const stage = new Stage(web3, reporter);
  const test = new Spec(stage);

  if (server) {
    await sandbox.listen(port, host);
  }

  const runner = new Runner();
  await runner.require(...match);
  runner.results.forEach((result) => {
    const message = result.file.substr(process.cwd().length + 1);
    test.spec(message, result.spec);
  });
  await test.perform();

  if (server) {
    await sandbox.close();
  }
}
