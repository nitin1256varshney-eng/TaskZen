import { Moon, Sun, User, Bell, Shield, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

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
              JD
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
              <Input id="firstName" defaultValue="John" className="bg-secondary/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" className="bg-secondary/50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" className="bg-secondary/50" />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="gradient-primary">Save Changes</Button>
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
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Task Completion</p>
              <p className="text-sm text-muted-foreground">Notify when tasks are completed</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email for important updates</p>
            </div>
            <Switch />
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
