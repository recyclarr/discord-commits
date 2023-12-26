# Contributing

## Node Installation

1. Install Node Version Manager (nvm) using the instructions [here][node]. Note: On Windows, it is
   recommended to use "NVM for Windows". You can install this with Winget or Chocolatey.
1. Install Node v21 using `nvm install 21`.
1. Run `nvm use 21` to change your current version of node.

[node]: https://github.com/nvm-sh/nvm#installing-and-updating

## Yarn & Package Installation

After Node is installed, you must install Yarn. These instructions were taken from [here][yarn].

1. Install yarn using the command `corepack enable`.
1. Then run `yarn install` to install all dependencies.

[yarn]: https://yarnpkg.com/getting-started/install

## Update Distribution

The `dist` directory contains the published version of the github action. When a change is made, the
distribution must be updated.

1. Delete the current `dist` directory with `rm -rf dist`.
1. Regenerate the distribution with `yarn build`.
1. Commit all changes to the `dist` directory.
