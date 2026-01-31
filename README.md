# Monorepo Project

This is a monorepo project managed by [Turborepo](https://turbo.build/repo) and [Bun](https://bun.sh/).

## Structure

- `apps/`
  - `web`: Frontend application (Next.js)
  - `api`: Backend application (NestJS) - *Planned/In Progress*
- `packages/`
  - `types`: Shared TypeScript definitions
  - `config`: Shared configuration (ESLint, Prettier, TSConfig, etc.)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed.

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

### Build

```bash
bun build
```

## Tools

- **Turborepo**: High-performance build system for JavaScript and TypeScript codebases.
- **Next.js**: The React Framework for the Web.
- **NestJS**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
