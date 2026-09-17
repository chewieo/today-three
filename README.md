# Today Three

Today Three is a simple task-management web app built around one idea: focus on the three most important tasks for today.

## Features

- Create an account with email, username, display name, and password
- Sign in with username and password
- Sign out
- Create tasks
- Move tasks between **Today**, **Later**, and **Completed**
- Complete and restore tasks
- Delete tasks
- Limit unfinished **Today** tasks to a maximum of 3
- Keep each user's tasks private
- Persist tasks in PostgreSQL
- Deploy the application with Railway

## The Three-Task Rule

Today Three allows each user to have at most **3 unfinished tasks** in the Today section.

Tasks that are not selected for Today stay in Later. Completed tasks are kept in the Completed section.

The three-task limit is enforced on the server, not only in the interface.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Better Auth
- Railway

## Project Structure

```text
today-three/
├── app/
│   ├── api/auth/[...all]/
│   ├── login/
│   ├── register/
│   ├── actions.ts
│   └── page.tsx
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   └── prisma.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── .env.example
└── package.json
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- PostgreSQL
- Git

## Getting Started

Clone the repository and enter the project directory:

```bash
git clone https://github.com/chewieo/today-three.git
cd today-three
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

Use `.env.example` as the template:

```env
DATABASE_URL="your-postgresql-database-url"
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

Never commit the real `.env` file or expose database credentials, authentication secrets, passwords, or tokens.

## Database Setup

Make sure PostgreSQL is running and that `DATABASE_URL` points to your database.

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply development migrations:

```bash
npx prisma migrate dev
```

For production deployment, migrations are applied with:

```bash
npx prisma migrate deploy
```

To inspect the database with Prisma Studio:

```bash
npx prisma studio
```

## Authentication

Authentication is handled by Better Auth.

The application uses Better Auth's username plugin for username-based sign-in. Password handling and sessions are managed by Better Auth rather than by custom password hashing or manually created session cookies.

Protected task operations validate the current session and scope database operations to the signed-in user's ID.

## Running Locally

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Create an account, sign in, and use the task dashboard.

## Production Build

To create a production build locally:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deployment

The application is deployed through Railway from the GitHub repository.

The Railway deployment uses:

- A Railway PostgreSQL service
- A private `DATABASE_URL` reference from the PostgreSQL service
- `BETTER_AUTH_SECRET` as a Railway secret variable
- `BETTER_AUTH_URL` set to the public Railway application URL
- `npx prisma migrate deploy` as the pre-deploy migration command

The production build generates the Prisma Client before building Next.js.

## Public Demo

Live application:

https://today-three-production.up.railway.app

## Security and Data Ownership

Task actions are protected by a validated Better Auth session.

Each task belongs to a user through `userId`. Task reads, counts, updates, and deletes are scoped to the authenticated user's ID.

The maximum of three unfinished Today tasks is enforced server-side.

Environment files containing real secrets are excluded from the Git repository.

## Known Limitations

- Email verification is not currently part of the basic signup flow.
- The application currently focuses on personal task management rather than shared task lists.
- There is no password-reset flow in the current version.
- The interface is intentionally simple and focused on the core Today/Later/Completed workflow.

## Development Notes

The project follows an incremental development approach: product scope, Next.js interface, PostgreSQL, Prisma, task operations, validation, authentication, GitHub, and Railway deployment are implemented as separate stages.

Future improvements can be based on observed user feedback rather than adding features without evidence.
