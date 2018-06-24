import * as solc from 'solc';
import * as fs from 'fs';
import * as fsx from 'fs-extra';
import * as pth from 'path';
import * as glob from 'fast-glob';

/**
 *
 */
export interface ContractData {
  contractName: string;
  sourcePath: string;
  abi: any[];
  bytecode: string;
}

/**
 *
 */
export class Compiler {
  protected cwd: string;
  protected contracts: ContractData[] = [];

  /**
   *
   */
  public constructor(cwd?: string) {
    this.cwd = cwd || process.cwd();
  }

  /**
   *
   */
  public require(...patterns: string[]) {
    const files = this.getFiles(patterns);
    const output = this.compileFiles(files);

    for (const key in output.contracts) {
      const data = output.contracts[key];
      const [sourcePath, contractName] = key.split(':');

      this.contracts.push({
        ...data,
        contractName,
        abi: JSON.parse(data.interface),
        sourcePath: pth.resolve(this.normalizePath(sourcePath)),
      });
    }

    return this;
  }

  /**
   *
   */
  public serialize () {
    return JSON.parse(JSON.stringify(this.contracts));
  }

  /**
   *
   */
  public clear () {
    this.contracts = [];
    return this;
  }

  /**
   *
   */
  public save(dist: string) {
    const modulePath = pth.join(this.cwd, 'node_module');
    const targetPath = pth.resolve(this.cwd, dist);

    fsx.ensureDirSync(targetPath);

    this.contracts.forEach((contract) => {
      const isModule = contract.sourcePath.indexOf(modulePath) === 0;
      if (!isModule) {
        const path = pth.join(targetPath, `${contract.contractName}.json`);
        const data = JSON.stringify(contract, null, 2);
        fs.writeFileSync(path, data);
      }
    });
  }

  /**
   *
   */
  protected getFiles(patterns: string[]) {
    return glob.sync(patterns, { cwd: this.cwd }) as string[];
  }

  /**
   *
   */
  protected compileFiles(files: string[]) {
    const sources = {} as any;

    files.forEach((f) => {
      sources[f] = fs.readFileSync(f).toString();
    });

    return solc.compile({ sources }, 1, (path: string) => {
      return {
        contents: fs.readFileSync(this.normalizePath(path)).toString(),
      };
    });
  }

  /**
   *
   */
  protected normalizePath(path: string) {
    return path.indexOf('@') === 0 ? `node_modules/${path}` : path;
  }

}
