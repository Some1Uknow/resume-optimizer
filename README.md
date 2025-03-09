# ResumeMax - AI-Powered Resume Builder

## Description

ResumeMax is an advanced, AI-powered resume optimization platform designed to help job seekers create professional, ATS-friendly resumes. The application leverages modern web technologies to provide an intuitive, feature-rich resume building and optimization experience.

## Key Features

- 🤖 AI-Powered Resume Optimization
- 📄 Multiple Resume Templates
- 🔍 ATS (Applicant Tracking System) Score Analysis
- 📝 Cover Letter Generator
- 🔄 Version Control for Resumes
- 🌓 Dark/Light Mode Support

## Prerequisites

- Node.js (v18 or later)
- npm/yarn/pnpm

## Technologies Used

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://www.ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/resume-optimizer.git
cd resume-optimizer
```
2. Install dependencies
```bash
npm install
```
or
```bash
yarn install
```
or
```bash
pnpm install
```
3. Start the development server
```bash
npm run dev
```
or
```bash
yarn dev
```
or
```bash
pnpm dev
```

## Project Structure 

```
/
├── app/
│   ├── dashboard/       # Dashboard and feature pages
│   ├── pricing/         # Pricing page
│   ├── signup/          # User signup page
│   └── layout.tsx       # Main layout
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   └── theme-provider.tsx
├── lib/                 # Utility functions
└── tailwind.config.ts   # Tailwind CSS configuration
```