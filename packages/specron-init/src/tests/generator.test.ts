import test from 'ava';
import * as fsx from 'fs-extra';
import * as path from 'path';
import { Generator } from '..';

test('builds project structure', async (t) => {
  const root = path.join('node_modules', `.test${Date.now()}`);
  const generator = new Generator({
    root: root,
    name: '18sb3h301',
    description: '8f3nh19831',
  });
  await generator.build();
  const pkg = path.join(root, 'package.json');
  const src = await fsx.readFile(pkg);
  t.is(src.indexOf('"18sb3h301"') !== 0, true); // replaced variable
  t.is(src.indexOf('"8f3nh19831"') !== 0, true); // replaced variable
});
