import { Spec } from './spec';
import * as runner from '@hayspec/runner';

/**
 *
 */
export interface RunnerResult extends runner.RunnerResult {
  spec: Spec;
}

/**
 *
 */
export class Runner extends runner.Runner {
  public results: RunnerResult[] = [];

  /**
   * 
   * NOTE: Due to different NPM package managers, the `instanceof` check my be
   * inconsistent thus the function checks for presence of the `test` method.
   */
  protected loadSpec(file: string) {
    const spec = require(file);

    if (typeof spec.test !== 'undefined') {
      this.results.push({ file, spec });
    } else if (spec.default && typeof spec.default.test !== 'undefined') {
      this.results.push({ file, spec: spec.default });
    }
  }

}
