import { DefaultReporter } from "@hayspec/reporter";
import * as core from "@hayspec/spec";
import tuple from '../methods/tuple';
import { SignatureKind } from "./types";
import sign from "../methods/sign";

/**
 * 
 */
export class Stage<Data = {}> extends core.Stage<Data> {
  public web3: any;

  /**
   * 
   */
  public constructor (web3: any, reporter: DefaultReporter) {
    super(reporter);
    this.web3 = web3;
  }

  /**
   * 
   */
  public set<Key extends string, Value>(k: Key, v: Value) {
    (this.data as any)[k] = v;
  }

  /**
   * 
   */
  public get<Key extends keyof Data>(k: Key) {
    return this.data[k];
  }

  /**
   * 
   */
  public tuple(obj) {
    return tuple(obj);
  }

  /**
   * 
   */
  public async sign(options: {
    data: string;
    kind?: SignatureKind;
    signer?: string;
  }) {
    return sign({
      web3: this.web3,
      signer: options.signer === undefined
        ? await this.web3.eth.getAccounts().then((a) => a[0])
        : options.signer,
      kind: options.kind === undefined 
        ? SignatureKind.ETH_SIGN
        : options.kind,
      ...options,
    });
  }
  
}
