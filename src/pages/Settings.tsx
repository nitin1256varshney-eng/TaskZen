import { useState } from 'react';
import { Moon, Sun, User, Bell, Shield, Palette, Save } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateProfile, isLoading } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [notifications, setNotifications] = useState({
    dueDateReminders: true,
    taskCompletion: true,
    emailNotifications: false,
  });

  const handleProfileSave = async () => {
    if (user) {
      await updateProfile(profileData);
    }
  };

  const userInitials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : 'U';

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Profile</h2>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                className="bg-secondary/50" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                className="bg-secondary/50" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="bg-secondary/50" 
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleProfileSave} disabled={isLoading} className="gradient-primary">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Appearance</h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'light' ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium text-card-foreground">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                {theme === 'dark' ? 'Currently using dark theme' : 'Currently using light theme'}
              </p>
            </div>
          </div>
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Due Date Reminders</p>
              <p className="text-sm text-muted-foreground">Get notified before tasks are due</p>
            </div>
            <Switch 
              checked={notifications.dueDateReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, dueDateReminders: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Task Completion</p>
              <p className="text-sm text-muted-foreground">Notify when tasks are completed</p>
            </div>
            <Switch 
              checked={notifications.taskCompletion}
              onCheckedChange={(checked) => setNotifications({ ...notifications, taskCompletion: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email for important updates</p>
            </div>
            <Switch 
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" className="bg-secondary/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" className="bg-secondary/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" className="bg-secondary/50" />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline">Update Password</Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-xl border border-destructive/30 p-6 shadow-soft animate-slide-up">
        <h2 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
};

export default Settings;
