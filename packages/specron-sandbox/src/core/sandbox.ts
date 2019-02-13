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
  protected _server: any;
  protected options: SandboxOptions;

  /**
   * Returns and instance of a sandbox provider.
   * @param options Sandbox configuration options.
   */
  public static createProvider(options?: SandboxOptions) {
    const provider = ganache.provider(options);
    provider.setMaxListeners(999999); // hide MaxListenersExceededWarning produced by ganache provider.
    return provider;
  }

  /**
   * Returns and instance of a sandbox server.
   * @param options Sandbox configuration options.
   */
  public static createServer(options?: SandboxOptions) {
    const server = ganache.server(options);
    server.provider.setMaxListeners(999999); // hide MaxListenersExceededWarning produced by ganache provider.
    return server;
  }

  /**
   * 
   * @param options Ganache configuration options.
   */
  public constructor(options?: SandboxOptions) {
    this.options = {
      port: 8545,
      ...options,
    };

    this._server = ganache.server(this.options);
    this._server.provider.setMaxListeners(999999); // hide MaxListenersExceededWarning produced by ganache provider.
  }

  /**
   * Returns Web3 provider instance.
   */
  public get provider() {
    return this.server.provider;
  }

  /**
   * Returns Web3 provider instance.
   */
  public get server() {
    return this._server;
  }

  /**
   * Starts the server.
   */
  public async listen() {

    await new Promise((resolve, reject) => {
      this.server.listen(this.options.port, (e) => e ? reject(e) : resolve());
    });

    return this;
  }

  /**
   * Stops the server.
   */
  public async close () {

    this._server.close();

    return this;
  }

}
