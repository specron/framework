/**
 * File recipe interface.
 */
export interface FileRecipe {
  path: string[];
  content: string[];
}

/**
 * Project files.
 */
export const files = [
  {
    path: ['.gitignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`,
      `dist`,
      `build`,
    ],
  },
  {
    path: ['.npmignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`,
    ],
  },
  {
    path: ['package.json'],
    content: [
      `{`,
      `  "name": "{{ name }}",`,
      `  "version": "0.0.0",`,
      `  "description": "{{ description }}",`,
      `  "scripts": {`,
      `    "compile": "specron compile",`,
      `    "sandbox": "specron sandbox",`,
      `    "prepublishOnly": "specron compile",`,
      `    "test": "specron compile && specron test --require ts-node/register --match ./src/tests/**/*.test.ts"`,
      `  },`,
      `  "license": "MIT",`,
      `  "dependencies": {`,
      `    "@specron/cli": "latest",`,
      `    "@specron/spec": "latest",`,
      `    "ts-node": "^6.1.1",`,
      `    "typescript": "^2.9.1",`,
      `    "web3": "^1.0.0-beta.34"`,
      `  }`,
      `}`,
    ],
  },
  {
    path: ['src', 'contracts', 'Main.sol'],
    content: [
      `pragma solidity ^0.4.24;`,
      ``,
      `contract Main {`,
      ``,
      `  function works()`,
      `    public`,
      `    pure`,
      `    returns (uint256 _value)`,
      `  {`,
      `    _value = 100;`,
      `  }`,
      ``,
      `}`,
    ],
  },
  {
    path: ['src', 'tests', 'Main.test.ts'],
    content: [
      `import { Spec } from '@specron/spec';`,
      ``,
      `const spec = new Spec();`,
      ``,
      `spec.test('returns boolean', async (ctx) => {`,
      `  const main = await ctx.require({ src: './build/Main.json' });`,
      `  const value = await main.methods.works().call();`,
      `  ctx.is(value, '100');`,
      `});`,
      ``,
      `export default spec;`, 
    ],
  },
  {
    path: ['tsconfig.json'],
    content: [
      `{`,
      `  "compilerOptions": {`,
      `    "module": "commonjs",`,
      `    "target": "es6"`,
      `  }`,
      `}`,
    ],
  },
] as FileRecipe[];
