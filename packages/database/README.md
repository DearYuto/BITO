# Database package

This package provides the shared Prisma client and schema.

## Setup

1. Ensure `DATABASE_URL` is set in your environment.
2. Generate the Prisma client:

```bash
bun run --cwd packages/database generate
```

3. Apply migrations in development:

```bash
bun run --cwd packages/database migrate:dev
```
