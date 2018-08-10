import * as inquirer from 'inquirer';
import { Generator } from '@specron/init';
import { Printer } from '@hayspec/reporter';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { name, description } = argv;
  const root = process.cwd();
  const printer = new Printer();
  
  let answers = {};
  if (!(name && description)) {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Project name:",
        default: name || 'myproject',
      },
      {
        type: 'input',
        name: 'description',
        message: "Project description:",
        default: description || '.',
      },
    ]);
  } else {
    answers = { name, description };
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
