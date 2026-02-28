import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Loader2, AlertTriangle, Sprout, Droplet, Bug, Wheat } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth, Language } from '@/contexts/AuthContext';
import { useWeather, getWeatherIcon } from '@/hooks/useWeather';
import PageHeader from '@/components/PageHeader';

const districts = [
  // Haryana
  'Hisar', 'Karnal', 'Panipat', 'Rohtak', 'Ambala', 
  'Sirsa', 'Fatehabad', 'Jind', 'Kaithal', 'Kurukshetra',
  'Sonipat', 'Yamunanagar', 'Panchkula', 'Faridabad', 'Gurugram',
  // Madhya Pradesh (Indore & nearby)
  'Indore', 'Dewas', 'Ujjain', 'Dhar', 'Ratlam',
  'Khargone', 'Khandwa', 'Shajapur', 'Mandsaur', 'Sehore',
  'Bhopal', 'Mhow', 'Sanwer', 'Depalpur', 'Burhanpur',
];

const pageTranslations: Record<Language, {
  title: string;
  subtitle: string;
  forecast: string;
  recommendations: string;
  rainAlert: string;
  selectDistrict: string;
  loading: string;
  error: string;
  retry: string;
  advisory: string;
  cropAdvisory: string;
  irrigationAdvisory: string;
  pestAdvisory: string;
  harvestAdvisory: string;
  generalTips: string;
}> = {
  en: {
    title: 'Weather Advisory',
    subtitle: 'Farming recommendations based on weather',
    forecast: '7-Day Forecast',
    recommendations: '🌾 Detailed Farming Advisory',
    rainAlert: 'Weather Alert',
    selectDistrict: 'Select District',
    loading: 'Loading weather data...',
    error: 'Failed to load weather',
    retry: 'Retry',
    advisory: 'Today\'s Advisory',
    cropAdvisory: 'Crop Advisory',
    irrigationAdvisory: 'Irrigation Advisory',
    pestAdvisory: 'Pest & Disease Alert',
    harvestAdvisory: 'Harvest Advisory',
    generalTips: 'General Tips',
  },
  hi: {
    title: 'मौसम सलाहकार',
    subtitle: 'मौसम के आधार पर खेती की सिफारिशें',
    forecast: '7-दिन का पूर्वानुमान',
    recommendations: '🌾 विस्तृत खेती सलाह',
    rainAlert: 'मौसम चेतावनी',
    selectDistrict: 'जिला चुनें',
    loading: 'मौसम डेटा लोड हो रहा है...',
    error: 'मौसम लोड करने में विफल',
    retry: 'पुनः प्रयास करें',
    advisory: 'आज की सलाह',
    cropAdvisory: 'फसल सलाह',
    irrigationAdvisory: 'सिंचाई सलाह',
    pestAdvisory: 'कीट और रोग चेतावनी',
    harvestAdvisory: 'कटाई सलाह',
    generalTips: 'सामान्य सुझाव',
  },
  pa: {
    title: 'ਮੌਸਮ ਸਲਾਹਕਾਰ',
    subtitle: 'ਮੌਸਮ ਦੇ ਆਧਾਰ \'ਤੇ ਖੇਤੀ ਸਿਫਾਰਸ਼ਾਂ',
    forecast: '7-ਦਿਨ ਪੂਰਵ ਅਨੁਮਾਨ',
    recommendations: '🌾 ਵਿਸਤ੍ਰਿਤ ਖੇਤੀ ਸਲਾਹ',
    rainAlert: 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
    selectDistrict: 'ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ',
    loading: 'ਮੌਸਮ ਡੇਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    error: 'ਮੌਸਮ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਫਲ',
    retry: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
    advisory: 'ਅੱਜ ਦੀ ਸਲਾਹ',
    cropAdvisory: 'ਫ਼ਸਲ ਸਲਾਹ',
    irrigationAdvisory: 'ਸਿੰਚਾਈ ਸਲਾਹ',
    pestAdvisory: 'ਕੀੜੇ ਅਤੇ ਬਿਮਾਰੀ ਚੇਤਾਵਨੀ',
    harvestAdvisory: 'ਵਾਢੀ ਸਲਾਹ',
    generalTips: 'ਆਮ ਸੁਝਾਅ',
  },
  mr: {
    title: 'हवामान सल्लागार',
    subtitle: 'हवामानावर आधारित शेती शिफारसी',
    forecast: '7-दिवसांचा अंदाज',
    recommendations: '🌾 तपशीलवार शेती सल्ला',
    rainAlert: 'हवामान इशारा',
    selectDistrict: 'जिल्हा निवडा',
    loading: 'हवामान डेटा लोड होत आहे...',
    error: 'हवामान लोड करण्यात अयशस्वी',
    retry: 'पुन्हा प्रयत्न करा',
    advisory: 'आजचा सल्ला',
    cropAdvisory: 'पीक सल्ला',
    irrigationAdvisory: 'सिंचन सल्ला',
    pestAdvisory: 'कीड आणि रोग इशारा',
    harvestAdvisory: 'कापणी सल्ला',
    generalTips: 'सामान्य टिप्स',
  },
  ta: {
    title: 'வானிலை ஆலோசனை',
    subtitle: 'வானிலையின் அடிப்படையில் விவசாய பரிந்துரைகள்',
    forecast: '7 நாள் முன்னறிவிப்பு',
    recommendations: '🌾 விரிவான விவசாய ஆலோசனை',
    rainAlert: 'வானிலை எச்சரிக்கை',
    selectDistrict: 'மாவட்டம் தேர்வு',
    loading: 'வானிலை தரவு ஏற்றப்படுகிறது...',
    error: 'வானிலை ஏற்றுவதில் தோல்வி',
    retry: 'மீண்டும் முயற்சி',
    advisory: 'இன்றைய ஆலோசனை',
    cropAdvisory: 'பயிர் ஆலோசனை',
    irrigationAdvisory: 'நீர்ப்பாசன ஆலோசனை',
    pestAdvisory: 'பூச்சி மற்றும் நோய் எச்சரிக்கை',
    harvestAdvisory: 'அறுவடை ஆலோசனை',
    generalTips: 'பொது குறிப்புகள்',
  },
  te: {
    title: 'వాతావరణ సలహా',
    subtitle: 'వాతావరణం ఆధారంగా వ్యవసాయ సిఫార్సులు',
    forecast: '7 రోజుల అంచనా',
    recommendations: '🌾 వివరమైన వ్యవసాయ సలహా',
    rainAlert: 'వాతావరణ హెచ్చరిక',
    selectDistrict: 'జిల్లా ఎంచుకోండి',
    loading: 'వాతావరణ డేటా లోడ్ అవుతోంది...',
    error: 'వాతావరణం లోడ్ చేయడంలో విఫలమైంది',
    retry: 'మళ్లీ ప్రయత్నించండి',
    advisory: 'నేటి సలహా',
    cropAdvisory: 'పంట సలహా',
    irrigationAdvisory: 'నీటిపారుదల సలహా',
    pestAdvisory: 'పురుగులు మరియు వ్యాధి హెచ్చరిక',
    harvestAdvisory: 'పంట కోత సలహా',
    generalTips: 'సాధారణ చిట్కాలు',
  },
  bn: {
    title: 'আবহাওয়া পরামর্শ',
    subtitle: 'আবহাওয়ার উপর ভিত্তি করে কৃষি সুপারিশ',
    forecast: '7 দিনের পূর্বাভাস',
    recommendations: '🌾 বিস্তারিত কৃষি পরামর্শ',
    rainAlert: 'আবহাওয়া সতর্কতা',
    selectDistrict: 'জেলা নির্বাচন করুন',
    loading: 'আবহাওয়ার তথ্য লোড হচ্ছে...',
    error: 'আবহাওয়া লোড করতে ব্যর্থ',
    retry: 'আবার চেষ্টা করুন',
    advisory: 'আজকের পরামর্শ',
    cropAdvisory: 'ফসল পরামর্শ',
    irrigationAdvisory: 'সেচ পরামর্শ',
    pestAdvisory: 'পোকা ও রোগ সতর্কতা',
    harvestAdvisory: 'ফসল কাটা পরামর্শ',
    generalTips: 'সাধারণ টিপস',
  },
};

