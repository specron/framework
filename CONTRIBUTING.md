# Contributing

## Issues

We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## Pull Requests

* Fork the repo and create your branch from master.
* If you've added code that should be tested, add tests.
* Ensure the test suite passes.

## Coding Style

Please follow the [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines).

## Development

* https://gist.github.com/xpepermint/eecfc6ad6cd7c9f5dcda381aa255738d

## Release process

The release manager will publish packages to NPM using these commands.

```sh
$ rush version --bump --override-bump minor
$ rush update --full
$ rush rebuild
$ rush test
$ rush publish --publish --include-all
```
