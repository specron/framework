import { Printer } from '@hayspec/reporter';
import { Compiler } from './compiler';

/**
 * 
 */
export type Severity = 'error' | 'warning';

/**
 * 
 */
export class DefaultReporter {
  protected printer: Printer;
  protected severities: Severity[];
  public constructor(severities?: Severity[]) {
    this.printer = new Printer();
    this.severities = severities || ['error', 'warning'];
  }

  /**
   * 
   */
  public onCompileStart(compiler: Compiler) {
    this.printer.end('');
  }

  /**
   * 
   */
  public onCompileEnd(compiler: Compiler) {
    if (compiler.output.errors) {
      this.onErrors(compiler);
    }
  }

  /**
   * 
   */
  public onSaveStart(compiler: Compiler) {
    if (!compiler.output.errors) {
      this.onContracts(compiler);
    }
  }

  /**
   * 
   */
  public onSaveEnd(compiler: Compiler) {
    this.onOverview(compiler);
    this.printer.end('');
  }

  /**
   * 
   */
  protected onErrors(compiler: Compiler) {
    
    this.severities.forEach((severity) => {
      const failures = compiler.output.errors
        .filter((e) => e.severity === severity);
      
      if (failures.length) {
        this.printer.end(
          this.printer.indent(1, ''),
          severity === 'error' ? 'Errors' : 'Warnings'
        );

        failures.filter((e) => e.formattedMessage).forEach((failure) => {
          const color = this.getErrorColor(failure);
          this.printer.end(
            this.printer.indent(2, ''),
            this.printer.colorize(color, failure.formattedMessage.trim())
          );
        });
      }
    });
  }

  /**
   * 
   */
  protected onContracts(compiler: Compiler) {
    const contracts = Object.keys(compiler.output.contracts || {});

    if (contracts.length) {
      this.printer.end(
        this.printer.indent(1, ''),
        'Contracts'
      );
      contracts.forEach((contract) => {
        this.printer.end(
          this.printer.indent(2, ''),
          this.printer.colorize('gray', contract)
        );
      });
    }
  }

  /**
   * 
   */
  protected onOverview(compiler: Compiler) {
    this.printer.end();

    const messages = [];

    const contracts = Object.keys(compiler.output.contracts || {}).length;
    if (contracts) {
      messages.push(
        this.printer.indent(1, ''),
        this.printer.colorize('greenBright', contracts),
        ' contracts',
      );
    }

    if (this.severities.indexOf('error') !== -1) {
      const errors = (compiler.output.errors || []).filter((e) => e.severity === 'error').length;

      if (errors) {
        messages.push(
          this.printer.indent(1, ''),
          this.printer.colorize('redBright', errors),
          ' errors',
        );
      }
    }

    if (this.severities.indexOf('warning') !== -1) {
      const warnings =  (compiler.output.errors || []).filter((e) => e.severity === 'warning').length;

      if (warnings) {
        messages.push(
          this.printer.indent(1, ''),
          this.printer.colorize('yellowBright', warnings),
          ' warnings',
        );
      }
    }
    if (messages.length) {
      this.printer.end(...messages);
    }
  }

   /**
   * 
   */
  protected getErrorColor(error: any) {
    if (error.severity === 'error') {
      return 'redBright';
    } else {
      return 'yellowBright';
    }
  }
}


