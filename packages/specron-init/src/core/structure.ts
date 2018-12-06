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
      `  "description": "{{ description }}",`,
      `  "version": "0.0.0",`,
      `  "scripts": {`,
      `    "compile": "specron compile",`,
      `    "sandbox": "specron sandbox",`,
      `    "prepare": "specron compile",`,
      `    "test": "specron compile && specron test"`,
      `  },`,
      `  "specron": {`,
      `    "compiler": {`,
      `      "build": "./build",`,
      `      "match": [`,
      `        "./src/**/*.sol"`,
      `      ]`,
      `    },`,
      `    "test": {`,
      `      "match": [`,
      `        "./src/**/*.test.*"`,
      `      ]`,
      `    },`,
      `    "require": [`,
      `      "ts-node/register"`,
      `    ]`,
      `  },`,
      `  "license": "MIT",`,
      `  "dependencies": {`,
      `    "@specron/cli": "latest",`,
      `    "@specron/spec": "latest",`,
      `    "solc": "^0.5.1",`,
      `    "ts-node": "^7.0.1",`,
      `    "typescript": "^3.2.1",`,
      `    "web3": "^1.0.0-beta.36"`,
      `  }`,
      `}`,
    ],
  },
  {
    path: ['src', 'contracts', 'main.sol'],
    content: [
      `pragma solidity ^0.4.25;`,
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
    path: ['src', 'tests', 'main.test.ts'],
    content: [
      `import { Spec } from '@specron/spec';`,
      ``,
      `const spec = new Spec();`,
      ``,
      `spec.test('returns boolean', async (ctx) => {`,
      `  const main = await ctx.deploy({`,
      `    src: './build/main.json',`,
      `    contract: 'Main',`,
      `  });`,
      `  const value = await main.instance.methods.works().call();`,
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
