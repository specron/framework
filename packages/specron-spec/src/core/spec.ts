import { Spec as SpecBase } from '@hayspec/core';
import { DefaultReporter } from '@hayspec/reporter';
import { Stage } from './stage';
import { Context } from './context';
import * as Web3 from 'web3';

/**
 * 
 */
type ContextHandler<Data> = (context: Context<Data>, stage: Stage<Data>) => (void | Promise<void>);

/**
 * 
 */
export class Spec<Data = {}, Web3 = {}> extends SpecBase<Data> {
  public stage: Stage<Data>;

  /**
   * 
   */
  public constructor(stage?: Stage<Data>, parent?: Spec<Data>) {
    super(stage, parent);
  }

  /**
   * 
   */
  public test(message: string, handler: ContextHandler<Data>) {
    return super.test(message, handler);
  }

  /**
   * 
   */
  public skip(message: string, handler?: ContextHandler<Data>) {
    return super.skip(message, handler);
  }

  /**
   * 
   */
  protected createStage() {
    const web3 = new (Web3 as any)('http://localhost:8545');
    const reporter = new DefaultReporter();
    return new Stage<Data>(web3, reporter);
  }

  /**
   * 
   */
  protected createContext() {
    return new Context<Data>(this.stage);
  }

}
