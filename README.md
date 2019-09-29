# Specron Framework

[![Build Status](https://travis-ci.org/specron/framework.svg?branch=master)](https://travis-ci.org/specron/framework)&nbsp;[![codecov](https://codecov.io/gh/specron/framework/branch/master/graph/badge.svg)](https://codecov.io/gh/specron/framework)

Specron is a lightweight, open source, magic-free framework for testing smart contracts written in [solidity](https://solidity.readthedocs.io/en/v0.4.34/). The testing suite is built on top of the [Hayspec framework](https://github.com/specron/framework) thus using [TypeScript](https://www.typescriptlang.org/) is supported.

Specron provides development environment for the Ethereum blockchain and includes useful tools which enable developers to easily write tests for smart contracts.

The source code is available on [GitHub](https://github.com/specron/framework) where you can also find our [issue tracker](https://github.com/specron/framework/issues).

## Installation

Start by installing the Specron command-line tool.

```bash
$ npm install -g @specron/cli web3 solc
```

Specron depends on the latest [web3](https://www.npmjs.com/package/web3) and [solc](https://www.npmjs.com/package/solc) packages, so make sure you have them globally installed. Specron also uses promises thus you need to use [Promise polyfill](https://github.com/taylorhakes/promise-polyfill) when promises are not supported.

## Getting started

Specron automates the testing process of your Solidity code. It doesn't require you to install certain applications in order to get started.

The Specron interface is designed to fully support the power of [TypeScript](https://www.typescriptlang.org/) when writing tests. It is magic-free which means you have a complete control and visibility of what the code does and how tests are executed. The testing flow should look familiar to any JavaScript or TypeScript developer.

### Project initialization

Start by creating a new project folder.

```bash
$ mkdir myproject
$ cd myproject
```

Initialize the project and install the dependencies.

```bash
$ specron init
$ npm install
```

Run tests to verify everything works as expected.

```bash
$ npm test
```

### Writing tests

The core test functionality is provided by the `@specron/spec` module which is automatically attached to your project at initialization. Here we explain some of the main framework features but please explore the source code to find out all the possibilities.

#### Initializing specs

The framework provides a `Spec` class which holds basically the whole testing power. You start your test by creating an instance of that class.

```ts
import { Spec } from '@specron/spec';

const spec = new Spec();
```

#### Testing features

The Spec instance provides methods that you can use when writing tests. Most of the time you will use the `test` method which performs the test you write.

```ts
spec.test('is true', async (ctx) => { // promise | function
  ctx.true(true);
});
```

There is also the `skip` method which prevents a test to be performed, and the `only` method which includes itself into the test process but excludes all other tests.

#### Nested specs

Tests can be nested using the `spec` method.

```ts
const colors = new Spec();
...
spec.spec('colors', colors);
```

#### Using callbacks

The framework provides `before` and `after` methods which are execute at the beginning and at the end of the spec case.

```ts
spec.before((stage) => {
  // execute before all tests
});
...
spec.after((stage) => {
  // execute after all tests
});
```

These methods have access to the `stage` of the spec instance. The stage is global to the whole spec stack which means that all settings are always preserved.

There are also the `beforeEach` and `afterEach` methods which are triggered before and after each test. These methods have access to the `context` and `stage` of the spec. The context represents a copy of a stage and is preserved between `beforeEach`, `test` and `afterEach` methods. This allows for testing atomic tests where a fresh context is always created for each test.

```ts
spec.beforeEach((context, stage) => {
  // execute before all tests
});
...
spec.afterEach((context, stage) => {
  // execute after all tests
});
```
Callback functions can be called multiple times and the execution will happen in a defined sequence.

#### Shared data

The `context` and the `stage` both provide a way to `set` and `get` values with proper TypeScript types.

```ts
interface Data {
  id: number;
  name: string;
}

const spec = new Spec<Data>();

spec.beforeEach((ctx) => {
  ctx.set('id', 100);
  ctx.set('name', 'John');
})

spec.test('is John with id=100', (ctx) => {
  const id = ctx.get('id');
  const name = ctx.get('name');
  ctx.is(id, 100);
  ctx.is(name, 'John');
})
```

Values set inside the `before` and `after` blocks are available to all `spec` methods. Values set in the `beforeEach` and `afterEach` blocks are available only on the context stack of each test.

#### Contract deployment

Stage and context both provide a series of different helper methods.

A very important method is the `deploy()` method which deploys a contract to a local blockchain process in the background and returns a contract instance. 

```ts
const { instance, receipt } = await ctx.deploy({
  src: './contracts.json',
  contract: 'Main',
});
```

### Using CLI

The `@specron/cli` module is automatically installed when you initialize the project. You can interact with the utility using the `npx specron` command in your terminal. 

To get a list of available features use the `--help` flag.

```
$ npx specron --help
```

#### Running tests

Every test file must export the `spec` instance for the CLI to be able to detect the test.

```ts
export default spec;
```

Run the `specron test` command to run tests. Customize the files search by using the `--match` flag.

```
$ npx specron test --match ./**/*.test.*
```

#### TypeScript support

Install the [ts-node](https://www.npmjs.com/package/ts-node) NPM package then use the `--require` flag to enable [TypeScript](https://www.typescriptlang.org/) support.

```
specron --require ts-node/register
```

#### Project configuration

Specron configuration options can be saved inside the package.json file under the the `specron` key.

```json
{
  "specron": {
    "compiler": {
      "build": "./build",
      "match": [
        "./src/**/*.sol"
      ],
      "severities": [
        "error",
        "warning"
      ]
    },
    "flattener": {
      "build": "./build",
      "match": [
        "./src/**/*.sol"
      ],
      "severities": [
        "error",
        "warning"
      ]
    },
    "sandbox": {
      "port": 8545,
      "host": "localhost"
    },
    "test": {
      "server": true,
      "port": 8545,
      "host": "localhost",
      "match": [
        "./src/**/*.test.*"
      ]
    },
    "require": [
      "ts-node/register"
    ]
  }
}
```

Note that these options can be overriden by providing CLI arguments.

### Using continuous integration

For a full example of a Solidity contract repository including continuous integration using Travis and Specron, see https://github.com/xpepermint/specron-example.

## Packages

| Package | Description | Version
|-|-|-
| [@specron/cli](https://github.com/specron/framework/tree/master/packages/specron-cli) | Command-line interface. | [![NPM Version](https://badge.fury.io/js/@specron%2Fcli.svg)](https://badge.fury.io/js/%40specron%2Fcli)
| [@specron/compiler](https://github.com/specron/framework/tree/master/packages/specron-compiler) | Smart contracts compiler. | [![NPM Version](https://badge.fury.io/js/@specron%2Fcompiler.svg)](https://badge.fury.io/js/%40specron%2Fcompiler)
| [@specron/flattener](https://github.com/specron/framework/tree/master/packages/specron-flattener) | Smart contracts flattener. | [![NPM Version](https://badge.fury.io/js/@specron%2Fflattener.svg)](https://badge.fury.io/js/%40specron%2Fflattener)
| [@specron/init](https://github.com/specron/framework/tree/master/packages/specron-init) | Project structure initializer. | [![NPM Version](https://badge.fury.io/js/@specron%2Finit.svg)](https://badge.fury.io/js/%40specron%2Finit)
| [@specron/sandbox](https://github.com/specron/framework/tree/master/packages/specron-sandbox) | Ethereum sandbox server. | [![NPM Version](https://badge.fury.io/js/@specron%2Fsandbox.svg)](https://badge.fury.io/js/%40specron%2Fsandbox)
| [@specron/spec](https://github.com/specron/framework/tree/master/packages/specron-spec) | Core test suite. | [![NPM Version](https://badge.fury.io/js/@specron%2Fspec.svg)](https://badge.fury.io/js/%40specron%2Fspec)

## Contributing

See [CONTRIBUTING.md](https://github.com/specron/framework/blob/master/CONTRIBUTING.md) for how to help out.

## Licence

See [LICENSE](https://github.com/specron/framework/blob/master/LICENCE) for details.
