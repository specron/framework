import { Compiler, DefaultReporter, Severity } from '@specron/compiler';

/**
 * Compiles solidity contracts.
 */
export default async function (argv) {
  const { match, build, warnings } = argv;
  const severities : Severity[] = ['error'];
  if(warnings === undefined || warnings) {
    severities.push('warning');
  }

  const compiler = new Compiler({
    reporter: new DefaultReporter(severities),
  });
  compiler.source(...match);
  compiler.compile();
  compiler.save(build);
}
