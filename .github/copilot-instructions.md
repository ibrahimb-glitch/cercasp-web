# Copilot Instructions for CERCASP-OS

## Repository Overview

CERCASP-OS is a monorepo for the CERCASP website (RFC CRC2302227N7, founded 22/02/2023). The project uses a Turborepo-based monorepo structure with Yarn workspaces.

### Architecture

- **Frontend**: Next.js 15 application (`apps/web`)
- **Backend**: NestJS 11 API (`apps/api`)
- **Packages**:
  - `packages/ui`: Shadcn/Tailwind components library
  - `packages/db`: Prisma schemas and database migrations
  - `packages/utils`: Helper functions and validators
  - `packages/audit`: Blockchain traceability functionality

### Deployment

- **Web Application**: Deployed to Vercel
- **API**: Deployed to Google Cloud Run
- **Database**: PostgreSQL on Google Cloud SQL
- **Domain**: cercasp.org (managed via Squarespace DNS)

## Technology Stack

### Frontend (apps/web)
- Next.js 15 with React 18
- TypeScript 5
- Tailwind CSS 3.4
- PostCSS & Autoprefixer

### Backend (apps/api)
- NestJS 11
- Prisma 5 (ORM)
- JWT Authentication (Passport.js)
- PostgreSQL database

### Development Tools
- Turborepo 2.0 for monorepo management
- ESLint for code quality
- Prettier for code formatting
- Jest for testing

## Code Style & Conventions

### Formatting Rules (Prettier)
- **Quotes**: Single quotes (`singleQuote: true`)
- **Line length**: 100 characters max (`printWidth: 100`)
- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Required (`semi: true`)
- **Trailing commas**: ES5 style
- **Arrow function parens**: Avoid when possible (`arrowParens: "avoid"`)
- **Line endings**: LF (`endOfLine: "lf"`)

### ESLint Rules
- Console statements generate warnings (`no-console: "warn"`)
- Must use `const` or `let`, no `var` allowed
- Prefer `const` over `let` when variables don't change
- Unused variables prefixed with underscore (`_`) are ignored

### TypeScript
- TypeScript 5 is used across the entire monorepo
- All apps and packages use TypeScript
- Strict type checking is enabled

### Documentation Language
- **All documentation must be written in Spanish**
- This includes README files, guides, and inline documentation
- Code comments may be in English or Spanish, but Spanish is preferred

## Build, Test & Lint Commands

### Root Level (Monorepo)
```bash
yarn install          # Install all dependencies
yarn dev             # Start development servers for all apps
yarn build           # Build all apps and packages
yarn lint            # Lint all workspaces
yarn test            # Run tests across all workspaces
```

### Web App (apps/web)
```bash
cd apps/web
yarn dev             # Start Next.js dev server
yarn build           # Build for production
yarn start           # Start production server
yarn lint            # Run Next.js linting
```

### API (apps/api)
```bash
cd apps/api
yarn start:dev       # Start NestJS in watch mode
yarn build           # Build the API
yarn start:prod      # Start production server
yarn lint            # Run ESLint
yarn test            # Run Jest tests
yarn test:watch      # Run tests in watch mode
yarn test:cov        # Run tests with coverage
yarn test:e2e        # Run end-to-end tests
```

## Common Patterns & Best Practices

### File Structure
- Keep components focused and single-purpose
- Place shared UI components in `packages/ui`
- Place database schemas in `packages/db`
- Place utility functions in `packages/utils`

### Database (Prisma)
- All database changes must go through Prisma migrations
- Schema is located in `packages/db`
- Use Prisma Client for all database operations

### Authentication
- API uses JWT authentication via Passport.js
- JWT secret is configured via environment variables
- Protected endpoints should use appropriate NestJS guards

### Environment Variables
- Use `.env.example` files as templates
- Never commit actual `.env` files
- API environment variables:
  - `DATABASE_URL`: PostgreSQL connection string
  - `JWT_SECRET`: JWT signing secret
  - `NODE_ENV`: Environment (development/production)
  - `PORT`: Server port (default 8080 for Cloud Run)
- Web environment variables:
  - `NEXT_PUBLIC_API_URL`: API endpoint URL

### Testing
- Tests are located in `__tests__` directory at the root
- Use Jest for unit and integration tests
- Test files use `.test.ts` or `.test.tsx` extension
- Organize tests by app: `__tests__/api/`, `__tests__/web/`, `__tests__/e2e/`

### Git Workflow
- Commit messages should be clear and descriptive
- Build artifacts and dependencies should not be committed
- `.turbo/` cache directory is gitignored

## Package Management

- **Package Manager**: Yarn 1.22.19 (specified in `packageManager` field)
- Always use `yarn` commands, not `npm`
- Dependencies are managed at both root and app/package level
- Shared dependencies should be hoisted to root when possible

## Deployment Process

### CI/CD
- GitHub Actions workflows are configured for automated deployment
- API deployments trigger on push to main branch
- Google Cloud Service Account credentials required for API deployment

### Manual Deployment
Refer to `DEPLOYMENT_GUIDE.md` for detailed deployment instructions including:
- Initial Cloud Run setup
- Vercel configuration
- Database migrations
- Environment variable configuration

### Domain Configuration
See `docs/DOMAIN_SETUP_GUIDE.md` for DNS and domain setup with Squarespace and Vercel.

## Additional Resources

- **Compliance**: See `docs/COMPLIANCE.md`
- **Security**: See `docs/SECURITY.md`
- **Domain Setup**: See `docs/DOMAIN_SETUP_GUIDE.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`

## Working with This Repository

When making changes:
1. Ensure all linting passes with `yarn lint`
2. Run tests to verify no regressions: `yarn test`
3. Build the project to check for build errors: `yarn build`
4. Follow the existing code style and patterns
5. Update documentation if you change functionality
6. Write documentation in Spanish when creating new docs
