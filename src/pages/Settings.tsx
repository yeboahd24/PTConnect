import { useState } from 'react';
import { User, Lock, Bell, Moon, Sun } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { toast } from 'react-hot-toast';

export function Settings() {
  const { user, logout } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reportNotifications, setReportNotifications] = useState(true);
  const [attendanceNotifications, setAttendanceNotifications] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    toast.success('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1 mb-2">Settings</h1>
        <p className="body-normal text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <CardTitle>Profile Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
              )}
              <button
                type="button"
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Change Photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block body-small font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="block body-small font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block body-small font-medium mb-2">Role</label>
              <input
                type="text"
                value={user?.role || ''}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-input bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <CardTitle>Change Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block body-small font-medium mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block body-small font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block body-small font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <p className="body-small text-muted-foreground">
              Password must be at least 8 characters long
            </p>

            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Change Password
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="body-normal font-medium">Email Notifications</p>
                <p className="body-small text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  emailNotifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="body-normal font-medium">Push Notifications</p>
                <p className="body-small text-muted-foreground">
                  Receive push notifications in browser
                </p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  pushNotifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    pushNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="body-normal font-medium">Report Notifications</p>
                <p className="body-small text-muted-foreground">
                  Get notified when new reports are available
                </p>
              </div>
              <button
                onClick={() => setReportNotifications(!reportNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  reportNotifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    reportNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="body-normal font-medium">Attendance Notifications</p>
                <p className="body-small text-muted-foreground">
                  Get notified about attendance updates
                </p>
              </div>
              <button
                onClick={() => setAttendanceNotifications(!attendanceNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  attendanceNotifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    attendanceNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="body-normal font-medium">Event Notifications</p>
                <p className="body-small text-muted-foreground">
                  Get notified about upcoming events
                </p>
              </div>
              <button
                onClick={() => setEventNotifications(!eventNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  eventNotifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    eventNotifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleSaveNotifications}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <CardTitle>Appearance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="body-normal font-medium">Dark Mode</p>
              <p className="body-small text-muted-foreground">
                Toggle between light and dark theme
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="body-normal font-medium mb-2">Logout</p>
              <p className="body-small text-muted-foreground mb-4">
                Sign out of your account
              </p>
              <button
                onClick={logout}
                className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}