# Contributing to Inspired Scripture

Thank you for your interest in contributing to [inspiredscripture.com](https://inspiredscripture.com/)! See [ARCHITECTURE.md](ARCHITECTURE.md) for a codebase walkthrough before diving in.

## Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [pnpm](https://pnpm.io/) (v9+)
- [Pandoc](https://pandoc.org/) (only needed for converting study documents)

## Getting Started

1. Fork and clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm start
   ```
4. Visit http://localhost:4000 to preview the site

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start the development server |
| `pnpm build` | Generate the static site |
| `pnpm test` | Run the Jest test suite |
| `pnpm lint` | Run ESLint with Prettier |

## Generating Study Pages

Study pages are converted from Word documents (.docx) to HTML using Pandoc:

```bash
source _studies/converter_fns.sh && convert_all_docx
```

The `--self-contained` flag is critical for preserving embedded media. Studies are stored in the `_studies/` directory.

## Styling

- **Theme and Layout**: [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- **Components**: [React-Bootstrap](https://react-bootstrap.netlify.app/)
- **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/) and [FontAwesome](https://fontawesome.com/)

## Submitting Changes

1. Create a feature branch from `master`
2. Make your changes
3. Run tests and linting:
   ```
   pnpm test && pnpm lint
   ```
4. Commit your changes with a clear, descriptive message
5. Open a pull request against `master`

## Deployment

Deployments are automatically triggered on merge to `master` via Netlify.