// Generate dynamic advisories based on weather
const generateAdvisories = (weather: { temp: number; humidity: number; wind_speed: number; main: string; description: string }, lang: Language) => {
  const advisories: Array<{
    icon: typeof Sprout;
    title: string;
    content: string;
    priority: 'high' | 'medium' | 'low';
    color: string;
  }> = [];

  const { temp, humidity, wind_speed, main } = weather;

  // Crop Advisory
  if (main === 'Rain' || main === 'Thunderstorm') {
    advisories.push({
      icon: Sprout,
      title: lang === 'hi' ? 'फसल सलाह' : 'Crop Advisory',
      content: lang === 'hi' 
        ? '🌧️ बारिश के कारण खेत में काम स्थगित करें। बुवाई और रोपाई के लिए मौसम साफ होने का इंतजार करें।'
        : '🌧️ Postpone field work due to rain. Wait for clear weather for sowing and transplanting.',
      priority: 'high',
      color: 'bg-blue-50 border-blue-200',
    });
  } else if (temp >= 20 && temp <= 30 && main === 'Clear') {
    advisories.push({
      icon: Sprout,
      title: lang === 'hi' ? 'फसल सलाह' : 'Crop Advisory',
      content: lang === 'hi'
        ? '🌾 गेहूं और सरसों की बुवाई के लिए आदर्श मौसम। आज खेत की तैयारी करें और बीज उपचार करें।'
        : '🌾 Ideal weather for wheat and mustard sowing. Prepare fields today and do seed treatment.',
      priority: 'high',
      color: 'bg-green-50 border-green-200',
    });
  } else if (temp > 35) {
    advisories.push({
      icon: Sprout,
      title: lang === 'hi' ? 'फसल सलाह' : 'Crop Advisory',
      content: lang === 'hi'
        ? '🔥 अत्यधिक गर्मी! फसलों को शेड प्रदान करें। सुबह या शाम में ही खेत का काम करें।'
        : '🔥 Extreme heat! Provide shade to crops. Do field work only in morning or evening.',
      priority: 'high',
      color: 'bg-red-50 border-red-200',
    });
  } else {
    advisories.push({
      icon: Sprout,
      title: lang === 'hi' ? 'फसल सलाह' : 'Crop Advisory',
      content: lang === 'hi'
        ? '✅ सामान्य खेती कार्य जारी रखें। फसल की नियमित निगरानी करें।'
        : '✅ Continue normal farming activities. Monitor crops regularly.',
      priority: 'low',
      color: 'bg-green-50 border-green-200',
    });
  }

  // Irrigation Advisory
  if (main === 'Rain' || main === 'Drizzle') {
    advisories.push({
      icon: Droplet,
      title: lang === 'hi' ? 'सिंचाई सलाह' : 'Irrigation Advisory',
      content: lang === 'hi'
        ? '💧 बारिश के कारण सिंचाई न करें। जलभराव से बचने के लिए खेत में जल निकासी सुनिश्चित करें।'
        : '💧 Skip irrigation due to rain. Ensure proper drainage to avoid waterlogging.',
      priority: 'high',
      color: 'bg-blue-50 border-blue-200',
    });
  } else if (temp > 32 && humidity < 50) {
    advisories.push({
      icon: Droplet,
      title: lang === 'hi' ? 'सिंचाई सलाह' : 'Irrigation Advisory',
      content: lang === 'hi'
        ? '💦 उच्च तापमान और कम आर्द्रता। सुबह जल्दी या शाम को सिंचाई करें। ड्रिप सिंचाई का उपयोग करें।'
        : '💦 High temp & low humidity. Irrigate early morning or evening. Use drip irrigation if possible.',
      priority: 'high',
      color: 'bg-orange-50 border-orange-200',
    });
  } else if (humidity > 80) {
    advisories.push({
      icon: Droplet,
      title: lang === 'hi' ? 'सिंचाई सलाह' : 'Irrigation Advisory',
      content: lang === 'hi'
        ? '💧 उच्च आर्द्रता। सिंचाई कम करें या टालें। मिट्टी की नमी की जांच करें।'
        : '💧 High humidity. Reduce or skip irrigation. Check soil moisture before watering.',
      priority: 'medium',
      color: 'bg-blue-50 border-blue-200',
    });
  } else {
    advisories.push({
      icon: Droplet,
      title: lang === 'hi' ? 'सिंचाई सलाह' : 'Irrigation Advisory',
      content: lang === 'hi'
        ? '✅ सामान्य सिंचाई कार्यक्रम जारी रखें। मिट्टी की नमी के अनुसार पानी दें।'
        : '✅ Continue normal irrigation schedule. Water according to soil moisture levels.',
      priority: 'low',
      color: 'bg-green-50 border-green-200',
    });
  }

  // Pest & Disease Advisory
  if (humidity > 75 && temp > 20) {
    advisories.push({
      icon: Bug,
      title: lang === 'hi' ? 'कीट और रोग चेतावनी' : 'Pest & Disease Alert',
      content: lang === 'hi'
        ? '⚠️ उच्च आर्द्रता से फफूंद रोगों का खतरा। पत्तियों पर धब्बे और पीलापन देखें। जैविक फफूंदनाशी का छिड़काव करें।'
        : '⚠️ High humidity increases fungal disease risk. Watch for spots and yellowing on leaves. Apply bio-fungicide.',
      priority: 'high',
      color: 'bg-amber-50 border-amber-200',
    });
  } else if (wind_speed < 5 && temp > 25) {
    advisories.push({
      icon: Bug,
      title: lang === 'hi' ? 'कीट और रोग चेतावनी' : 'Pest & Disease Alert',
      content: lang === 'hi'
        ? '🐛 कम हवा और गर्म मौसम में कीट सक्रिय। फसल की नियमित जांच करें। नीम तेल स्प्रे करें।'
        : '🐛 Low wind & warm weather activates pests. Inspect crops regularly. Apply neem oil spray.',
      priority: 'medium',
      color: 'bg-amber-50 border-amber-200',
    });
  } else {
    advisories.push({
      icon: Bug,
      title: lang === 'hi' ? 'कीट और रोग चेतावनी' : 'Pest & Disease Alert',
      content: lang === 'hi'
        ? '✅ कीट का खतरा कम है। निवारक उपाय के रूप में साप्ताहिक निगरानी जारी रखें।'
        : '✅ Low pest risk. Continue weekly monitoring as preventive measure.',
      priority: 'low',
      color: 'bg-green-50 border-green-200',
    });
  }

  // Harvest Advisory
  if (main === 'Clear' && humidity < 60 && wind_speed < 15) {
    advisories.push({
      icon: Wheat,
      title: lang === 'hi' ? 'कटाई सलाह' : 'Harvest Advisory',
      content: lang === 'hi'
        ? '🌾 कटाई के लिए आदर्श मौसम! पकी हुई फसल की आज कटाई करें। अनाज को धूप में सुखाएं।'
        : '🌾 Perfect harvest weather! Harvest mature crops today. Dry grains in sunlight.',
      priority: 'high',
      color: 'bg-green-50 border-green-200',
    });
  } else if (main === 'Rain' || main === 'Thunderstorm') {
    advisories.push({
      icon: Wheat,
      title: lang === 'hi' ? 'कटाई सलाह' : 'Harvest Advisory',
      content: lang === 'hi'
        ? '⚠️ बारिश की संभावना! कटी हुई फसल को ढक कर रखें। कटाई स्थगित करें।'
        : '⚠️ Rain expected! Cover harvested crops. Postpone harvesting if possible.',
      priority: 'high',
      color: 'bg-red-50 border-red-200',
    });
  } else if (wind_speed > 20) {
    advisories.push({
      icon: Wheat,
      title: lang === 'hi' ? 'कटाई सलाह' : 'Harvest Advisory',
      content: lang === 'hi'
        ? '💨 तेज हवा! कटाई में सावधानी बरतें। अनाज के छींटे को रोकने के लिए विंडब्रेक का उपयोग करें।'
        : '💨 Strong winds! Exercise caution during harvest. Use windbreaks to prevent grain scatter.',
      priority: 'medium',
      color: 'bg-amber-50 border-amber-200',
    });
  } else {
    advisories.push({
      icon: Wheat,
      title: lang === 'hi' ? 'कटाई सलाह' : 'Harvest Advisory',
      content: lang === 'hi'
        ? '✅ कटाई के लिए सामान्य परिस्थितियां। फसल की परिपक्वता के अनुसार योजना बनाएं।'
        : '✅ Normal conditions for harvesting. Plan according to crop maturity.',
      priority: 'low',
      color: 'bg-green-50 border-green-200',
    });
  }

  return advisories;
};

