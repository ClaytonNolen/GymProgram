# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project
At the time of development, Svelte has been a useful language, but hard to find documentation for.
To learn more about our projects inital development, check out these two videos. The first is a front-end 
tutorial and how to set up the project from your machines terminal. The second is the back-end tutorial that
includes how to set up Firebase and bind variables.

    1. START UP & FRONTEND: https://www.youtube.com/watch?v=fTsVYwxjyS4&t=832s
    2. FIREBASE CONNECTION & BACKEND: https://www.youtube.com/watch?v=3Q4fK1NdNMQ&t=1238s
    
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

https://tailwindcss.com/docs/guides/sveltekit

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
