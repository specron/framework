import { Printer } from '@hayspec/reporter';
import { Compiler } from './compiler';

/**
 * 
 */
export class DefaultReporter {
  protected printer: Printer = new Printer();

  /**
   * 
   */
  public onCompileStart(compiler: Compiler) {
    this.printer.end('');
    this.onSources(compiler);
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
  protected onSources(compiler: Compiler) {
    const sources = Object.keys(compiler.input.sources || {});

    if (sources.length) {
      this.printer.end(
        this.printer.indent(1, ''),
        'Sources'
      );
      sources.forEach((source) => {
        this.printer.end(
          this.printer.indent(2, ''),
          this.printer.colorize('gray', source),
        );
      });
    }
  }

  /**
   * 
   */
  protected onErrors(compiler: Compiler) {
    const errors = compiler.output.errors;

    if (errors && errors.length) {
      this.printer.end(
        this.printer.indent(1, ''),
        'Errors'
      );
      errors.filter((e) => e.formattedMessage).forEach((error) => {
        const color = this.getErrorColor(error);
        this.printer.end(
          this.printer.indent(2, ''),
          this.printer.colorize(color, error.formattedMessage.trim())
        );
      });
    }
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
          this.printer.colorize('gray', `${contract}: ${Object.keys(compiler.output.contracts[contract]).join(', ')}`)
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

    const sources = Object.keys(compiler.input.sources || {}).length;
    const contracts = Object.keys(compiler.output.contracts || {}).length;
    const errors = Object.keys(compiler.output.errors || {}).length;
    if (contracts) {
      messages.push(
        this.printer.indent(1, ''),
        this.printer.colorize('greenBright', contracts),
        ' contracts',
      );
    }
    if (sources) {
      messages.push(
        this.printer.indent(1, ''),
        this.printer.colorize('gray', sources),
        ' sources',
      );
    }
    if (errors) {
      messages.push(
        this.printer.indent(1, ''),
        this.printer.colorize('redBright', errors),
        ' errors',
      );
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
