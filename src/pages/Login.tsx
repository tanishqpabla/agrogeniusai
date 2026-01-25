import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Language } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, ArrowRight, User, MapPin, ChevronDown, Navigation, Loader2, MapPinned } from 'lucide-react';
import agrogenisLogo from '@/assets/agrogenius-logo.png';
import { cn } from '@/lib/utils';
import { useGeolocation } from '@/hooks/useGeolocation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const languages: { code: Language; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिंदी', short: 'हिं' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', short: 'ਪੰ' },
  { code: 'mr', label: 'मराठी', short: 'म' },
  { code: 'ta', label: 'தமிழ்', short: 'த' },
  { code: 'te', label: 'తెలుగు', short: 'తె' },
  { code: 'bn', label: 'বাংলা', short: 'বা' },
];

const translations: Record<Language, {
  title: string;
  subtitle: string;
  loginTitle: string;
  otpTitle: string;
  fullName: string;
  phoneNumber: string;
  locationPlaceholder: string;
  sendOtp: string;
  verifyLogin: string;
  otpSentTo: string;
  demoOtp: string;
  changeDetails: string;
  terms: string;
  selectLanguage: string;
  invalidPhone: string;
  enterName: string;
  enterLocation: string;
  invalidOtp: string;
  locationPermission: string;
  locationPermissionDesc: string;
  allowLocation: string;
  manualEntry: string;
  detectingLocation: string;
}> = {
  en: {
    title: 'AgroGenius AI',
    subtitle: 'Your smart farming companion',
    loginTitle: 'Login with Phone',
    otpTitle: 'Enter OTP',
    fullName: 'Enter full name',
    phoneNumber: 'Enter phone number',
    locationPlaceholder: 'Enter location (e.g., Noida)',
    sendOtp: 'Enter',
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
    locationPermission: 'Enable Location Access',
    locationPermissionDesc: 'Allow AgroGenius AI to access your location for accurate weather forecasts, market prices, and farming advisories specific to your area.',
    allowLocation: 'Allow Location',
    manualEntry: 'Enter Manually',
    detectingLocation: 'Detecting your location...',
  },
  hi: {
    title: 'एग्रोजीनियस AI',
    subtitle: 'आपका स्मार्ट खेती साथी',
    loginTitle: 'फ़ोन से लॉगिन करें',
    otpTitle: 'OTP दर्ज करें',
    fullName: 'पूरा नाम दर्ज करें',
    phoneNumber: 'फ़ोन नंबर दर्ज करें',
    locationPlaceholder: 'स्थान दर्ज करें (जैसे, नोएडा)',
    sendOtp: 'प्रवेश करें',
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
    locationPermission: 'स्थान एक्सेस सक्षम करें',
    locationPermissionDesc: 'सटीक मौसम पूर्वानुमान, बाजार मूल्य और आपके क्षेत्र के लिए खेती सलाह के लिए AgroGenius AI को आपके स्थान तक पहुंचने दें।',
    allowLocation: 'स्थान की अनुमति दें',
    manualEntry: 'मैन्युअल रूप से दर्ज करें',
    detectingLocation: 'आपका स्थान पता लगाया जा रहा है...',
  },
  pa: {
    title: 'ਐਗਰੋਜੀਨੀਅਸ AI',
    subtitle: 'ਤੁਹਾਡਾ ਸਮਾਰਟ ਖੇਤੀ ਸਾਥੀ',
    loginTitle: 'ਫ਼ੋਨ ਨਾਲ ਲੌਗਇਨ ਕਰੋ',
    otpTitle: 'OTP ਦਾਖਲ ਕਰੋ',
    fullName: 'ਪੂਰਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
    phoneNumber: 'ਫ਼ੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ',
    locationPlaceholder: 'ਸਥਾਨ ਦਾਖਲ ਕਰੋ',
    sendOtp: 'ਦਾਖਲ ਕਰੋ',
    verifyLogin: 'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਲੌਗਇਨ ਕਰੋ',
    otpSentTo: 'OTP ਭੇਜਿਆ ਗਿਆ',
    demoOtp: 'ਡੈਮੋ OTP',
    changeDetails: 'ਵੇਰਵੇ ਬਦਲੋ',
    terms: 'ਜਾਰੀ ਰੱਖ ਕੇ, ਤੁਸੀਂ ਸਾਡੀਆਂ ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ ਨਾਲ ਸਹਿਮਤ ਹੋ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    invalidPhone: 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ 10-ਅੰਕੀ ਫ਼ੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ',
    enterName: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
    enterLocation: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਸਥਾਨ ਦਾਖਲ ਕਰੋ',
    invalidOtp: 'ਅਵੈਧ OTP। ਡੈਮੋ ਲਈ 1234 ਵਰਤੋ।',
    locationPermission: 'ਸਥਾਨ ਐਕਸੈਸ ਸਮਰੱਥ ਕਰੋ',
    locationPermissionDesc: 'ਸਹੀ ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ, ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਅਤੇ ਤੁਹਾਡੇ ਖੇਤਰ ਲਈ ਖੇਤੀ ਸਲਾਹ ਲਈ AgroGenius AI ਨੂੰ ਤੁਹਾਡੇ ਸਥਾਨ ਤੱਕ ਪਹੁੰਚ ਦਿਓ।',
    allowLocation: 'ਸਥਾਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ',
    manualEntry: 'ਹੱਥੀਂ ਦਾਖਲ ਕਰੋ',
    detectingLocation: 'ਤੁਹਾਡਾ ਸਥਾਨ ਲੱਭਿਆ ਜਾ ਰਿਹਾ ਹੈ...',
  },
  mr: {
    title: 'ॲग्रोजीनियस AI',
    subtitle: 'तुमचा स्मार्ट शेती साथीदार',
    loginTitle: 'फोनने लॉगिन करा',
    otpTitle: 'OTP टाका',
    fullName: 'पूर्ण नाव टाका',
    phoneNumber: 'फोन नंबर टाका',
    locationPlaceholder: 'स्थान टाका',
    sendOtp: 'प्रवेश करा',
    verifyLogin: 'सत्यापित करा आणि लॉगिन करा',
    otpSentTo: 'OTP पाठवला',
    demoOtp: 'डेमो OTP',
    changeDetails: 'तपशील बदला',
    terms: 'पुढे जाऊन, तुम्ही आमच्या सेवा अटींशी सहमत आहात',
    selectLanguage: 'भाषा निवडा',
    invalidPhone: 'कृपया वैध 10-अंकी फोन नंबर टाका',
    enterName: 'कृपया तुमचे पूर्ण नाव टाका',
    enterLocation: 'कृपया तुमचे स्थान टाका',
    invalidOtp: 'अवैध OTP। डेमोसाठी 1234 वापरा।',
    locationPermission: 'स्थान प्रवेश सक्षम करा',
    locationPermissionDesc: 'अचूक हवामान अंदाज, बाजार भाव आणि तुमच्या क्षेत्रासाठी शेती सल्ला यासाठी AgroGenius AI ला तुमच्या स्थानात प्रवेश करू द्या।',
    allowLocation: 'स्थान परवानगी द्या',
    manualEntry: 'मॅन्युअली प्रविष्ट करा',
    detectingLocation: 'तुमचे स्थान शोधत आहे...',
  },
  ta: {
    title: 'அக்ரோஜீனியஸ் AI',
    subtitle: 'உங்கள் ஸ்மார்ட் விவசாய நண்பர்',
    loginTitle: 'தொலைபேசியில் உள்நுழையுங்கள்',
    otpTitle: 'OTP உள்ளிடவும்',
    fullName: 'முழு பெயரை உள்ளிடவும்',
    phoneNumber: 'தொலைபேசி எண் உள்ளிடவும்',
    locationPlaceholder: 'இடத்தை உள்ளிடவும்',
    sendOtp: 'உள்ளிடவும்',
    verifyLogin: 'சரிபார்த்து உள்நுழையுங்கள்',
    otpSentTo: 'OTP அனுப்பப்பட்டது',
    demoOtp: 'டெமோ OTP',
    changeDetails: 'விவரங்களை மாற்று',
    terms: 'தொடர்வதன் மூலம், நீங்கள் எங்கள் சேவை விதிமுறைகளை ஏற்கிறீர்கள்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    invalidPhone: 'சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்',
    enterName: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    enterLocation: 'உங்கள் இடத்தை உள்ளிடவும்',
    invalidOtp: 'தவறான OTP. டெமோவிற்கு 1234 பயன்படுத்தவும்.',
    locationPermission: 'இருப்பிட அணுகலை இயக்கு',
    locationPermissionDesc: 'துல்லியமான வானிலை முன்னறிவிப்பு, சந்தை விலைகள் மற்றும் உங்கள் பகுதிக்கான விவசாய ஆலோசனைகளுக்கு AgroGenius AI உங்கள் இருப்பிடத்தை அணுக அனுமதிக்கவும்.',
    allowLocation: 'இருப்பிடத்தை அனுமதி',
    manualEntry: 'கைமுறையாக உள்ளிடவும்',
    detectingLocation: 'உங்கள் இருப்பிடம் கண்டறியப்படுகிறது...',
  },
  te: {
    title: 'అగ్రోజీనియస్ AI',
    subtitle: 'మీ స్మార్ట్ వ్యవసాయ సహచరుడు',
    loginTitle: 'ఫోన్‌తో లాగిన్ అవ్వండి',
    otpTitle: 'OTP నమోదు చేయండి',
    fullName: 'పూర్తి పేరు నమోదు చేయండి',
    phoneNumber: 'ఫోన్ నంబర్ నమోదు చేయండి',
    locationPlaceholder: 'ప్రదేశం నమోదు చేయండి',
    sendOtp: 'ఎంటర్',
    verifyLogin: 'ధృవీకరించి లాగిన్ అవ్వండి',
    otpSentTo: 'OTP పంపబడింది',
    demoOtp: 'డెమో OTP',
    changeDetails: 'వివరాలు మార్చండి',
    terms: 'కొనసాగించడం ద్వారా, మీరు మా సేవా నిబంధనలను అంగీకరిస్తున్నారు',
    selectLanguage: 'భాషను ఎంచుకోండి',
    invalidPhone: 'దయచేసి చెల్లుబాటు అయ్యే 10 అంకెల ఫోన్ నంబర్ నమోదు చేయండి',
    enterName: 'దయచేసి మీ పూర్తి పేరు నమోదు చేయండి',
    enterLocation: 'దయచేసి మీ ప్రదేశం నమోదు చేయండి',
    invalidOtp: 'చెల్లని OTP. డెమో కోసం 1234 ఉపయోగించండి.',
    locationPermission: 'స్థాన యాక్సెస్ ప్రారంభించండి',
    locationPermissionDesc: 'ఖచ్చితమైన వాతావరణ సూచన, మార్కెట్ ధరలు మరియు మీ ప్రాంతానికి వ్యవసాయ సలహాల కోసం AgroGenius AI మీ స్థానాన్ని యాక్సెస్ చేయడానికి అనుమతించండి.',
    allowLocation: 'స్థానం అనుమతించండి',
    manualEntry: 'మాన్యువల్‌గా నమోదు చేయండి',
    detectingLocation: 'మీ స్థానం గుర్తించబడుతోంది...',
  },
  bn: {
    title: 'অ্যাগ্রোজিনিয়াস AI',
    subtitle: 'আপনার স্মার্ট কৃষি সঙ্গী',
    loginTitle: 'ফোন দিয়ে লগইন করুন',
    otpTitle: 'OTP লিখুন',
    fullName: 'পুরো নাম লিখুন',
    phoneNumber: 'ফোন নম্বর লিখুন',
    locationPlaceholder: 'অবস্থান লিখুন',
    sendOtp: 'প্রবেশ করুন',
    verifyLogin: 'যাচাই করুন এবং লগইন করুন',
    otpSentTo: 'OTP পাঠানো হয়েছে',
    demoOtp: 'ডেমো OTP',
    changeDetails: 'বিবরণ পরিবর্তন করুন',
    terms: 'চালিয়ে যাওয়ার মাধ্যমে, আপনি আমাদের সেবার শর্তাবলীতে সম্মত হচ্ছেন',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    invalidPhone: 'অনুগ্রহ করে একটি বৈধ 10-সংখ্যার ফোন নম্বর লিখুন',
    enterName: 'অনুগ্রহ করে আপনার পুরো নাম লিখুন',
    enterLocation: 'অনুগ্রহ করে আপনার অবস্থান লিখুন',
    invalidOtp: 'অবৈধ OTP। ডেমোর জন্য 1234 ব্যবহার করুন।',
    locationPermission: 'অবস্থান অ্যাক্সেস সক্ষম করুন',
    locationPermissionDesc: 'সঠিক আবহাওয়ার পূর্বাভাস, বাজার মূল্য এবং আপনার এলাকার জন্য কৃষি পরামর্শের জন্য AgroGenius AI কে আপনার অবস্থান অ্যাক্সেস করতে দিন।',
    allowLocation: 'অবস্থান অনুমতি দিন',
    manualEntry: 'ম্যানুয়ালি লিখুন',
    detectingLocation: 'আপনার অবস্থান সনাক্ত করা হচ্ছে...',
  },
};

