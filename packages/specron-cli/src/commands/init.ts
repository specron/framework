import * as inquirer from 'inquirer';
import { Generator } from '@specron/init';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { name, description, root } = argv;

  let answers = {};
  if (!(name && description)) {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'root',
        message: "Project root:",
        default: root || '.',
      },
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
    answers = { name, description, root };
  }
  
  const generator = new Generator({
    root: answers['root'],
    name: (answers['name'] || process.cwd().split(/\\|\//).reverse()[0]).toLowerCase(),
    description: answers['description'],
  });
  try {
    console.log(`Initializing ...`);
    await generator.build();
    console.log(`Done`);
  } catch (e) {
    console.error(e);
  }
}
