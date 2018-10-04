import { Compiler, DefaultReporter } from '@specron/compiler';
import { getConfig } from '../lib/env';

/**
 * Compiles solidity contracts.
 */
export default async function (argv) {
  const confog = getConfig(argv);

  const compiler = new Compiler({
    reporter: new DefaultReporter(confog.compiler.severities),
  });
  compiler.source(...confog.compiler.match);
  compiler.compile();
  compiler.save(confog.compiler.build);
}
