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

  try {
    compiler.compile();
    compiler.save(confog.compiler.build);
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(2);
  }
}
