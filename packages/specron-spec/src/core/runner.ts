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
   */
  protected async loadSpec(file: string) {
    const spec = require(file);

    if (spec instanceof Spec) {
      this.results.push({ file, spec });
    } else if (spec.default instanceof Spec) {
      this.results.push({ file, spec: spec.default });
    }
  }

}
