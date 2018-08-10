import { Sandbox } from '@specron/sandbox';
import { Printer } from '@hayspec/reporter';

/**
 * Starts Ethereum sandbox server.
 */
export default async function (argv) {
  const { port, host, ttl } = argv;
  const printer = new Printer();

  const sandbox = new Sandbox();
  try {
    await sandbox.listen(port, host);
    printer.end();
    printer.end(
      printer.indent(1, ''),
      'Sandbox blockchain'
    );
    printer.end(
      printer.indent(2, ''),
      printer.colorize('gray', `Listening at ${host}:${port} ...`)
    );
    printer.end();
  } catch (e) {
    console.error(e);
  }

  if (ttl) {
    setTimeout(() => sandbox.close(), ttl);
  }
}
