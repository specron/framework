import { Printer } from '@hayspec/reporter';
import { Flattener } from './flattener';

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
  public onCompileStart(flattener: Flattener) {
    this.printer.end('');
  }

  /**
   * 
   */
  public onCompileEnd(flattener: Flattener) {
    if (flattener.output.errors.length) {
      this.onErrors(flattener);
    }
  }

  /**
   * 
   */
  public onSaveStart(flattener: Flattener) {
    if (!flattener.output.errors.length) {
      this.onContracts(flattener);
    }
  }

  /**
   * 
   */
  public onSaveEnd(flattener: Flattener) {
    this.onOverview(flattener);
    this.printer.end('');
  }

  /**
   * 
   */
  protected onErrors(flattener: Flattener) {
    
    const failures = flattener.output.errors;
  
    if (failures.length) {
      this.printer.end(
        this.printer.indent(1, ''),
        'Errors',
      );

      failures.filter((e) => !!e.message).forEach((failure) => {
        const color = this.getErrorColor(failure);
        this.printer.end(
          this.printer.indent(2, ''),
          this.printer.colorize(color, failure.message.trim())
        );
      });
    }
  }

  /**
   * 
   */
  protected onContracts(flattener: Flattener) {
    const contracts = flattener.sources;

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
  protected onOverview(flattener: Flattener) {
    this.printer.end();

    const messages = [];

    const contracts = Object.keys(flattener.output.sources).length;
    if (contracts) {
      messages.push(
        this.printer.indent(1, ''),
        this.printer.colorize('gray', contracts),
        ' contracts',
      );
    }

    if (this.severities.indexOf('error') !== -1) {
      const errors = (flattener.output.errors || []).length;

      if (errors) {
        messages.push(
          this.printer.indent(1, ''),
          this.printer.colorize('redBright', errors),
          ' errors',
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
