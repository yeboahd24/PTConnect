# PTConnect Setup Instructions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Login Credentials

You can login with any email and password. The system uses mock authentication.

**Test Credentials:**
- Email: `parent@test.com` or any email
- Password: `password` or any password
- Role: Select from Parent, Teacher, or Administrator

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── ChildOverviewCard.tsx
│   │   ├── AttendanceChart.tsx
│   │   └── ReportsTable.tsx
│   ├── layout/             # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── DashboardLayout.tsx
│   └── ui/                 # Reusable UI components
│       └── Card.tsx
├── data/
│   └── mockData.ts         # Mock data for development
├── lib/
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Login.tsx           # Login page
│   └── ParentDashboard.tsx # Parent dashboard
├── services/
│   └── api.ts              # API configuration
├── store/
│   ├── authStore.ts        # Authentication state
│   ├── notificationStore.ts # Notifications state
│   ├── themeStore.ts       # Theme state
│   └── sidebarStore.ts     # Sidebar state
├── types/
│   ├── enums.ts            # Enums
│   └── schema.ts           # TypeScript interfaces
├── utils/
│   └── formatters.ts       # Formatting utilities
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles with theme
```

## Features Implemented

### ✅ Completed
- Role-based authentication (Parent, Teacher, Admin)
- Responsive dashboard layout with collapsible sidebar
- Parent Dashboard with:
  - Child overview card
  - Attendance history chart (Recharts)
  - Latest reports table
- Dark mode toggle
- Toast notifications
- State management with Zustand
- Mock data for development

### 🚧 To Be Implemented
- Teacher Dashboard
- Admin Dashboard
- Messages page with real-time chat
- Reports management page
- Attendance tracking page
- Events management page
- Settings page
- Additional CRUD operations
- WebSocket integration for real-time features

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router v7** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Recharts** - Charts and graphs
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Theme

The app uses a clean, school-friendly color scheme:
- Primary: Blue (#2563eb)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Destructive: Red (#ef4444)

## API Integration

The app is configured to work with a backend API. Update the `.env` file to point to your API:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Currently using mock data for development. Replace mock data calls with actual API calls when backend is ready.

## Next Steps

1. Install shadcn/ui components for enhanced UI:
```bash
npx shadcn@latest init -y -d
npx shadcn@latest add table dialog alert-dialog dropdown-menu calendar select checkbox switch
```

2. Implement remaining pages (Teacher Dashboard, Admin Dashboard, etc.)
3. Add WebSocket support for real-time messaging
4. Integrate with backend API
5. Add form validation with React Hook Form
6. Implement data fetching with React Query or SWR
7. Add unit tests with Vitest
8. Add E2E tests with Playwright

## Development Tips

- Use the dark mode toggle in the top bar to test both themes
- The sidebar can be collapsed/expanded using the menu button
- All routes are protected and require authentication
- Mock data is located in `src/data/mockData.ts`
- Add new routes in `src/App.tsx`

## Troubleshooting

If you encounter any issues:

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear Vite cache:
```bash
rm -rf node_modules/.vite
```

3. Check that all dependencies are installed correctly
4. Ensure you're using Node.js v18 or higher