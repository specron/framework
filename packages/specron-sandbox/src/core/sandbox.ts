import * as ganache from 'ganache-cli';

/**
 * Sandbox configuration options.
 */
export interface SandboxOptions {
  port?: number;
  blockTime?: number;
}

/**
 * Sandbox server for testing Ethereum code.
 */
export class Sandbox {
  protected server: any;

  /**
   * Returns and instance of a sandbox Web3 provider.
   * @param options Sandbox configuration options.
   */
  public static createProvider(options?: SandboxOptions) {
    const provider = ganache.provider(options);
    provider.setMaxListeners(999999); // hide MaxListenersExceededWarning produced by ganache provider.
    return provider;
  }

  /**
   * Starts the server.
   */
  public async listen(port = 8545) {

    await new Promise((resolve, reject) => {
      this.server = ganache.server();
      this.server.listen(port, (e) => e ? reject(e) : resolve());
    });

    return this;
  }

  /**
   * Stops the server.
   */
  public async close () {

    if (this.server) {
      this.server.close();
      this.server = null;
    }

    return this;
  }

}
