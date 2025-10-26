import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/enums';
import { toast } from 'react-hot-toast';
import { SquareUserRound } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.PARENT);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password, role);
      toast.success('Login successful!');
      
      // Redirect based on role
      switch (role) {
        case UserRole.ADMIN:
          navigate('/admin');
          break;
        case UserRole.TEACHER:
          navigate('/teacher');
          break;
        case UserRole.PARENT:
          navigate('/parent');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
              <SquareUserRound className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="heading-2">PTConnect</h1>
            <p className="body-small text-muted-foreground mt-2">
              Parent-Teacher Communication System
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block body-small font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block body-small font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block body-small font-medium mb-2">
                Login as
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={UserRole.PARENT}>Parent</option>
                <option value={UserRole.TEACHER}>Teacher</option>
                <option value={UserRole.ADMIN}>Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}