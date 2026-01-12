import { useNavigate } from 'react-router-dom';
import { useAuth, Language } from '@/contexts/AuthContext';
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
  Check,
  Crown
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
import PremiumBanner from '@/components/PremiumBanner';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
];

const translations: Record<Language, {
  myProfile: string;
  manageAccount: string;
  notifications: string;
  language: string;
  privacyPolicy: string;
  helpSupport: string;
  rateApp: string;
  logout: string;
  scansDone: string;
  aiQueries: string;
  orders: string;
  madeWith: string;
  editProfile: string;
  save: string;
  cancel: string;
  name: string;
  location: string;
  selectLanguage: string;
}> = {
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
  },
  pa: {
    myProfile: 'ਮੇਰੀ ਪ੍ਰੋਫ਼ਾਈਲ',
    manageAccount: 'ਆਪਣਾ ਖਾਤਾ ਪ੍ਰਬੰਧਿਤ ਕਰੋ',
    notifications: 'ਸੂਚਨਾਵਾਂ',
    language: 'ਭਾਸ਼ਾ',
    privacyPolicy: 'ਗੋਪਨੀਯਤਾ ਨੀਤੀ',
    helpSupport: 'ਸਹਾਇਤਾ',
    rateApp: 'ਐਪ ਰੇਟ ਕਰੋ',
    logout: 'ਲੌਗ ਆਉਟ',
    scansDone: 'ਸਕੈਨ ਕੀਤੇ',
    aiQueries: 'AI ਸਵਾਲ',
    orders: 'ਆਰਡਰ',
    madeWith: '❤️ ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਬਣਾਇਆ',
    editProfile: 'ਪ੍ਰੋਫ਼ਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ',
    save: 'ਸੁਰੱਖਿਅਤ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    name: 'ਨਾਮ',
    location: 'ਸਥਾਨ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
  },
  mr: {
    myProfile: 'माझी प्रोफाइल',
    manageAccount: 'तुमचे खाते व्यवस्थापित करा',
    notifications: 'सूचना',
    language: 'भाषा',
    privacyPolicy: 'गोपनीयता धोरण',
    helpSupport: 'मदत आणि समर्थन',
    rateApp: 'ॲप रेट करा',
    logout: 'लॉग आउट',
    scansDone: 'स्कॅन केले',
    aiQueries: 'AI प्रश्न',
    orders: 'ऑर्डर',
    madeWith: '❤️ भारतीय शेतकऱ्यांसाठी बनवले',
    editProfile: 'प्रोफाइल संपादित करा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    name: 'नाव',
    location: 'स्थान',
    selectLanguage: 'भाषा निवडा',
  },
  ta: {
    myProfile: 'என் சுயவிவரம்',
    manageAccount: 'உங்கள் கணக்கை நிர்வகிக்கவும்',
    notifications: 'அறிவிப்புகள்',
    language: 'மொழி',
    privacyPolicy: 'தனியுரிமை கொள்கை',
    helpSupport: 'உதவி மற்றும் ஆதரவு',
    rateApp: 'ஆப்பை மதிப்பிடு',
    logout: 'வெளியேறு',
    scansDone: 'ஸ்கேன்கள்',
    aiQueries: 'AI கேள்விகள்',
    orders: 'ஆர்டர்கள்',
    madeWith: '❤️ இந்திய விவசாயிகளுக்காக உருவாக்கப்பட்டது',
    editProfile: 'சுயவிவரத்தை திருத்து',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    name: 'பெயர்',
    location: 'இடம்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
  },
  te: {
    myProfile: 'నా ప్రొఫైల్',
    manageAccount: 'మీ ఖాతాను నిర్వహించండి',
    notifications: 'నోటిఫికేషన్లు',
    language: 'భాష',
    privacyPolicy: 'గోప్యతా విధానం',
    helpSupport: 'సహాయం మరియు మద్దతు',
    rateApp: 'యాప్ రేట్ చేయండి',
    logout: 'లాగ్ అవుట్',
    scansDone: 'స్కాన్‌లు',
    aiQueries: 'AI ప్రశ్నలు',
    orders: 'ఆర్డర్‌లు',
    madeWith: '❤️ భారతీయ రైతుల కోసం తయారు చేయబడింది',
    editProfile: 'ప్రొఫైల్ సవరించండి',
    save: 'సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',
    name: 'పేరు',
    location: 'ప్రదేశం',
    selectLanguage: 'భాషను ఎంచుకోండి',
  },
  bn: {
    myProfile: 'আমার প্রোফাইল',
    manageAccount: 'আপনার অ্যাকাউন্ট পরিচালনা করুন',
    notifications: 'বিজ্ঞপ্তি',
    language: 'ভাষা',
    privacyPolicy: 'গোপনীয়তা নীতি',
    helpSupport: 'সাহায্য ও সমর্থন',
    rateApp: 'অ্যাপ রেট করুন',
    logout: 'লগ আউট',
    scansDone: 'স্ক্যান',
    aiQueries: 'AI প্রশ্ন',
    orders: 'অর্ডার',
    madeWith: '❤️ ভারতীয় কৃষকদের জন্য তৈরি',
    editProfile: 'প্রোফাইল সম্পাদনা করুন',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
    name: 'নাম',
    location: 'অবস্থান',
    selectLanguage: 'ভাষা নির্বাচন করুন',
  },
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, updateLanguage } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');

  const currentLang = user?.language || 'en';
  const text = translations[currentLang];
  const currentLangLabel = languages.find(l => l.code === currentLang)?.label || 'English';

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

  const handleLanguageChange = (lang: Language) => {
    updateLanguage(lang);
    setIsLanguageDialogOpen(false);
  };

  const menuItems = [
    { icon: Bell, label: text.notifications, action: 'toggle', value: notifications, onChange: setNotifications },
    { icon: Globe, label: text.language, value: currentLangLabel, action: 'language' },
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

      {/* Premium Banner */}
      <div className="px-4 mt-6">
        <PremiumBanner variant="full" />
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
          <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  'w-full p-4 rounded-xl flex items-center justify-between border transition-colors',
                  currentLang === lang.code 
                    ? 'bg-primary/10 border-primary' 
                    : 'hover:bg-muted'
                )}
              >
                <span className="font-medium">{lang.label}</span>
                {currentLang === lang.code && <Check className="w-5 h-5 text-primary" />}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
