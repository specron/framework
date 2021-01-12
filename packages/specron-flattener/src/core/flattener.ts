import * as glob from 'fast-glob';
import { merge } from 'sol-merger';
import * as fs from 'fs';
import * as pth from 'path';
import * as fsx from 'fs-extra';
import { DefaultReporter } from './reporter';

/**
 * Initializer config recipe.
 */
export interface FlattenerRecipe {
  cwd?: string;
  reporter?: DefaultReporter;
}

/**
 * Initializer config recipe.
 */
export interface FlattenerOutput {
  sources: {[key: string]: string};
  errors: any[];
}

/**
 * Solidity files flattner.
 */
export class Flattener {
  protected reporter: DefaultReporter;
  public cwd: string;
  public sources: string[] = [];
  readonly output: FlattenerOutput;
  protected SPDX_COMMENT_REGEX = /SPDX-License-Identifier: .+/g;

  /**
   * Class constructor.
   * @param recipe Flattener configuration object.
   */
  public constructor(recipe?: FlattenerRecipe) {
    this.cwd = recipe && recipe.cwd ? recipe.cwd : process.cwd();
    this.reporter = recipe && recipe.reporter ? recipe.reporter : null;
    this.output = { sources: {}, errors: [] };
  }

  /**
   * Loads sources by pattern.
   * @param patterns File search patterns.
   */
  public source(...patterns: string[]) {
    const sources = glob.sync(patterns, { cwd: this.cwd })
      .map((f) => f.toString())
      .map((f) => this.normalizePath(f));

    this.sources.push(...sources);
 
    return sources.length;
  }

  /**
   * Merges imports for all the sources and memorizes the output.
   */
  public async flatten() {
    if (this.reporter) {
      this.reporter.onCompileStart(this);
    }

    this.output.errors = [];

    for (const source of this.sources) {
      let running = true;

      while(running) {
        await merge(source).then((c) => {
          const spdxs = c.match(this.SPDX_COMMENT_REGEX);
          if (spdxs && spdxs.length > 0) {
            c = c.replace(this.SPDX_COMMENT_REGEX, '');
            c = `// ${spdxs[0]}\n${c}`;
          }
          this.output.sources[source] = c;
          running = false;
        }).catch((e) => {
          this.output.errors.push(e);
          running = false;
        });
      }
    }

    if (this.reporter) {
      this.reporter.onCompileEnd(this);
    }
    
    return !!this.output.errors.length;
  }

  /**
   * Saves memorized outputs to destination folder.
   * @param dist Destination folder.
   */
  public save(dist: string) {
    if (this.reporter) {
      this.reporter.onSaveStart(this);
    }

    const target = pth.resolve(this.cwd, dist);
    fsx.ensureDirSync(target);

    let count = 0;
    (this.sources || []).forEach((source) => {
      const fileName = pth.basename(source);
      const destPath = pth.join(target, fileName);
      const content = this.output.sources[source];

      fs.writeFileSync(destPath, content);

      count++;
    });

    if (this.reporter) {
      this.reporter.onSaveEnd(this);
    }

    return count;
  }

  /**
   * Reinitializes the class.
   */
  public clear() {
    this.sources = [];
    return this;
  }

  /**
   * Converts a file path not starting with a dot to match node_modules.
   * @param path File path.
   */
  protected normalizePath(path: string) {
    return path.indexOf('./') !== 0 ? `./node_modules/${path}` : path;
  }

}