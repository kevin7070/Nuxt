# create .env.\* files first

_.env.development_

```
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000
NUXT_ENV_MODE=development
```

_.env.production_

```
NUXT_PUBLIC_API_BASE_URL=your-public-api-base-url
NUXT_ENV_MODE=production
```

---

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
