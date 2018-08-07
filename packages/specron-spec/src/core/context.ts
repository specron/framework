import { Context as ContextBase } from '@hayspec/spec';
import { Stage } from './stage';
import deploy from '../helpers/deploy';
import tuple from '../helpers/tuple';

/**
 * 
 */
export class Context<Data = {}> extends ContextBase<Data> {
  public stage: Stage<Data>;

  /**
   * 
   */
  public constructor(stage: Stage<Data>) {
    super(stage);
  }

  /**
   * 
   */
  public get web3() {
    return this.stage.web3;
  }

  /**
   * 
   */
  public async deploy(options: {
    src: string;
    args?: any[];
    from?: string;
    gas?: number;
    gasPrice?: number;
  }) {
    return deploy({
      web3: this.stage.web3,
      args: [],
      from: await this.stage.web3.eth.getAccounts().then((a) => a[0]),
      gas: 6000000,
      gasPrice: 1,
      ...options,
    });
  }

  /**
   * 
   */
  public tuple(obj) {
    return tuple(obj);
  }

}
