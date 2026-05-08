# LES 210 — Final Exam Prep

A study app for the LES 210 (American Legal System) final exam at ASU's W. P. Carey School of Business.

Built with Next.js 14, Tailwind CSS, and Framer Motion. Designed for fast, distraction-free review with a mastery-based progression system.

## Features

- **50 multiple-choice questions** covering all topics in the study guide:
  Foundations, Sources of Law, Constitutional Law, Standards of Proof, Contracts & Torts, Property, Business Law, Securities & Regulation, and Antitrust & ESG.
- **Mastery system**: Each question moves through four states — Unseen → Learning → Familiar → Mastered. Answer correctly twice in a row to master a question. Get one wrong, and it drops back to Learning.
- **Adaptive ordering**: The next question is chosen by lowest mastery + oldest review time, so you spend more time on what you don't know.
- **Explanations on every question**, drawn directly from the lecture slides.
- **Progress persists** in localStorage — no account needed.
- **Browse mode**: Filter the full question bank by topic and review answers + explanations any time.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

The fastest path:

1. Push this repo to GitHub (you already have one — `harrisonsmith14/LES210Final`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — click **Deploy**. No env vars needed.

Or with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Fonts: Playfair Display, Libre Caslon Text, Inter

## Final Exam Logistics

- **Date**: May 8, 2:30 pm
- **Format**: 34 multiple-choice questions, 70 minutes
- **Closed book**, one-page front-and-back notes sheet allowed
- **LockDown Browser** in the Quizzes tab
