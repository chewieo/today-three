# Today Three Learning Tracker
> This is a learning and continuity tool, not a grade. Update claims only when supported by code, verification, or a learner teach-back.

## Current position
- Current stage: 3
- Stage state: NOT_STARTED
- Last verified result: Local Next.js UI exists and renders an in-memory Today/Later/Completed task list.
- Current concept: Database service and env setup
- Next smallest step: Add PostgreSQL and Railway connection details for the app
- Last updated: 2026-08-05

## Stage progress
| Stage | State | Evidence | Commit |
|---|---|---|---|
| 0 | NOT_STARTED | — | — |
| 1 | COMPLETED | Next.js app scaffold and `app/page.tsx` present | — |
| 2 | COMPLETED | Task list UI with fake data in `app/page.tsx` | — |
| 3 | NOT_STARTED | No database or env configuration yet | — |
| 4 | NOT_STARTED | No Prisma schema or migration yet | — |
| 5 | NOT_STARTED | No database client module yet | — |
| 6 | NOT_STARTED | No real task queries yet | — |
| 7 | NOT_STARTED | No Server Actions or persistent creation yet | — |
| 8 | NOT_STARTED | No task mutation flow yet | — |
| 9 | NOT_STARTED | No failure/empty-state polish yet | — |
| 10 | NOT_STARTED | No auth or user-specific tasks yet | — |
| 11 | NOT_STARTED | No GitHub push / remote verification yet | — |
| 12 | NOT_STARTED | No Railway deployment yet | — |
| 13 | NOT_STARTED | No developer README updates yet | — |
| 14 | NOT_STARTED | No usability improvement shipped yet | — |

## Concept progress
| Concept | Required level | State | Evidence or next check |
|---|---:|---|---|
| Product problem and scope | 1 | UNSEEN | No product hypothesis or PRODUCT.md found |
| Components and props | 1 | EXPOSED | `app/page.tsx` renders task objects into rows |
| Browser versus server | 1 | EXPOSED | `app/page.tsx` is a client component; layout is server code |
| PostgreSQL data model | 1 | UNSEEN | No Prisma schema or DB model yet |
| Environment variables and secrets | 1 | UNSEEN | No `.env` or `.env.example` evidence yet |
| Migration | 1 | UNSEEN | No Prisma migration exists yet |
| Prisma query and mutation | 2 | UNSEEN | No Prisma code present |
| Server Action data flow | 1 | UNSEEN | No Server Actions present |
| Server-side validation | 1 | UNSEEN | No server validation yet |
| Authentication versus authorization | 1 | UNSEEN | No auth present yet |
| Session and ownership | 1 | UNSEEN | No session-based task ownership present |
| Better Auth API | 2 | UNSEEN | No Better Auth code present |
| Railway deployment | 1 | UNSEEN | No Railway deployment evidence yet |
| User testing and iteration | 1 | UNSEEN | No usability improvement recorded yet |

## Open questions
- None yet.

## Misconceptions resolved
- None yet.

## Verification evidence
- None yet.

## Session log
### 2026-08-05
- Started at: 
- Goal: Establish current project state and next milestone
- Work completed: Created learning tracker and identified current stage
- Evidence: Existing app UI with fake task data in `app/page.tsx` and project scaffold
- Learner teach-back: 
- Concept updates: Components/props and browser/server exposure
- Remaining confusion: None yet
- Next step: Set up Railway PostgreSQL connection and local environment variables