// Get weather alert based on conditions
const getWeatherAlert = (weather: { temp: number; humidity: number; wind_speed: number; main: string }, lang: Language) => {
  const { temp, humidity, wind_speed, main } = weather;
  
  if (main === 'Thunderstorm') {
    return {
      show: true,
      title: lang === 'hi' ? '⛈️ तूफान की चेतावनी' : '⛈️ Thunderstorm Warning',
      message: lang === 'hi' 
        ? 'आज तूफान की संभावना है। खेत के उपकरण सुरक्षित रखें और घर के अंदर रहें।'
        : 'Thunderstorm expected today. Secure farm equipment and stay indoors.',
      severity: 'high',
    };
  }
  if (main === 'Rain' && humidity > 80) {
    return {
      show: true,
      title: lang === 'hi' ? '🌧️ भारी बारिश की चेतावनी' : '🌧️ Heavy Rain Alert',
      message: lang === 'hi'
        ? 'भारी बारिश की संभावना। जलभराव से बचने के लिए खेत में जल निकासी सुनिश्चित करें।'
        : 'Heavy rainfall expected. Ensure proper drainage in fields to prevent waterlogging.',
      severity: 'high',
    };
  }
  if (temp > 40) {
    return {
      show: true,
      title: lang === 'hi' ? '🔥 लू की चेतावनी' : '🔥 Heat Wave Warning',
      message: lang === 'hi'
        ? 'अत्यधिक गर्मी! दोपहर में खेत का काम न करें। पशुओं को छाया में रखें और पर्याप्त पानी दें।'
        : 'Extreme heat! Avoid field work during noon. Keep livestock in shade with plenty of water.',
      severity: 'high',
    };
  }
  if (wind_speed > 30) {
    return {
      show: true,
      title: lang === 'hi' ? '💨 तेज हवा की चेतावनी' : '💨 Strong Wind Alert',
      message: lang === 'hi'
        ? 'आज तेज हवाएं चलेंगी। फसल सुरक्षा उपाय करें और कीटनाशक स्प्रे न करें।'
        : 'Strong winds expected. Take crop protection measures and avoid pesticide spraying.',
      severity: 'medium',
    };
  }
  
  return { show: false, title: '', message: '', severity: 'low' };
};

