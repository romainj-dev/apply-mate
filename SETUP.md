# Setup

## Prerequisites

- Node.js 18+
- pnpm 9+

## Install

```bash
pnpm install
```

## Environment

Create `.env` at repository root:

```bash
DATABASE_URL=postgres://...
AUTH_SECRET=...
AUTH_URL=http://localhost:3000
TOKEN_ENCRYPTION_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Optional:

```bash
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_LINKEDIN_ID=
AUTH_LINKEDIN_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
RESUME_PARSER_KEY=
```

## Run

```bash
pnpm dev
```

## Generate GraphQL artifacts

```bash
pnpm graphql:codegen:web
```
