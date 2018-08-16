import * as solc from 'solc';
import * as fs from 'fs';
import * as fsx from 'fs-extra';
import * as pth from 'path';
import * as glob from 'fast-glob';
import { SolcInput, SolcOutput } from '../lib/solc';
import { DefaultReporter } from './reporter';

/**
 * Solidity compiler configuration object.
 */
export interface CompilerRecipe extends SolcInput {
  cwd?: string;
  reporter?: DefaultReporter;
}

/**
 * Solidity compiler.
 */
export class Compiler {
  protected reporter: DefaultReporter;
  public cwd: string;
  public input: SolcInput;
  public output: SolcOutput = {};
  
  /**
   * Class constructor.
   * @param recipe Compiler configuration object.
   */
  public constructor(recipe?: CompilerRecipe) {
    this.input = {
      sources: {
        ...(recipe ? recipe.sources : {}),
      },
      language: recipe && recipe.language ? recipe.language : 'Solidity',
      settings: {
        evmVersion: 'byzantium',
        outputSelection: {
          '*': {
            '*': [
              'abi', 'ast', 'legacyAST', 'devdoc', 'userdoc', 'metadata', 
              'ir', 'evm', 'evm.assembly', 'evm.legacyAssembly', 'evm.bytecode',
              'evm.bytecode.object', 'evm.bytecode.opcodes', 'evm.bytecode.sourceMap',
              'evm.bytecode.linkReferences', 'evm.deployedBytecode', 'evm.methodIdentifiers',
              'evm.gasEstimates', 'ewasm', 'ewasm.wast', 'ewasm.wasm'
            ],
          },
        },
        ...(recipe ? recipe.settings : {}),
      },
    };
    this.cwd = recipe && recipe.cwd ? recipe.cwd : process.cwd();
    this.reporter = recipe && recipe.reporter ? recipe.reporter : null;
  }

  /**
   * Loads sources by pattern.
   * @param patterns File search patterns.
   */
  public source(...patterns: string[]) {
    const files = glob.sync(patterns, { cwd: this.cwd })
      .map((f) => f.toString());
 
    files.forEach((file) => {
      file = this.normalizePath(file);
      this.input.sources[file] = {
        content: fs.readFileSync(file).toString(),
      };
    });

    return Object.keys(this.input.sources).length;
  }

  /**
   * Compiles the solc input and memorizes the output.
   */
  public compile() {
    if (this.reporter) {
      this.reporter.onCompileStart(this);
    }

    const importer = (file: string) => {
      file = this.normalizePath(file);
      return {
        contents: fs.readFileSync(file).toString(),
      };
    };
    const input = JSON.stringify(this.input);

    this.output = JSON.parse(
      solc.compileStandardWrapper(input, importer)
    );

    if (this.reporter) {
      this.reporter.onCompileEnd(this);
    }

    return !Array.isArray(this.output.errors);
  }

  /**
   * Saves memoried compiler output to destination folder.
   * @param dist Destination folder.
   */
  public save(dist: string) {
    if (this.reporter) {
      this.reporter.onSaveStart(this);
    }

    const target = pth.resolve(this.cwd, dist);
    fsx.ensureDirSync(target);

    let count = 0;
    Object.keys(this.output.contracts || {}).forEach((file) => {
      const sourcePath = this.normalizePath(file);

      const isModule = sourcePath.indexOf('./node_modules') === 0;
      if (isModule) {
        return;
      }

      const fileName = pth.basename(sourcePath);
      const contractName = fileName.split('.').slice(0, -1).join('.');
      const destPath = pth.join(target, `${contractName}.json`);

      const json = this.output.contracts[file];
      Object.keys(json).forEach((contract) => {
        if (json[contract].metadata) {
          json[contract].metadata = JSON.parse(json[contract].metadata);
        }
      });

      const data = JSON.stringify(json, null, 2);
      fs.writeFileSync(destPath, data);

      count++;
    });

    if (this.reporter) {
      this.reporter.onSaveEnd(this);
    }

    return count;
  }

  /**
   *
   */
  public clear() {
    this.output = {};
    return this;
  }

  /**
   * Converts a file path not starting with a dot to match node_modules.
   * @param path File path
   */
  protected normalizePath(path: string) {
    return path.indexOf('./') !== 0 ? `./node_modules/${path}` : path;
  }

}
