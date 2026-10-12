# Payload + Next.js (storefront)

Next.js SSR storefront for [zerops-recipe-apps/payload](https://github.com/zerops-recipe-apps/payload). Deploy with `zeropsSetup: dev` or `prod` from [`zeropsio/recipes/payload-next`](https://github.com/zeropsio/recipes/tree/main/payload-next).

Set `NEXT_PUBLIC_PAYLOAD_URL` to your Payload public URL at build and runtime. The demo reads Payload REST on the **Next server** (`/api/*`), so the CMS and storefront can live on different hostnames without CORS issues.

## Local dev

Run Payload locally on `:3000`, then:

```bash
npm install
NEXT_PUBLIC_PAYLOAD_URL=http://127.0.0.1:3000 npm run dev
```
