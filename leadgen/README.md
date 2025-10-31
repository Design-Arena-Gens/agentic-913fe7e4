## Beauty Lead Vault

A ready-to-use outreach dashboard for social media agencies looking to work with Indian beauty and personal care startups. The app showcases 50 verified Instagram-first brands with segment filters and quick-access profile links.

### Features

- Curated list of 50 Indian beauty and personal care startups with active Instagram profiles.
- Segment filter and fuzzy search across brand name, handle, and positioning.
- Clean, responsive UI optimised for quick qualification and outreach prep.

### Data Source

The list in `src/data/leads.ts` is curated from publicly available Instagram handles of Indian beauty, personal care, and grooming startups. Each entry includes the brand name, Instagram handle, focus area, and category segment.

### Local Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the dashboard.

### Production Build

```bash
npm run build
npm run start
```

### Deployment

The project is optimised for hosting on Vercel (`vercel build` / `vercel deploy`). Update the deployment name or token as needed in your CI/CD workflow.
