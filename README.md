# Vuejs Typescript test

This project is a test to learn how Vue works. It's based on a template
of Vue 3 in Vite.

## Project commands

```sh
# Install dependencies
npm install
```

### Compile and Hot-Reload for Development

```sh
# Run the project on localhost only
npm run dev

# Host the project
npm run dev --host
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Vue info

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
