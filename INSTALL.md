# Quick Installation Guide

## Step 1: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install:
- React 19 and React DOM
- React Router v7
- Tailwind CSS v4
- Zustand (state management)
- Axios (HTTP client)
- Recharts (charts)
- Lucide React (icons)
- React Hot Toast (notifications)
- clsx and tailwind-merge (utilities)

## Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Step 3: Login

Use any credentials to login:
- **Email**: any email (e.g., `parent@test.com`)
- **Password**: any password (e.g., `password`)
- **Role**: Select Parent, Teacher, or Administrator

## Optional: Install shadcn/ui Components

For enhanced UI components, you can install shadcn/ui:

```bash
npx shadcn@latest init -y -d
```

Then add specific components as needed:

```bash
npx shadcn@latest add table dialog alert-dialog dropdown-menu calendar select checkbox switch
```

## Project Features

✅ **Implemented:**
- Login with role-based authentication
- Parent Dashboard with child overview, attendance chart, and reports
- Teacher Dashboard (placeholder)
- Admin Dashboard with analytics
- Responsive sidebar navigation
- Dark mode toggle
- Toast notifications
- State management with Zustand

🚧 **Coming Soon:**
- Messages page with real-time chat
- Full reports management
- Attendance tracking
- Events management
- Settings page
- CRUD operations for admin
- WebSocket integration

## Troubleshooting

### If dependencies fail to install:
```bash
rm -rf node_modules package-lock.json
npm install
```

### If Vite fails to start:
```bash
rm -rf node_modules/.vite
npm run dev
```

### TypeScript errors:
Make sure you have the latest TypeScript version:
```bash
npm install -D typescript@latest
```

## Next Steps

1. Explore the Parent Dashboard
2. Try different user roles (Parent, Teacher, Admin)
3. Toggle dark mode
4. Check the code structure in `src/`
5. Read `SETUP.md` for detailed documentation

Enjoy using PTConnect! 🎓