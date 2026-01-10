import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wheat, Droplets, Sun, Sprout, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const soilTypes = [
  { value: 'clay', label: 'Clay Soil (चिकनी मिट्टी)' },
  { value: 'sandy', label: 'Sandy Soil (रेतीली मिट्टी)' },
  { value: 'loamy', label: 'Loamy Soil (दोमट मिट्टी)' },
  { value: 'black', label: 'Black Soil (काली मिट्टी)' },
  { value: 'red', label: 'Red Soil (लाल मिट्टी)' },
];

const seasons = [
  { value: 'kharif', label: 'Kharif (खरीफ) - Monsoon' },
  { value: 'rabi', label: 'Rabi (रबी) - Winter' },
  { value: 'zaid', label: 'Zaid (जायद) - Summer' },
];

const waterAvailability = [
  { value: 'abundant', label: 'Abundant (पर्याप्त पानी)', icon: '💧💧💧' },
  { value: 'moderate', label: 'Moderate (मध्यम पानी)', icon: '💧💧' },
  { value: 'scarce', label: 'Scarce (कम पानी)', icon: '💧' },
];

interface CropRecommendation {
  name: string;
  nameHindi: string;
  emoji: string;
  suitability: number;
  duration: string;
  expectedYield: string;
  tips: string[];
}

