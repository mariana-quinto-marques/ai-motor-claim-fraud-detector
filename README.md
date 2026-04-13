# Claims Intelligence — AI Fraud Detection Dashboard

An AI-powered insurance claims intelligence platform that detects fraud, scores risk, and surfaces actionable signals for claims adjusters. Built with Next.js 16, React 19, and Anthropic's Claude API.

## Features

- **Overview Dashboard** — Real-time stats (active claims, awaiting action, avg resolution time, fraud prevented), recent claims table, risk distribution donut chart, and activity feed
- **All Claims** — Filterable claims table with 10 columns, pill-style filters (risk level, status), and full-text search by name, ID, or policy
- **Fraud Hub** — Fraud analytics with type breakdown bar charts, weekly claim volume spark charts, fraud rate and AI accuracy metrics, and a flagged claims queue
- **Reports** — Monthly performance metrics (AI accuracy, avg resolution, fraud blocked, CSAT) and claims-by-type breakdown
- **Claim Detail Panel** — Slide-over split panel with:
  - **Left**: Policyholder data, incident details, narrative with AI consistency badges, vehicle/damage info, police references, third-party traceability, photo evidence grid, event timeline, and handler notes
  - **Right**: AI fraud score ring (0-100), risk verdict, analysis triggers, signal analysis table (8 signals per claim with Clear/Review/Flagged verdicts and confidence scores), model reasoning, and model metadata
- **Claim Actions** — Approve, Send for Review, Escalate to SIU, or Reject claims with instant status updates and toast notifications
- **AI Signal Badges** — Inline fraud signal indicators with hover tooltips showing detailed findings across Policy Velocity, Location Verification, Narrative Consistency, Photo Evidence, Third Party Traceability, Repair Estimate, Claim History, and Duplicate Detection

## Tech Stack

- **Framework**: Next.js 16.2.2 (App Router)
- **UI**: React 19, TypeScript, Tailwind CSS v4
- **AI**: Anthropic Claude API (`@anthropic-ai/sdk`)
- **Fonts**: Plus Jakarta Sans, IBM Plex Mono
- **Design**: Marshmallow-inspired design system with 40+ CSS tokens

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Environment Variables

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=your-api-key-here
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and API routes
├── components/
│   ├── dashboard/          # Overview page (stats, donut, feed)
│   ├── claims/             # All Claims page (filters, table)
│   ├── fraud/              # Fraud Hub page (charts, flagged claims)
│   ├── reports/            # Reports page (performance, type breakdown)
│   ├── detail/             # Claim detail slide-over panel (9 components)
│   └── ui/                 # Shared badges, cells, and toast
├── context/                # React context for global state management
├── data/                   # Mock claims data (10 realistic UK motor claims)
├── lib/                    # Claude API client and prompt engineering
└── types/                  # TypeScript interfaces for claims, signals, triggers
```
