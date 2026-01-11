import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Phone, ArrowRight, User, MapPin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const t = {
    en: {
      title: 'AgroGenius AI',
      subtitle: 'Your smart farming companion',
      loginTitle: 'Login with Phone',
      otpTitle: 'Enter OTP',
      fullName: 'Enter full name',
      phoneNumber: 'Enter phone number',
      locationPlaceholder: 'Enter location (e.g., Noida)',
      sendOtp: 'Send OTP',
      verifyLogin: 'Verify & Login',
      otpSentTo: 'OTP sent to',
      demoOtp: 'Demo OTP',
      changeDetails: 'Change details',
      terms: 'By continuing, you agree to our Terms of Service',
      selectLanguage: 'Select Language',
      invalidPhone: 'Please enter a valid 10-digit phone number',
      enterName: 'Please enter your full name',
      enterLocation: 'Please enter your location',
      invalidOtp: 'Invalid OTP. Use 1234 for demo.',
    },
    hi: {
      title: 'एग्रोजीनियस AI',
      subtitle: 'आपका स्मार्ट खेती साथी',
      loginTitle: 'फ़ोन से लॉगिन करें',
      otpTitle: 'OTP दर्ज करें',
      fullName: 'पूरा नाम दर्ज करें',
      phoneNumber: 'फ़ोन नंबर दर्ज करें',
      locationPlaceholder: 'स्थान दर्ज करें (जैसे, नोएडा)',
      sendOtp: 'OTP भेजें',
      verifyLogin: 'सत्यापित करें और लॉगिन करें',
      otpSentTo: 'OTP भेजा गया',
      demoOtp: 'डेमो OTP',
      changeDetails: 'विवरण बदलें',
      terms: 'जारी रखकर, आप हमारी सेवा की शर्तों से सहमत हैं',
      selectLanguage: 'भाषा चुनें',
      invalidPhone: 'कृपया एक मान्य 10 अंकों का फोन नंबर दर्ज करें',
      enterName: 'कृपया अपना पूरा नाम दर्ज करें',
      enterLocation: 'कृपया अपना स्थान दर्ज करें',
      invalidOtp: 'अमान्य OTP। डेमो के लिए 1234 का उपयोग करें।',
    },
  };

  const text = t[language];

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      setError(text.invalidPhone);
      return;
    }
    if (!fullName.trim()) {
      setError(text.enterName);
      return;
    }
    if (!location.trim()) {
      setError(text.enterLocation);
      return;
    }
    setShowOtp(true);
    setError('');
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      login(phone, fullName.trim(), location.trim(), language);
      navigate('/home');
    } else {
      setError(text.invalidOtp);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-agro-green-light to-background flex flex-col">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full p-1 border shadow-sm">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              language === 'en'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              language === 'hi'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            हिं
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Leaf className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{text.title}</h1>
        <p className="text-muted-foreground text-center">
          {text.subtitle}
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-card rounded-t-3xl p-6 shadow-lg animate-slide-up">
        <h2 className="text-xl font-semibold mb-6 text-center">
          {showOtp ? text.otpTitle : text.loginTitle}
        </h2>

        {!showOtp ? (
          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
                <User className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder={text.fullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl"
                maxLength={50}
              />
            </div>

            {/* Phone Number Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">+91</span>
              </div>
              <Input
                type="tel"
                placeholder={text.phoneNumber}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="pl-20 h-14 text-lg rounded-xl"
                maxLength={10}
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder={text.locationPlaceholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl"
                maxLength={50}
              />
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button 
              onClick={handleSendOtp} 
              className="w-full h-14 text-lg rounded-xl gap-2"
              disabled={phone.length !== 10 || !fullName.trim() || !location.trim()}
            >
              {text.sendOtp}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center mb-4">
              {text.otpSentTo} +91 {phone}
            </p>
            <Input
              type="tel"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="h-14 text-2xl text-center tracking-[0.5em] rounded-xl"
              maxLength={4}
            />
            <p className="text-xs text-muted-foreground text-center">
              {text.demoOtp}: <span className="font-mono font-bold">1234</span>
            </p>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button 
              onClick={handleVerifyOtp} 
              className="w-full h-14 text-lg rounded-xl gap-2"
              disabled={otp.length !== 4}
            >
              {text.verifyLogin}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <button 
              onClick={() => { setShowOtp(false); setOtp(''); setError(''); }}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {text.changeDetails}
            </button>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6">
          {text.terms}
        </p>
      </div>
    </div>
  );
};

export default Login;
