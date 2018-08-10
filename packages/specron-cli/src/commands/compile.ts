import { Compiler, DefaultReporter } from '@specron/compiler';

/**
 * Compiles solidity contracts.
 */
export default async function (argv) {
  const { match, build } = argv;

  const compiler = new Compiler({
    reporter: new DefaultReporter(),
  });
  compiler.source(...match);
  compiler.compile();
  compiler.save(build);
}
