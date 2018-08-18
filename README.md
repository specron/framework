# Specron framework

> Lightweight, open source and magic-free framework for testing solidity smart contracts.

Specron is a lightweight, open source, magic-free framework for testing smart contracts written in [solidity](https://solidity.readthedocs.io/en/v0.4.24/). The testing suite is built on top of the [Hayspec framework](https://github.com/specron/monorepo) thus tests are written in [TypeScript](https://www.typescriptlang.org/).

Specron provides development environment for the Ethereum blockchain and includes useful tools which enable developers to easily write tests for smart contracts.

The source code is available on [GitHub](https://github.com/specron/monorepo) where you can also find our [issue tracker](https://github.com/specron/monorepo/issues).

## Packages

[![Build Status](https://travis-ci.org/specron/monorepo.svg?branch=master)](https://travis-ci.org/specron/monorepo)&nbsp;[![codecov](https://codecov.io/gh/specron/monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/specron/monorepo)

| Package | Description | Version
|-|-|-
| [@specron/cli](https://github.com/specron/monorepo/tree/master/packages/specron-cli) | Command-line interface. | [![NPM Version](https://badge.fury.io/js/@specron%2Fcli.svg)](https://badge.fury.io/js/specron%2Fcli)
| [@specron/compiler](https://github.com/specron/monorepo/tree/master/packages/specron-compiler) | Smart contracts compiler. | [![NPM Version](https://badge.fury.io/js/@specron%2Fcompiler.svg)](https://badge.fury.io/js/specron%2Fcompiler)
| [@specron/init](https://github.com/specron/monorepo/tree/master/packages/specron-init) | Project structure initializer. | [![NPM Version](https://badge.fury.io/js/@specron%2Finit.svg)](https://badge.fury.io/js/specron%2Finit)
| [@specron/sandbox](https://github.com/specron/monorepo/tree/master/packages/specron-sandbox) | Ethereum sandbox server. | [![NPM Version](https://badge.fury.io/js/@specron%2Fsandbox.svg)](https://badge.fury.io/js/specron%2Fsandbox)
| [@specron/spec](https://github.com/specron/monorepo/tree/master/packages/specron-spec) | Core test suite. | [![NPM Version](https://badge.fury.io/js/@specron%2Fspec.svg)](https://badge.fury.io/js/specron%2Fspec)

## Installation

Start by installing the specron command-line tool.

```
$ npm install -g @specron/cli
```

## Getting started

Specron automates the compilation and testing process of smart contracts. It tries to be as simple as possible so you can focus on your code.

### Creating a new project

Let's start by creating a new project folder.

```
$ mkdir project1
$ cd project1
```

Initialize the project and install the dependencies.

```
$ specron init
$ npm install
```

Run tests to verify everything works as expected.

```
$ npm test
```

## Contributing

See [CONTRIBUTING.md](https://github.com/specron/monorepo/blob/master/CONTRIBUTING.md) for how to help out.

## Licence

See [LICENSE](https://github.com/specron/monorepo/blob/master/LICENCE) for details.
