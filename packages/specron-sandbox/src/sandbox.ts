import * as ganache from 'ganache-cli';

/**
 * Sandbox server for testing Ethereum code.
 */
export class Sandbox {
  protected server: any;

  /**
   * Starts the server.
   */
  public async listen(port = 8545, host = '127.0.0.1') {
    await new Promise((resolve, reject) => {
      this.server = ganache.server();
      this.server.listen(port, host, (e) => e ? reject(e) : resolve());
    });
  }

  /**
   * Stops the server.
   */
  public async close () {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }

}
