# create-svelte-project-zero

Everything you need to build a Svelte project with an API skeleton, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Project Overview

This template provides a foundational setup for building Svelte applications, including:
- An API skeleton to get you started with backend logic.
- Basic routes for generating and managing API keys.
- Pre-configured settings for rapid development.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Building](#building)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To create a new project using this template, use the following command:

```bash
npx create-svelte-project-zero my-app
```

Replace `my-app` with your desired project name. This will clone the template into a new directory named `my-app`.

### Example

```bash
npx create-svelte-project-zero test-app-my
```

This command creates a new Svelte project in a directory called `test-app-my`.

## Usage

Once you’ve cloned the template, navigate to your project directory:

```bash
cd my-app
```

Install the dependencies using your package manager of choice:

```bash
npm install
```
or
```bash
yarn install
```
or
```bash
pnpm install
```

## Development

To start a development server, run:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app, run:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) suitable for your target environment.

## Features

- **API Skeleton**: The template includes a basic structure for API routes that allow you to generate and manage API keys.
- **Starting Routes**: Predefined routes help you quickly implement necessary functionalities without starting from scratch.
- **TypeScript Support**: Comes pre-configured with TypeScript for type safety and better developer experience.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
