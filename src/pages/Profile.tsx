import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  MapPin, 
  Phone, 
  Globe, 
  LogOut, 
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: Bell, label: 'Notifications', action: 'toggle', value: notifications, onChange: setNotifications },
    { icon: Globe, label: 'Language', value: language, action: 'select' },
    { icon: Shield, label: 'Privacy Policy', action: 'navigate' },
    { icon: HelpCircle, label: 'Help & Support', action: 'navigate' },
    { icon: Star, label: 'Rate App', action: 'navigate' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-agro-leaf p-6 pb-20 rounded-b-3xl">
        <h1 className="text-xl font-bold text-primary-foreground mb-1">My Profile</h1>
        <p className="text-primary-foreground/80 text-sm">Manage your account</p>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-14">
        <div className="bg-card rounded-2xl p-5 shadow-lg border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{user?.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 {user?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-agro-green-light rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Scans Done</p>
          </div>
          <div className="bg-agro-sky-light rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-agro-sky">28</p>
            <p className="text-xs text-muted-foreground">AI Queries</p>
          </div>
          <div className="bg-agro-sun-light rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-agro-sun">5</p>
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-6">
        <div className="bg-card rounded-2xl border overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center justify-between p-4 ${
                  index !== menuItems.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                {item.action === 'toggle' ? (
                  <Switch 
                    checked={item.value as boolean} 
                    onCheckedChange={item.onChange as (checked: boolean) => void} 
                  />
                ) : item.action === 'select' ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">{item.value}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* App Info */}
      <div className="px-4 mt-6">
        <div className="bg-muted/50 rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground">AgroGenius AI v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">Made with ❤️ for Indian Farmers</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <Button 
          variant="destructive" 
          className="w-full h-12 rounded-xl gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
