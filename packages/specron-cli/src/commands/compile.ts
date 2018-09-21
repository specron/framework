import { Compiler, DefaultReporter } from '@specron/compiler';

/**
 * Compiles solidity contracts.
 */
export default async function (argv) {
  const { match, build, severities } = argv;

  const compiler = new Compiler({
    reporter: new DefaultReporter(severities),
  });
  compiler.source(...match);
  compiler.compile();
  compiler.save(build);
}
