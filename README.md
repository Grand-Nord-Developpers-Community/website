# GNDC Website

[![Deploy to Trigger.dev (prod)](https://github.com/Grand-Nord-Developpers-Community/website/actions/workflows/trigger-prod.yml/badge.svg?branch=main)](https://github.com/Grand-Nord-Developpers-Community/website/actions/workflows/trigger-prod.yml)

This is the official repository for the Grand Nord Developpers Community (GNDC) website.

## Table of Contents

- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Contribution Guidelines](#contribution-guidelines)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

---

## Getting Started

To set up a local copy of the GNDC website for development:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Grand-Nord-Developpers-Community/website.git
   cd website
   ```

2. **Install dependencies:**
   You can use npm, yarn, pnpm, or bun.

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.
5. Start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## Technology Stack

- **Next.js 16**: React-based framework for server-side rendering and static site generation
- **TypeScript**: Strongly-typed JavaScript for better code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Drizzle ORM**: TypeScript ORM for SQL databases (PostgreSQL)
- **MCP (Model Context Protocol)**: Integrated support for AI agents via `mcp-handler` and `@modelcontextprotocol/sdk`
- **Authentication**: Lucia Auth and Iron Session
- **Background Jobs**: Trigger.dev for long-running and scheduled tasks
- **Email**: Resend and React Email for transactional emails
- **State Management**: Zustand and TanStack Query (SWR also used)
- **UI Components**: Radix UI, Framer Motion, and Shadcn UI
- **Other Libraries**:
  - Content: Tiptap editor, Marked, Rehype, Remark
  - Utilities: Zod, Axios, Lodash, Date-fns, Lucide Icons
  - Image: Cloudinary, Sharp, Plaiceholder
  - Database: Neon, PostgreSQL, Upstash Redis (for rate limiting)

---

## Project Structure

- `actions/` - Next.js Server Actions for mutations and side-effects
- `app/` - Next.js App Router (pages, layouts, and API routes)
- `assets/` - Static assets (images, SVGs)
- `components/` - Reusable React components (UI, layout, features)
- `constants/` - Application-wide constants and configurations
- `data/` - Static data, seed data, and mocks
- `emails/` - React Email templates and testing scripts
- `hooks/` - Custom React hooks
- `interfaces/` & `types/` - TypeScript interface and type definitions
- `lib/` - Shared libraries, database client, and core utilities
- `providers/` - React Context providers (Auth, Theme, QueryClient)
- `public/` - Static files served directly
- `schemas/` - Zod validation and database schemas
- `scripts/` - Maintenance and automation scripts
- `sections/` - Complex UI sections used across multiple pages
- `server/` - Server-only logic, including MCP tools and WebPush
- `services/` - External service integrations
- `styles/` - Global CSS and Tailwind configurations
- `test/` - Test suites and MCP client tests
- `trigger/` - Trigger.dev background job definitions
- `utils/` - Shared helper functions
- `workers/` - Background workers and edge functions

---

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run db:generate` - Generate Drizzle ORM migrations
- `npm run db:push` - Push migrations to the database
- `npm run studio` - Open Drizzle Studio to explore data
- `npm run test-emails` - Run email template tests

See `package.json` for additional utility and testing scripts.

---

## Configuration

- **Next.js** is configured in `next.config.mjs`
- **Tailwind CSS** configuration in `tailwind.config.ts`
- **PostCSS** configuration in `postcss.config.mjs`
- **Drizzle ORM** configuration in `drizzle.config.ts`
- **Environment variables** setup in `envConfig.ts`

---

## Contribution Guidelines

- Please read [WORKING_GUIDELINE.md](WORKING_GUIDELINE.md) for best practices and workflow instructions.
- All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community standards and guidelines.

---

## License

This project is licensed under the terms specified in the repository. See the `LICENSE` file if available.

---

## Additional Resources

- [Project README](https://github.com/Grand-Nord-Developpers-Community/website/blob/main/README.md)
- [Browse the repo](https://github.com/Grand-Nord-Developpers-Community/website)
