# Contributing

Thanks for helping. A few rules keep the packages usable by any host and by agents.

## Setup

```bash
npm install
npm run check
```

`npm run check` runs formatting, lint, type checks, the clean-check (no host-product names or secrets), tests and the build. CI runs the same, plus a gitleaks secret scan.

## Ground rules

- **No host code.** Nothing may depend on a particular app's database, routing, auth, environment variables or UI. If a feature needs host data, add an interface or a callback and document it in `docs/architecture.md`.
- **One render engine.** Layout and rendering must behave the same in the browser and in Node. A change to either comes with a test that renders headlessly.
- **The scene is the API.** Schema changes need a migration when stored documents would change meaning, and the schema's descriptions are written for LLMs too: plain, precise, no product jargon.
- **Small, purposeful commits.** One concern per commit or PR.
- **Changesets.** Run `npm run changeset` for any change to a published package.

## Layout

- `packages/*`: the published packages (`src/`, `test/`).
- `tests/`: cross-package tests.
- `examples/*`: runnable examples (private, never published).
- `docs/`: format and integration docs.

## Reporting problems

Open an issue. For security problems see [SECURITY.md](SECURITY.md).
