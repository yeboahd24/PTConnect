import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { Login } from './pages/Login';
import { ParentDashboard } from './pages/ParentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Messages } from './pages/Messages';
import { Reports } from './pages/Reports';
import { Attendance } from './pages/Attendance';
import { Events } from './pages/Events';
import { Settings } from './pages/Settings';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/parent" replace />} />
            <Route path="parent" element={<ParentDashboard />} />
            <Route path="teacher" element={<TeacherDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="dashboard" element={<Navigate to="/parent" replace />} />
            <Route path="messages" element={<Messages />} />
            <Route path="reports" element={<Reports />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="events" element={<Events />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)',
          },
          success: {
            iconTheme: {
              primary: 'var(--success)',
              secondary: 'var(--success-foreground)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--destructive)',
              secondary: 'var(--destructive-foreground)',
            },
          },
        }}
      />
    </>
  );
}

export default App;