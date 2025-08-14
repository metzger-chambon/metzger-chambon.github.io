# Metzger-chambon lab

## Getting Started

Clone the repository and install dependencies:

```bash
git clone git@github.com:metzger-chambon/metzger-chambon.github.io.git
npm install
```

Run `next dev` or `npm run dev` locally to preview your work. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Keep the `main` branch as the stable production code that gets deployed to GitHub Pages.

Use a different branch (e.g., `develop`) for ongoing development work.
Push your commits there as often as you want.

Once you’re happy with your changes, create a Pull Request from `dev` → `main`. Review, test, and merge. That merge triggers the deployment workflow and updates the live site.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Improving the Site

Optional: Preview deployments on PRs (Advanced)
You can configure GitHub Actions or use platforms like Vercel to create preview deployments on every PR.
This lets you share a live preview URL before merging.

Vercel is the creator of Next.js and offers automatic preview deployments for every branch and PR — with zero config. Super easy.
🚀 How to set it up with Vercel:

    Go to https://vercel.com and log in with GitHub.

    Click “Import Project” → Select your GitHub repo.

    Vercel detects your Next.js app automatically.

    Accept the defaults:

        Framework: Next.js

        Build command: next build

        Output: .next (Vercel handles that internally)

    Click “Deploy”.

Once connected:

✅ Every time you open or push to a PR → Vercel builds the branch and gives you a live preview URL
✅ Merging to main deploys to your production site