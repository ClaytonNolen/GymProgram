# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
If you can access a local host great - you are ready to continue.

## Installations

Node.js: https://nodejs.org/en/download

Firebase: https://firebase.google.com/docs/web/setup
npm install firebase

TypeScript: https://www.npmjs.com/package/typescript
npm install -D typescript

Vite: https://vitejs.dev/guide/
npm create vite@latest

https://tailwindcss.com/docs/guides/sveltekit
npm install -D tailwindcss postcss autoprefixer
npm tailwindcss init -p

Chart.js with Svelte: https://www.npmjs.com/package/svelte-chartjs
npm i svelte-chartjs chart.js


## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