const Login = () => {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [error, setError] = useState('');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loading: gpsLoading, getCurrentLocation } = useGeolocation();

  const text = translations[language];
  const currentLang = languages.find(l => l.code === language) || languages[0];

  // Show location permission dialog on mount
  useEffect(() => {
    const hasAskedLocation = sessionStorage.getItem('locationAsked');
    if (!hasAskedLocation) {
      // Small delay to let page render first
      const timer = setTimeout(() => {
        setShowLocationDialog(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllowLocation = async () => {
    setShowLocationDialog(false);
    setIsDetectingLocation(true);
    sessionStorage.setItem('locationAsked', 'true');
    
    const result = await getCurrentLocation();
    setIsDetectingLocation(false);
    
    if (result?.city) {
      setLocation(result.city);
    }
  };

  const handleManualEntry = () => {
    setShowLocationDialog(false);
    sessionStorage.setItem('locationAsked', 'true');
  };

  const handleDetectLocation = async () => {
    const result = await getCurrentLocation();
    if (result?.city) {
      setLocation(result.city);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setError('');
    login(phone, fullName.trim(), location.trim(), language);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-agro-green-light to-background flex flex-col">
      {/* Language Dropdown */}
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-3 py-2 border shadow-sm text-sm font-medium">
              {currentLang.short}
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[150px]">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'cursor-pointer',
                  language === lang.code && 'bg-primary/10 text-primary'
                )}
              >
                <span className="mr-2">{lang.short}</span>
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 mb-4 animate-fade-in">
          <img 
            src={agrogenisLogo} 
            alt="AgroGenius AI Logo" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{text.title}</h1>
        <p className="text-muted-foreground text-center">
          {text.subtitle}
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-card rounded-t-3xl p-6 shadow-lg animate-slide-up">
        <h2 className="text-xl font-semibold mb-6 text-center">
          {text.loginTitle}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Location Input with GPS Button */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
              <MapPin className="w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder={text.locationPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-12 pr-14 h-14 text-lg rounded-xl"
              maxLength={50}
            />
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={gpsLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors disabled:opacity-50"
            >
              {gpsLoading ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <Navigation className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button 
            type="submit"
            className="w-full h-14 text-lg rounded-xl gap-2"
            disabled={phone.length !== 10 || !fullName.trim() || !location.trim()}
          >
            {text.sendOtp}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          {text.terms}
        </p>
      </div>

      {/* Location Permission Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="max-w-[340px] rounded-2xl">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPinned className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-xl">{text.locationPermission}</DialogTitle>
            <DialogDescription className="text-sm mt-2">
              {text.locationPermissionDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button 
              onClick={handleAllowLocation} 
              className="w-full h-12 rounded-xl gap-2"
            >
              <Navigation className="w-5 h-5" />
              {text.allowLocation}
            </Button>
            <Button 
              onClick={handleManualEntry} 
              variant="outline" 
              className="w-full h-12 rounded-xl"
            >
              {text.manualEntry}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Detection Overlay */}
      {isDetectingLocation && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-6 text-center shadow-lg">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium">{text.detectingLocation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
