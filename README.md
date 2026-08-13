# alterndigital.com

Marketing site for **ALTERN DIGITAL TECHNOLOGIES** — Next.js (App Router), TypeScript, Tailwind CSS v4, Payload CMS.

## Commands

Use [Bun](https://bun.sh/) as the package manager (`bun.lockb`).

```bash
bun install
bun run dev
bun run build
```

After configuring `.env` (see Payload / Neon docs in your deployment), seed CMS content:

```bash
bun run seed
```

Payload helpers:

```bash
bun run generate:types
bun run generate:importmap
```

Production build uses `next build --webpack` (see `package.json`) for Payload Postgres compatibility.
