# ABC Company Product Showcase

A full-stack web application for showcasing industrial products with quote request functionality and admin dashboard.

## Features

- Product catalog with search and filtering
- Quote request system
- Admin authentication and dashboard
- Local SQLite database
- Responsive design

## Local Development

```bash
npm install
npm run dev
```

## Deployment on Render

1. Connect your GitHub repository to Render
2. Use the following settings:
   - **Build Command**: `npm install && node build.js`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV` = `production`
3. Add a disk for persistent storage:
   - **Mount Path**: `/opt/render/project/src/data`
   - **Size**: 1GB

## Database

The application uses SQLite for local storage. The database file is stored in `./data/app.db` and contains:
- Products catalog
- Quote requests
- Admin sessions

## Admin Access

- Login URL: `/admin/login`
- Admin Key: `yesyesyes`
- Dashboard: `/admin/dashboard`

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite + Drizzle ORM
- **UI**: Tailwind CSS + Shadcn/ui
- **State Management**: TanStack Query