# Dhananjay Verma Portfolio

A modern developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and interactive 3D/analytics sections.

## Overview

This project presents a full stack and React Native developer portfolio with a polished landing page, project highlights, skills, experience, achievements, GitHub analytics, blog content, contact section, recruiter mode, AI portfolio assistant, and interactive visual components.

## Tech Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js with React Three Fiber
- Radix UI components
- Lucide React icons
- Recharts

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Runs the production build locally.

```bash
npm run lint
```

Runs Next.js ESLint checks.

```bash
npm run typecheck
```

Runs TypeScript type checking without emitting files.

## Project Structure

```text
app/
  layout.tsx        Root layout and metadata
  page.tsx          Main page composition
  globals.css       Global styles and Tailwind layers

components/
  HeroSection.tsx   Landing hero
  Navbar.tsx        Site navigation
  ProjectsSection.tsx
  SkillsSection.tsx
  ExperienceSection.tsx
  ContactSection.tsx
  ui/               Reusable UI components

public/
  profile.jpeg      Profile image used on the landing page
```

## Deployment

The project includes a `netlify.toml` file and `@netlify/plugin-nextjs`, so it is ready for Netlify deployment. It can also be deployed on any platform that supports Next.js.

## Notes

- Update social links and contact details in the relevant components before publishing.
