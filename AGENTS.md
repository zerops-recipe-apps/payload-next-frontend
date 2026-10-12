# payload-next-frontend

Next.js SSR storefront for the **payload-next** Zerops recipe. CMS: [payload](https://github.com/zerops-recipe-apps/payload).

- `NEXT_PUBLIC_PAYLOAD_URL` baked at build from vault `API_URL` (or `DEV_API_URL` on dev).
- Setups: `dev` (SSH + `npm run dev`), `prod` (Next standalone on port 3000).