const getCropRecommendations = (soil: string, season: string, water: string): CropRecommendation[] => {
  const recommendations: Record<string, CropRecommendation[]> = {
    'loamy-kharif-abundant': [
      { name: 'Rice', nameHindi: 'धान', emoji: '🌾', suitability: 95, duration: '120-150 days', expectedYield: '40-50 quintals/hectare', tips: ['Use SRI method for better yield', 'Maintain 2-3 cm water level', 'Apply nitrogen in 3 splits'] },
      { name: 'Maize', nameHindi: 'मक्का', emoji: '🌽', suitability: 90, duration: '90-110 days', expectedYield: '50-60 quintals/hectare', tips: ['Plant in rows 60cm apart', 'Irrigate at knee-high stage', 'Use hybrid seeds'] },
      { name: 'Cotton', nameHindi: 'कपास', emoji: '🏵️', suitability: 85, duration: '150-180 days', expectedYield: '20-25 quintals/hectare', tips: ['Bt cotton recommended', 'Monitor for bollworm', 'Avoid waterlogging'] },
    ],
    'loamy-rabi-moderate': [
      { name: 'Wheat', nameHindi: 'गेहूं', emoji: '🌾', suitability: 95, duration: '120-140 days', expectedYield: '45-55 quintals/hectare', tips: ['Sow by mid-November', 'First irrigation at 21 days', 'Use HD-2967 variety'] },
      { name: 'Mustard', nameHindi: 'सरसों', emoji: '🌻', suitability: 88, duration: '110-130 days', expectedYield: '15-20 quintals/hectare', tips: ['Sow in October end', 'Light irrigation only', 'Good for intercropping'] },
      { name: 'Chickpea', nameHindi: 'चना', emoji: '🫘', suitability: 82, duration: '90-120 days', expectedYield: '15-18 quintals/hectare', tips: ['No irrigation needed usually', 'Avoid excess nitrogen', 'Harvest when leaves turn yellow'] },
    ],
    'black-kharif-moderate': [
      { name: 'Cotton', nameHindi: 'कपास', emoji: '🏵️', suitability: 95, duration: '150-180 days', expectedYield: '25-30 quintals/hectare', tips: ['Black soil is ideal for cotton', 'Avoid waterlogging', 'Use drip irrigation'] },
      { name: 'Soybean', nameHindi: 'सोयाबीन', emoji: '🫛', suitability: 90, duration: '90-100 days', expectedYield: '20-25 quintals/hectare', tips: ['Treat seeds with Rhizobium', 'No nitrogen fertilizer needed', 'Harvest at 14% moisture'] },
      { name: 'Pigeon Pea', nameHindi: 'अरहर', emoji: '🌱', suitability: 85, duration: '150-180 days', expectedYield: '12-15 quintals/hectare', tips: ['Good for crop rotation', 'Fixes nitrogen in soil', 'Resistant to drought'] },
    ],
    'sandy-zaid-scarce': [
      { name: 'Watermelon', nameHindi: 'तरबूज', emoji: '🍉', suitability: 90, duration: '80-100 days', expectedYield: '300-400 quintals/hectare', tips: ['Grows well in sandy soil', 'Mulching conserves water', 'Plant in February'] },
      { name: 'Muskmelon', nameHindi: 'खरबूजा', emoji: '🍈', suitability: 88, duration: '70-90 days', expectedYield: '150-200 quintals/hectare', tips: ['Needs warm weather', 'Drip irrigation best', 'Rich in market demand'] },
      { name: 'Cucumber', nameHindi: 'खीरा', emoji: '🥒', suitability: 82, duration: '45-60 days', expectedYield: '100-150 quintals/hectare', tips: ['Quick growing crop', 'Trellis increases yield', 'Harvest frequently'] },
    ],
    'clay-rabi-abundant': [
      { name: 'Rice', nameHindi: 'धान', emoji: '🌾', suitability: 92, duration: '120-150 days', expectedYield: '45-55 quintals/hectare', tips: ['Clay retains water well', 'Puddle before transplanting', 'Level field properly'] },
      { name: 'Sugarcane', nameHindi: 'गन्ना', emoji: '🎋', suitability: 88, duration: '10-12 months', expectedYield: '800-1000 quintals/hectare', tips: ['Plant in February-March', 'Heavy feeder crop', 'Trash mulching recommended'] },
      { name: 'Banana', nameHindi: 'केला', emoji: '🍌', suitability: 85, duration: '12-14 months', expectedYield: '500-600 quintals/hectare', tips: ['Needs consistent moisture', 'Use tissue culture plants', 'Protect from wind'] },
    ],
    'red-kharif-moderate': [
      { name: 'Groundnut', nameHindi: 'मूंगफली', emoji: '🥜', suitability: 92, duration: '100-120 days', expectedYield: '20-25 quintals/hectare', tips: ['Red soil is ideal', 'Apply gypsum at flowering', 'Good oil content'] },
      { name: 'Finger Millet', nameHindi: 'रागी', emoji: '🌾', suitability: 88, duration: '90-120 days', expectedYield: '25-30 quintals/hectare', tips: ['Drought tolerant', 'Rich in calcium', 'Good for hilly areas'] },
      { name: 'Pulses', nameHindi: 'दालें', emoji: '🫘', suitability: 85, duration: '80-100 days', expectedYield: '10-15 quintals/hectare', tips: ['Improves soil fertility', 'Low water requirement', 'Multiple harvests possible'] },
    ],
  };

  const key = `${soil}-${season}-${water}`;
  
  // Return matching recommendations or default based on season
  if (recommendations[key]) {
    return recommendations[key];
  }
  
  // Default recommendations based on season
  const defaults: Record<string, CropRecommendation[]> = {
    kharif: [
      { name: 'Rice', nameHindi: 'धान', emoji: '🌾', suitability: 85, duration: '120-150 days', expectedYield: '40-50 quintals/hectare', tips: ['Good monsoon crop', 'Needs standing water', 'Transplant 25-day seedlings'] },
      { name: 'Maize', nameHindi: 'मक्का', emoji: '🌽', suitability: 80, duration: '90-110 days', expectedYield: '50-60 quintals/hectare', tips: ['Versatile crop', 'Good for fodder too', 'Use hybrid seeds'] },
      { name: 'Sorghum', nameHindi: 'ज्वार', emoji: '🌾', suitability: 75, duration: '100-120 days', expectedYield: '25-35 quintals/hectare', tips: ['Drought resistant', 'Good for dry areas', 'Dual purpose crop'] },
    ],
    rabi: [
      { name: 'Wheat', nameHindi: 'गेहूं', emoji: '🌾', suitability: 90, duration: '120-140 days', expectedYield: '45-55 quintals/hectare', tips: ['Main winter crop', 'Sow by November', 'Needs 4-6 irrigations'] },
      { name: 'Mustard', nameHindi: 'सरसों', emoji: '🌻', suitability: 85, duration: '110-130 days', expectedYield: '15-20 quintals/hectare', tips: ['Low water crop', 'Good oil yield', 'Yellow flowers beautiful'] },
      { name: 'Gram', nameHindi: 'चना', emoji: '🫘', suitability: 80, duration: '90-120 days', expectedYield: '15-18 quintals/hectare', tips: ['Fixes nitrogen', 'Minimal irrigation', 'Good protein source'] },
    ],
    zaid: [
      { name: 'Moong', nameHindi: 'मूंग', emoji: '🫛', suitability: 85, duration: '60-75 days', expectedYield: '8-12 quintals/hectare', tips: ['Short duration', 'Summer pulse', 'Good for health'] },
      { name: 'Cucumber', nameHindi: 'खीरा', emoji: '🥒', suitability: 80, duration: '45-60 days', expectedYield: '100-150 quintals/hectare', tips: ['Quick returns', 'High demand summer', 'Easy to grow'] },
      { name: 'Watermelon', nameHindi: 'तरबूज', emoji: '🍉', suitability: 78, duration: '80-100 days', expectedYield: '300-400 quintals/hectare', tips: ['Sandy soil best', 'High profit crop', 'Needs space'] },
    ],
  };

  return defaults[season] || defaults.kharif;
};

