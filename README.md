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

- **Next.js**: React-based framework for server-side rendering and static site generation
- **TypeScript**: Strongly-typed JavaScript for better code quality and maintainability
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide Icons**: Icon set for React
- **Radix UI**: Unstyled, accessible components for building high-quality design systems
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **PostgreSQL**: Database support via adapters
- **Other Libraries**: (see `package.json` for a comprehensive list)
  - UI: framer-motion, cmdk, shadcn-ui, zustand, react-hook-form, react-toastify, recharts
  - Auth: lucia, iron-session, @auth/drizzle-adapter
  - Utilities: lodash, axios, dotenv, gray-matter, uuid
  - Email: emailjs-com, resend
  - Image: sharp, blurhash, react-blurhash

---

## Project Structure

- `app/` - Main application code (pages, routes, etc.)
- `components/` - Reusable React components
- `assets/` - Static assets such as images
- `styles/` - Global and component-specific styles
- `public/` - Publicly served static files
- `constants/` - App-wide constant values
- `lib/` - Utility/helper functions
- `data/` - Sample or seed data
- `schemas/` - Database or data validation schemas
- `hooks/` - Custom React hooks
- `providers/` - Context and provider components
- `emails/` - Email templates or logic
- `sections/` - High-level page sections

---

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Run the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Lint the codebase
- `npm run generate` - Generate Drizzle ORM artifacts
- `npm run push` - Push Drizzle ORM migration
- `npm run introspect` - Introspect database schema with Drizzle ORM
- `npm run studio` - Open Drizzle ORM studio

See `package.json` for additional scripts.

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
