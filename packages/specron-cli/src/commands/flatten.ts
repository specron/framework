import { Flattener, DefaultReporter } from '@specron/flattener';
import { getConfig } from '../lib/env';

/**
 * Compiles Solidity contracts.
 */
export default async function (argv) {
  const config = getConfig(argv);

  const flattener = new Flattener({
    reporter: new DefaultReporter(config.flattener.severities),
  });
  flattener.source(...config.flattener.match);

  try {
    await flattener.flatten();
    flattener.save(config.flattener.build);
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(2);
  }
}
