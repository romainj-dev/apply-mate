# ApplyMate

ApplyMate helps job seekers craft AI-ready applications (resumes, cover letters,
status tracking) powered by custom workflows.

## Stack

- `apps/web`: Next.js 16 app (UI + API routes)
- GraphQL API: `/api/graphql` (GraphQL Yoga + Pothos, code-first schema)
- Database: Supabase Postgres via Drizzle ORM + `postgres.js`
- Auth: NextAuth (JWT sessions)

## Repository layout

```text
.
├── apps/
│   └── web/
├── packages/
│   ├── shared/          # env + crypto helpers
│   └── shared/schemas/  # zod domain schemas
├── supabase/migrations/ # source-of-truth SQL schema
└── docs/
```

## Getting started

1. Install dependencies:

```bash
pnpm install
```

2. Configure `.env` in repository root:
   - `DATABASE_URL` (Supabase pooled connection string)
   - `AUTH_SECRET`
   - `AUTH_URL` (e.g. `http://localhost:3000`)
   - `TOKEN_ENCRYPTION_KEY` (base64, 32-byte decoded key)
   - `NEXT_PUBLIC_APP_URL`
   - Optional OAuth + parser keys:
     - `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`
     - `AUTH_LINKEDIN_ID`, `AUTH_LINKEDIN_SECRET`
     - `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
     - `RESUME_PARSER_KEY`

3. Run locally:

```bash
pnpm dev
```

4. Generate GraphQL schema/types:

```bash
pnpm graphql:codegen:web
```

## Scripts

- `pnpm dev` / `pnpm dev:web`
- `pnpm build`
- `pnpm lint`
- `pnpm test`
- `pnpm graphql:codegen:web`
