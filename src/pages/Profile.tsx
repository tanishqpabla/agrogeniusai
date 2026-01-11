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
  Star,
  Pencil,
  X,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, updateLanguage } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');

  const t = {
    en: {
      myProfile: 'My Profile',
      manageAccount: 'Manage your account',
      notifications: 'Notifications',
      language: 'Language',
      privacyPolicy: 'Privacy Policy',
      helpSupport: 'Help & Support',
      rateApp: 'Rate App',
      logout: 'Logout',
      scansDone: 'Scans Done',
      aiQueries: 'AI Queries',
      orders: 'Orders',
      madeWith: 'Made with ❤️ for Indian Farmers',
      editProfile: 'Edit Profile',
      save: 'Save',
      cancel: 'Cancel',
      name: 'Name',
      location: 'Location',
      selectLanguage: 'Select Language',
      english: 'English',
      hindi: 'हिंदी',
    },
    hi: {
      myProfile: 'मेरी प्रोफ़ाइल',
      manageAccount: 'अपना खाता प्रबंधित करें',
      notifications: 'सूचनाएं',
      language: 'भाषा',
      privacyPolicy: 'गोपनीयता नीति',
      helpSupport: 'सहायता और समर्थन',
      rateApp: 'ऐप रेट करें',
      logout: 'लॉग आउट',
      scansDone: 'स्कैन किए गए',
      aiQueries: 'AI प्रश्न',
      orders: 'ऑर्डर',
      madeWith: '❤️ भारतीय किसानों के लिए बनाया गया',
      editProfile: 'प्रोफ़ाइल संपादित करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      name: 'नाम',
      location: 'स्थान',
      selectLanguage: 'भाषा चुनें',
      english: 'English',
      hindi: 'हिंदी',
    },
  };

  const currentLang = user?.language || 'en';
  const text = t[currentLang];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = () => {
    if (editName.trim() && editLocation.trim()) {
      updateProfile(editName.trim(), editLocation.trim());
      setIsEditingProfile(false);
    }
  };

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    updateLanguage(lang);
    setIsLanguageDialogOpen(false);
  };

  const menuItems = [
    { icon: Bell, label: text.notifications, action: 'toggle', value: notifications, onChange: setNotifications },
    { icon: Globe, label: text.language, value: currentLang === 'en' ? 'English' : 'हिंदी', action: 'language' },
    { icon: Shield, label: text.privacyPolicy, action: 'navigate' },
    { icon: HelpCircle, label: text.helpSupport, action: 'navigate' },
    { icon: Star, label: text.rateApp, action: 'navigate' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-agro-leaf p-6 pb-20 rounded-b-3xl">
        <h1 className="text-xl font-bold text-primary-foreground mb-1">{text.myProfile}</h1>
        <p className="text-primary-foreground/80 text-sm">{text.manageAccount}</p>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-14">
        <div className="bg-card rounded-2xl p-5 shadow-lg border relative">
          <button
            onClick={() => {
              setEditName(user?.name || '');
              setEditLocation(user?.location || '');
              setIsEditingProfile(true);
            }}
            className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <Pencil className="w-4 h-4 text-primary" />
          </button>
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
            <p className="text-xs text-muted-foreground">{text.scansDone}</p>
          </div>
          <div className="bg-agro-sky-light rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-agro-sky">28</p>
            <p className="text-xs text-muted-foreground">{text.aiQueries}</p>
          </div>
          <div className="bg-agro-sun-light rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-agro-sun">5</p>
            <p className="text-xs text-muted-foreground">{text.orders}</p>
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
                className={cn(
                  'flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors',
                  index !== menuItems.length - 1 ? 'border-b' : ''
                )}
                onClick={() => {
                  if (item.action === 'language') {
                    setIsLanguageDialogOpen(true);
                  }
                }}
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
                ) : item.action === 'language' ? (
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
          <p className="text-xs text-muted-foreground mt-1">{text.madeWith}</p>
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
          {text.logout}
        </Button>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{text.editProfile}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                {text.name}
              </label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder={text.name}
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                {text.location}
              </label>
              <Input
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder={text.location}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(false)}
                className="flex-1 h-12 rounded-xl"
              >
                {text.cancel}
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="flex-1 h-12 rounded-xl"
                disabled={!editName.trim() || !editLocation.trim()}
              >
                {text.save}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Selection Dialog */}
      <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{text.selectLanguage}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            <button
              onClick={() => handleLanguageChange('en')}
              className={cn(
                'w-full p-4 rounded-xl flex items-center justify-between border transition-colors',
                currentLang === 'en' 
                  ? 'bg-primary/10 border-primary' 
                  : 'hover:bg-muted'
              )}
            >
              <span className="font-medium">{text.english}</span>
              {currentLang === 'en' && <Check className="w-5 h-5 text-primary" />}
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={cn(
                'w-full p-4 rounded-xl flex items-center justify-between border transition-colors',
                currentLang === 'hi' 
                  ? 'bg-primary/10 border-primary' 
                  : 'hover:bg-muted'
              )}
            >
              <span className="font-medium">{text.hindi}</span>
              {currentLang === 'hi' && <Check className="w-5 h-5 text-primary" />}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