const CropRecommendation = () => {
  const navigate = useNavigate();
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [water, setWater] = useState('');
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGetRecommendations = () => {
    if (soilType && season && water) {
      const crops = getCropRecommendations(soilType, season, water);
      setRecommendations(crops);
      setShowResults(true);
    }
  };

  const isFormComplete = soilType && season && water;

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-agro-leaf to-primary p-4 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">Crop Recommendation</h1>
            <p className="text-primary-foreground/80 text-sm">फसल अनुशंसा</p>
          </div>
        </div>
        <div className="bg-primary-foreground/10 rounded-xl p-3 backdrop-blur-sm">
          <p className="text-primary-foreground text-sm">
            🌱 Tell us about your land and we'll suggest the best crops for maximum yield!
          </p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Input Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 space-y-4">
            {/* Soil Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Sprout className="w-4 h-4 text-agro-earth" />
                Soil Type (मिट्टी का प्रकार)
              </label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Season */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                Season (मौसम)
              </label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Water Availability */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                Water Availability (पानी की उपलब्धता)
              </label>
              <Select value={water} onValueChange={setWater}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select water availability" />
                </SelectTrigger>
                <SelectContent>
                  {waterAvailability.map((w) => (
                    <SelectItem key={w.value} value={w.value}>
                      {w.icon} {w.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGetRecommendations}
              disabled={!isFormComplete}
              className="w-full h-12 bg-gradient-to-r from-primary to-agro-leaf text-lg font-semibold"
            >
              <Wheat className="w-5 h-5 mr-2" />
              Get Recommendations
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && recommendations.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Recommended Crops for You
            </h2>
            
            {recommendations.map((crop, index) => (
              <Card 
                key={crop.name} 
                className="border-0 shadow-lg overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Crop Header */}
                  <div className="bg-gradient-to-r from-agro-green-light to-primary/10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{crop.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg">{crop.name}</h3>
                        <p className="text-muted-foreground text-sm">{crop.nameHindi}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{crop.suitability}%</div>
                      <p className="text-xs text-muted-foreground">Suitability</p>
                    </div>
                  </div>

                  {/* Crop Details */}
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-semibold text-sm">{crop.duration}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">Expected Yield</p>
                        <p className="font-semibold text-sm">{crop.expectedYield}</p>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-primary/5 rounded-lg p-3">
                      <p className="text-xs font-medium text-primary mb-2">💡 Farming Tips</p>
                      <ul className="space-y-1">
                        {crop.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
