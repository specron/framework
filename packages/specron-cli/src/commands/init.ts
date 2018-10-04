import * as inquirer from 'inquirer';
import { Generator } from '@specron/init';
import { Printer } from '@hayspec/reporter';
import { getConfig } from '../lib/env';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const config = getConfig(argv);
  const root = process.cwd();
  const printer = new Printer();
  
  let answers = {};
  if (!(config.name && config.description)) {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Project name:",
        default: config.name || 'myproject',
      },
      {
        type: 'input',
        name: 'description',
        message: "Project description:",
        default: config.description || '.',
      },
    ]);
  } else {
    answers = {
      name: config.name,
      description: config.description,
    };
  }
  
  const generator = new Generator({
    root,
    name: (answers['name'] || process.cwd().split(/\\|\//).reverse()[0]).toLowerCase(),
    description: answers['description'],
  });
  try {
    await generator.build();

    printer.end(
      printer.indent(1, ''),
      `Continue by running the commands below:`
    );
    printer.end(
      printer.indent(2, ''),
      printer.colorize('gray', `$ npm install`)
    );
    printer.end(
      printer.indent(2, ''),
      printer.colorize('gray', `$ npm test`)
    );
    printer.end();

  } catch (e) {
    console.error(e);
  }
}
