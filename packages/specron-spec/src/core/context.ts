import * as path from 'path';
import { Context as ContextBase } from '@hayspec/core';
import { Stage } from './stage';

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
  public async getAccounts() {
    return this.stage.web3.eth.getAccounts();
  }

  /**
   * 
   */
  public async requireContract(options: {
    src: string;
    args?: any[];
    from?: string;
    gas?: number;
    gasPrice?: number;
  }) {
    const config = {
      args: [],
      from: await this.getAccounts().then((a) => a[0]),
      gas: 3000000,
      gasPrice: 5000000000,
      ...options,
    };
    const src = path.resolve(process.cwd(), options.src);
    const data = require(src);
    const contract = new this.stage.web3.eth.Contract(data.abi);
    const deploy = await contract.deploy({
      data: data.bytecode,
      arguments: config.args,
    }).send({
      from: config.from,
      gas: config.gas,
      gasPrice: config.gasPrice,
    });
    return new this.stage.web3.eth.Contract(
      data.abi,
      deploy.options.address
    );
  }

  /**
   * Transforms an object into web3 tuple type.
   * @param obj Web3 structure as object.
   */
  toTuple(obj) {
    if (!(obj instanceof Object)) {
      return [];
    }
    var output = [];
    var i = 0;
    Object.keys(obj).forEach((k) => {
      if (obj[k] instanceof Object) {
        output[i] = this.toTuple(obj[k]);
      } else if (obj[k] instanceof Array) {
        let j1 = 0;
        let temp1 = [];
        obj[k].forEach((ak) => {
          temp1[j1] = this.toTuple(obj[k]);
          j1++;
        });
        output[i] = temp1;
      } else {
        output[i] = obj[k];
      }
      i++;
    });
    return output;
  }

}