const Weather = () => {
  const { t, lang } = useTranslation();
  const { user } = useAuth();
  const text = pageTranslations[lang] || pageTranslations.en;
  const [selectedDistrict, setSelectedDistrict] = useState(user?.location || 'Hisar');
  
  const { weather, loading, error } = useWeather(selectedDistrict);

  // Generate advisories when weather data is available
  const advisories = weather ? generateAdvisories(weather.current, lang) : [];
  const alert = weather ? getWeatherAlert(weather.current, lang) : { show: false, title: '', message: '', severity: 'low' };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title={text.title}
        subtitle={text.subtitle}
        gradient="from-agro-sky to-blue-400"
      >
        {/* Location Selector */}
        <div className="mt-2">
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl h-12">
              <SelectValue placeholder={text.selectDistrict} />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {districts.map((district) => (
                <SelectItem key={district} value={district}>{district}, Haryana</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PageHeader>
      <div className="p-4 space-y-4 -mt-2">
        {/* Loading State */}
        {loading && (
          <div className="bg-card rounded-2xl p-8 shadow-sm border flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
            <p className="text-muted-foreground">{text.loading}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <p className="font-medium text-red-800">{text.error}</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Weather Data */}
        {weather && !loading && (
          <>
            {/* Current Weather */}
            <div className="bg-card rounded-2xl p-5 shadow-sm border animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm">{weather.location}, Haryana</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold text-foreground">{weather.current.temp}°</span>
                    <span className="text-muted-foreground mb-2">C</span>
                  </div>
                  <p className="text-foreground capitalize">{weather.current.description}</p>
                </div>
                <span className="text-6xl">{getWeatherIcon(weather.current.icon)}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Droplets className="w-5 h-5 mx-auto text-agro-sky mb-1" />
                  <p className="text-lg font-semibold">{weather.current.humidity}%</p>
                  <p className="text-xs text-muted-foreground">{t.humidity}</p>
                </div>
                <div className="text-center">
                  <Wind className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                  <p className="text-lg font-semibold">{weather.current.wind_speed} km/h</p>
                  <p className="text-xs text-muted-foreground">{t.wind}</p>
                </div>
                <div className="text-center">
                  <Thermometer className="w-5 h-5 mx-auto text-red-400 mb-1" />
                  <p className="text-lg font-semibold">{weather.current.feels_like}°</p>
                  <p className="text-xs text-muted-foreground">{t.feelsLike}</p>
                </div>
              </div>
            </div>

            {/* Weather Alert */}
            {alert.show && (
              <div className={`rounded-2xl p-4 border ${
                alert.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    <AlertTriangle className={`w-4 h-4 ${
                      alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      alert.severity === 'high' ? 'text-red-800' : 'text-amber-800'
                    }`}>{alert.title}</h4>
                    <p className={`text-sm ${
                      alert.severity === 'high' ? 'text-red-700' : 'text-amber-700'
                    }`}>{alert.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 7-Day Forecast */}
            {weather.forecast.length > 0 && (
              <div className="bg-card rounded-2xl p-4 shadow-sm border animate-fade-in">
                <h3 className="font-semibold text-foreground mb-3">{text.forecast}</h3>
                <div className="grid grid-cols-7 gap-1">
                  {weather.forecast.slice(0, 7).map((day, index) => (
                    <div 
                      key={index} 
                      className="text-center flex-1 p-2 rounded-xl hover:bg-accent/50 transition-colors"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <p className="text-xs font-medium text-foreground mb-1">{day.dayName}</p>
                      <p className="text-[10px] text-muted-foreground mb-1">{day.date}</p>
                      <span className="text-2xl block my-1">{getWeatherIcon(day.icon)}</span>
                      <p className="font-semibold text-foreground">{day.temp_max}°</p>
                      <p className="text-xs text-muted-foreground">{day.temp_min}°</p>
                      {day.pop > 0 && (
                        <p className="text-[10px] text-blue-500 flex items-center justify-center gap-0.5 mt-1">
                          <Droplets className="w-2.5 h-2.5" />{day.pop}%
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Farming Advisory */}
            <div className="bg-agro-green-light rounded-2xl p-4">
              <h3 className="font-semibold text-foreground mb-3">{text.recommendations}</h3>
              <div className="space-y-3">
                {advisories.map((advisory, index) => {
                  const Icon = advisory.icon;
                  return (
                    <div 
                      key={index} 
                      className={`rounded-xl p-4 border ${advisory.color}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          advisory.priority === 'high' ? 'bg-amber-100' : 
                          advisory.priority === 'medium' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            advisory.priority === 'high' ? 'text-amber-600' : 
                            advisory.priority === 'medium' ? 'text-blue-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{advisory.title}</h4>
                            {advisory.priority === 'high' && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                {lang === 'hi' ? 'महत्वपूर्ण' : 'Important'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{advisory.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;