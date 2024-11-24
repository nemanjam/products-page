# Products page

## Demo

Store page is on the `/store` route.

- Docker: https://products-page.arm1.nemanjamitic.com/store
- Fleek: https://ancient-garden-incalculable.functions.on-fleek.app/store

## Screenshots

https://github.com/user-attachments/assets/429a83b7-8762-468b-91a2-ed48a150e64b

## Notes

- I build it as a full stack SSR Next.js app. There is a simulated and `1s` delayed database call in `modules/database.ts` for fetching and filtering products. Search query term and display grid/list value are stored as url query param to keep SSR for products list, which is important for SEO and performance. Official docs linked in [References](#references) section also states this advantage.
- I used Shadcn starter project which I updated.
- Figma design should be closely matched with an additional side note that I used the closest available Tailwind value for maintainability purpose. For example `h-32` instead of `h-[120px]` for spacing, or `theme('colors.neutral.900')` instead of `#111111` for colors. For finding the closest available Tailwind palette color I used tool linked in [References](#references) section.
- The design is fully responsive, including the collapsible navbar.
- All 4 fetching states are handled, 1. data, 2. no data, 3. loading, 4 error. Loading is done using `<Suspense />` boundary component and skeletons. Error boundary is done using `app/error.tsx` file boundary. You can trigger a test database error by typing `db-error` in search input.
- Beside the dark theme from mockup there is an additional light theme with default colors from Shadcn starter.
- The only details different for the Figma design are theme button and breakpoints indicator which I left intentionally in production for easier testing.
- Images are served from `public/assets/images/` static folder.
- Available editable config values are stored in `config/app.ts`:

```ts
export const CONFIG = {
  NAME: 'Level Up Gaming',
  DESCRIPTION: 'Welcome to the Level Up Gaming store.',
  WAIT_DATABASE: 1000,
  WAIT_DEBOUNCE_SEARCH_INPUT: 300,
  TRIGGER_ERROR_SEARCH_QUERY: 'db-error',
} as const;
```

## Installation and running

I used Node.js `v22.9.0`.

```bash
# install dependencies
yarn install

# run in dev mode, visit http://localhost:3000/store
yarn dev

# build
yarn build

# run in prod mode
yarn cp
node .next/standalone/server.js
# or
yarn standalone
```

### Docker deployment

Set the following Github secrets and use `build-push-docker.yml` and `deploy-docker.yml` Github Actions workflows to build, push and deploy Docker image to the remote server.

```bash
DOCKER_USERNAME
DOCKER_PASSWORD

REMOTE_HOST
REMOTE_USERNAME
REMOTE_KEY_ED25519
REMOTE_PORT
```

### Fleek deployment

Tutorial: https://fleek.xyz/blog/announcements/nextjs-support-release/

```bash
# clone repo
git clone git@github.com:nemanjam/products-page.git

# in next.config.mjs comment out this line
output: 'standalone',

#install fleek cli
npm install -g @fleek-platform/cli
fleek version

# login to fleek cli
fleek login

# add @fleek-platform/next package
npm install @fleek-platform/next

# use npm instead of yarn and install packages
npm install

# build app
npx fleek-next build

# create function and select project
fleek functions create --name products-page-f1

# deploy and select products-page-f1 function
fleek functions deploy --bundle=false --path .fleek/dist/index.js --assets .fleek/static

```

## References

- Shadcn starter project (needs updating) https://github.com/shadcn-ui/next-template
- Search and pagination as url query params to keep SSR for filtering Products list https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
- Copy assets for `output: 'standalone'` build, needed for Docker: https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
- Deploy full stack Next.js app as Fleek function https://fleek.xyz/blog/announcements/nextjs-support-release/
- Find the nearest Tailwind palette color tool https://nearest-tailwind-color.netlify.app/
