import { useState } from 'react';
import { ArrowLeft, Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/contexts/AuthContext';

const districts = [
  'Hisar', 'Karnal', 'Panipat', 'Rohtak', 'Ambala', 
  'Sirsa', 'Fatehabad', 'Jind', 'Kaithal', 'Kurukshetra'
];

const pageTranslations: Record<Language, {
  title: string;
  subtitle: string;
  forecast: string;
  recommendations: string;
  rainAlert: string;
  rainAlertText: string;
  selectDistrict: string;
  partlyCloudy: string;
  recSowing: string;
  recIrrigation: string;
  recSpray: string;
  recHarvest: string;
}> = {
  en: {
    title: 'Weather Advisory',
    subtitle: 'Farming recommendations',
    forecast: '5-Day Forecast',
    recommendations: '🌾 Farming Recommendations',
    rainAlert: 'Rain Alert',
    rainAlertText: 'Heavy rainfall expected on Wednesday. Plan your field activities accordingly.',
    selectDistrict: 'Select District',
    partlyCloudy: 'Partly Cloudy',
    recSowing: 'Good conditions for wheat sowing',
    recIrrigation: 'Reduce irrigation - rain expected in 2 days',
    recSpray: 'Avoid pesticide spray on Wednesday',
    recHarvest: 'Complete any pending harvesting by Tuesday',
  },
  hi: {
    title: 'मौसम सलाहकार',
    subtitle: 'खेती की सिफारिशें',
    forecast: '5-दिन का पूर्वानुमान',
    recommendations: '🌾 खेती की सिफारिशें',
    rainAlert: 'बारिश की चेतावनी',
    rainAlertText: 'बुधवार को भारी बारिश की संभावना। अपनी खेत की गतिविधियों की योजना उसी अनुसार बनाएं।',
    selectDistrict: 'जिला चुनें',
    partlyCloudy: 'आंशिक रूप से बादल',
    recSowing: 'गेहूं की बुवाई के लिए अच्छी स्थिति',
    recIrrigation: 'सिंचाई कम करें - 2 दिनों में बारिश की उम्मीद',
    recSpray: 'बुधवार को कीटनाशक स्प्रे से बचें',
    recHarvest: 'मंगलवार तक लंबित कटाई पूरी करें',
  },
  pa: {
    title: 'ਮੌਸਮ ਸਲਾਹਕਾਰ',
    subtitle: 'ਖੇਤੀ ਸਿਫਾਰਸ਼ਾਂ',
    forecast: '5-ਦਿਨ ਪੂਰਵ ਅਨੁਮਾਨ',
    recommendations: '🌾 ਖੇਤੀ ਸਿਫਾਰਸ਼ਾਂ',
    rainAlert: 'ਮੀਂਹ ਦੀ ਚੇਤਾਵਨੀ',
    rainAlertText: 'ਬੁੱਧਵਾਰ ਨੂੰ ਭਾਰੀ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ। ਆਪਣੀਆਂ ਖੇਤ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।',
    selectDistrict: 'ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ',
    partlyCloudy: 'ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ',
    recSowing: 'ਕਣਕ ਦੀ ਬਿਜਾਈ ਲਈ ਵਧੀਆ ਹਾਲਾਤ',
    recIrrigation: 'ਸਿੰਚਾਈ ਘਟਾਓ - 2 ਦਿਨਾਂ ਵਿੱਚ ਮੀਂਹ ਦੀ ਉਮੀਦ',
    recSpray: 'ਬੁੱਧਵਾਰ ਨੂੰ ਕੀਟਨਾਸ਼ਕ ਸਪਰੇ ਤੋਂ ਬਚੋ',
    recHarvest: 'ਮੰਗਲਵਾਰ ਤੱਕ ਬਕਾਇਆ ਵਾਢੀ ਪੂਰੀ ਕਰੋ',
  },
  mr: {
    title: 'हवामान सल्लागार',
    subtitle: 'शेती शिफारसी',
    forecast: '5-दिवसांचा अंदाज',
    recommendations: '🌾 शेती शिफारसी',
    rainAlert: 'पावसाचा इशारा',
    rainAlertText: 'बुधवारी जोरदार पाऊस अपेक्षित. आपल्या शेतातील कामांचे नियोजन करा.',
    selectDistrict: 'जिल्हा निवडा',
    partlyCloudy: 'अंशतः ढगाळ',
    recSowing: 'गव्हाच्या पेरणीसाठी चांगली परिस्थिती',
    recIrrigation: 'सिंचन कमी करा - 2 दिवसात पाऊस अपेक्षित',
    recSpray: 'बुधवारी कीटकनाशक फवारणी टाळा',
    recHarvest: 'मंगळवारपर्यंत प्रलंबित कापणी पूर्ण करा',
  },
  ta: {
    title: 'வானிலை ஆலோசனை',
    subtitle: 'விவசாய பரிந்துரைகள்',
    forecast: '5 நாள் முன்னறிவிப்பு',
    recommendations: '🌾 விவசாய பரிந்துரைகள்',
    rainAlert: 'மழை எச்சரிக்கை',
    rainAlertText: 'புதன்கிழமை கனமழை எதிர்பார்க்கப்படுகிறது. உங்கள் வயல் நடவடிக்கைகளை திட்டமிடுங்கள்.',
    selectDistrict: 'மாவட்டம் தேர்வு',
    partlyCloudy: 'பகுதி மேகமூட்டம்',
    recSowing: 'கோதுமை விதைப்புக்கு நல்ல நிலை',
    recIrrigation: 'நீர்ப்பாசனம் குறைக்கவும் - 2 நாளில் மழை எதிர்பார்க்கப்படுகிறது',
    recSpray: 'புதன்கிழமை பூச்சிக்கொல்லி தெளிப்பு தவிர்க்கவும்',
    recHarvest: 'செவ்வாய் வரை நிலுவை அறுவடை முடிக்கவும்',
  },
  te: {
    title: 'వాతావరణ సలహా',
    subtitle: 'వ్యవసాయ సిఫార్సులు',
    forecast: '5 రోజుల అంచనా',
    recommendations: '🌾 వ్యవసాయ సిఫార్సులు',
    rainAlert: 'వర్షం హెచ్చరిక',
    rainAlertText: 'బుధవారం భారీ వర్షం ఊహించబడుతోంది. మీ పొల కార్యకలాపాలను ప్లాన్ చేయండి.',
    selectDistrict: 'జిల్లా ఎంచుకోండి',
    partlyCloudy: 'పాక్షిక మేఘావృతం',
    recSowing: 'గోధుమ విత్తడానికి మంచి పరిస్థితులు',
    recIrrigation: 'నీటిపారుదల తగ్గించండి - 2 రోజుల్లో వర్షం ఆశించబడుతోంది',
    recSpray: 'బుధవారం పురుగుమందు స్ప్రే మానుకోండి',
    recHarvest: 'మంగళవారం లోపు పెండింగ్ పంట కోత పూర్తి చేయండి',
  },
  bn: {
    title: 'আবহাওয়া পরামর্শ',
    subtitle: 'কৃষি সুপারিশ',
    forecast: '5 দিনের পূর্বাভাস',
    recommendations: '🌾 কৃষি সুপারিশ',
    rainAlert: 'বৃষ্টির সতর্কতা',
    rainAlertText: 'বুধবার ভারী বৃষ্টি প্রত্যাশিত। আপনার মাঠের কাজের পরিকল্পনা করুন।',
    selectDistrict: 'জেলা নির্বাচন করুন',
    partlyCloudy: 'আংশিক মেঘলা',
    recSowing: 'গম বপনের জন্য ভালো অবস্থা',
    recIrrigation: 'সেচ কমান - 2 দিনে বৃষ্টি প্রত্যাশিত',
    recSpray: 'বুধবার কীটনাশক স্প্রে এড়িয়ে চলুন',
    recHarvest: 'মঙ্গলবারের মধ্যে বকেয়া ফসল কাটা সম্পূর্ণ করুন',
  },
};

const Weather = () => {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const text = pageTranslations[lang] || pageTranslations.en;
  const [selectedDistrict, setSelectedDistrict] = useState('Hisar');

  const weatherData = {
    current: {
      temp: 28,
      humidity: 65,
      wind: 12,
      condition: text.partlyCloudy,
    },
    forecast: [
      { day: t.today, temp: 28, icon: Sun, rain: 10 },
      { day: t.tomorrow, temp: 26, icon: Cloud, rain: 30 },
      { day: 'Wed', temp: 24, icon: CloudRain, rain: 70 },
      { day: 'Thu', temp: 25, icon: CloudRain, rain: 60 },
      { day: 'Fri', temp: 27, icon: Sun, rain: 15 },
    ],
    recommendations: [
      { type: 'sowing', text: text.recSowing, priority: 'high' },
      { type: 'irrigation', text: text.recIrrigation, priority: 'medium' },
      { type: 'spray', text: text.recSpray, priority: 'high' },
      { type: 'harvest', text: text.recHarvest, priority: 'medium' },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-agro-sky to-blue-400 p-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{text.title}</h1>
            <p className="text-white/80 text-sm">{text.subtitle}</p>
          </div>
        </div>

        {/* Location Selector */}
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

      <div className="p-4 space-y-4 -mt-2">
        {/* Current Weather */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">{selectedDistrict}, Haryana</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-foreground">{weatherData.current.temp}°</span>
                <span className="text-muted-foreground mb-2">C</span>
              </div>
              <p className="text-foreground">{weatherData.current.condition}</p>
            </div>
            <Sun className="w-20 h-20 text-agro-sun" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Droplets className="w-5 h-5 mx-auto text-agro-sky mb-1" />
              <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
              <p className="text-xs text-muted-foreground">{t.humidity}</p>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-semibold">{weatherData.current.wind} km/h</p>
              <p className="text-xs text-muted-foreground">{t.wind}</p>
            </div>
            <div className="text-center">
              <Thermometer className="w-5 h-5 mx-auto text-red-400 mb-1" />
              <p className="text-lg font-semibold">32°</p>
              <p className="text-xs text-muted-foreground">{t.feelsLike}</p>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border">
          <h3 className="font-semibold text-foreground mb-3">{text.forecast}</h3>
          <div className="flex justify-between">
            {weatherData.forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="text-center flex-1">
                  <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                  <Icon className={`w-8 h-8 mx-auto mb-1 ${
                    day.icon === Sun ? 'text-agro-sun' : 
                    day.icon === CloudRain ? 'text-agro-sky' : 'text-gray-400'
                  }`} />
                  <p className="font-semibold text-foreground">{day.temp}°</p>
                  <p className="text-xs text-agro-sky">{day.rain}%</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farming Recommendations */}
        <div className="bg-agro-green-light rounded-2xl p-4">
          <h3 className="font-semibold text-foreground mb-3">{text.recommendations}</h3>
          <div className="space-y-3">
            {weatherData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 bg-card rounded-xl p-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  rec.priority === 'high' ? 'bg-amber-500' : 'bg-primary'
                }`} />
                <p className="text-sm text-foreground">{rec.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CloudRain className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800">{text.rainAlert}</h4>
              <p className="text-sm text-amber-700">
                {text.rainAlertText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
