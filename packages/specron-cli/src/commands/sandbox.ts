import { Sandbox } from '@specron/sandbox';

/**
 * Starts Ethereum sandbox server.
 */
export default async function (argv) {
  const { port, host, ttl } = argv;

  const sandbox = new Sandbox();
  try {
    await sandbox.listen(port, host);
    console.log(`Listening at ${host}:${port} ...`);
  } catch (e) {
    console.error(e);
  }

  if (ttl) {
    setTimeout(() => sandbox.close(), ttl);
  }
}
