# 🚀 Interview Project - Pokemon

## Prerequisites

-   NodeJS (16.x)
-   NPM (8.x)
    <br>
    <br>

## Setting up the project locally

After cloning the repository, you will need to create a `.env` file, based on `.env.example`. <br>Don't forget to add `/api/v1` at the end of your `REACT_APP_API_URL` variable.<br>
By default, it should have the following content:

```
REACT_APP_API_URL="https://pokeapi.co/api/v2"
```

Then, run the following commands:

```
npm install
npm start
```

<br>

## Using pre-commit hooks

Two tools have been installed to run automatically in order to check the code quality and formatting (Prettier and ESlint). Should you have any issues with those, you can skip them with the `-n` option on commit.<br>
They're triggered when using the `git commit` command.
<br><br>

## How to fix my code with Prettier and ESLint?

You can run Prettier with the following command in order to detect formatting issues within your code:

```
npm run prettier
```

To automatically fix said issues, you can run this one:

```
npm run prettier:fix
```

<br>
Eslint works the same way, you can run it with the following command:

```
npm run eslint
```
