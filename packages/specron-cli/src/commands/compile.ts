import { Compiler } from '@specron/compiler';

/**
 * Compiles solidity contracts.
 */
export default async function (argv) {
  const { match, build } = argv;

  const compiler = new Compiler();
  try {
    console.log('Compiling contracts ...',);
    compiler.require(...match);
    compiler.save(build);
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
}
