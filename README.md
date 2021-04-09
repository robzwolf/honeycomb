# Honeycomb
![Vercel](https://vercelbadge.vercel.app/api/robzwolf/honeycomb)

Nicely tile hexagon badges!

Deployed using Vercel to https://honeycomb.robbie.dev/

> **Works best in Google Chrome on desktop.** Firefox has issues with dragging to reorder. Untested on other browsers.

## Quick Start

### Local Development

```bash
npm install

# If you have Vercel CLI installed
cp .env.development .env
vercel dev

# If you don't have Vercel CLI installed
npm run dev
```

### Production
```bash
npm run build
npm run start
```

## PNG Generation
Handled using Vercel serverless functions.

More info on getting Playwright to work with Vercel:

- https://just-be.dev/posts/vercel-lambda-size-error
- https://twitter.com/bjoern_rave/status/1375860916386983936
- https://github.com/microsoft/playwright/issues/5862#issuecomment-808944114

## Credit

Hexagon maths and layout comes from this tutorial: https://dev.to/afif/responsive-hexagon-grid-without-media-query-57g7
