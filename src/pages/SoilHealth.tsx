import { useState } from 'react';
import { ArrowLeft, Sprout, Droplets, Leaf, Sun, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PremiumBanner from '@/components/PremiumBanner';

const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Black (Regur)', 'Red Soil', 'Alluvial'];
const crops = ['Wheat', 'Rice', 'Cotton', 'Mustard', 'Sugarcane', 'Maize', 'Vegetables'];

const recommendations = {
  fertilizer: [
    { name: 'DAP (Di-ammonium Phosphate)', quantity: '50 kg/acre', timing: 'At sowing' },
    { name: 'Urea', quantity: '40 kg/acre', timing: '3 weeks after sowing' },
    { name: 'Potash (MOP)', quantity: '25 kg/acre', timing: 'At sowing' },
  ],
  compost: [
    { name: 'Vermicompost', quantity: '2 tons/acre', benefit: 'Improves soil structure' },
    { name: 'Farmyard Manure (FYM)', quantity: '5 tons/acre', benefit: 'Adds organic matter' },
    { name: 'Green Manure (Dhaincha)', quantity: 'Grow & incorporate', benefit: 'Nitrogen fixation' },
  ],
  irrigation: [
    { method: 'Drip Irrigation', efficiency: '90%', savings: '40% water saved' },
    { method: 'Sprinkler System', efficiency: '75%', savings: '25% water saved' },
    { schedule: 'Every 7-10 days in winter, 4-5 days in summer' },
  ],
  sustainable: [
    { practice: 'Mulching with crop residue', benefit: 'Retain moisture, prevent stubble burning' },
    { practice: 'Crop rotation with legumes', benefit: 'Natural nitrogen enrichment' },
    { practice: 'Happy Seeder for wheat', benefit: 'Sow directly in paddy stubble' },
    { practice: 'Bio-decomposer spray', benefit: 'Decompose stubble in 20-25 days' },
  ],
};

const SoilHealth = () => {
  const navigate = useNavigate();
  const [soilType, setSoilType] = useState('');
  const [crop, setCrop] = useState('');
  const [landSize, setLandSize] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (soilType && crop && landSize) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-agro-earth to-amber-600 p-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Soil Health Insights</h1>
            <p className="text-white/80 text-sm">Smart fertilizer & irrigation advice</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Input Form */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border space-y-4">
          <h3 className="font-semibold text-foreground">Enter Your Farm Details</h3>
          
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Soil Type</label>
            <Select value={soilType} onValueChange={setSoilType}>
              <SelectTrigger className="rounded-xl h-12">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {soilTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Current/Planned Crop</label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger className="rounded-xl h-12">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {crops.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Land Size (in acres)</label>
            <Input
              type="number"
              placeholder="e.g., 5"
              value={landSize}
              onChange={(e) => setLandSize(e.target.value)}
              className="rounded-xl h-12"
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            className="w-full h-12 rounded-xl"
            disabled={!soilType || !crop || !landSize}
          >
            Get Recommendations
          </Button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-4 animate-fade-in">
            {/* Fertilizer */}
            <div className="bg-agro-green-light rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Recommended Fertilizers</h3>
              </div>
              <div className="space-y-3">
                {recommendations.fertilizer.map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-3">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>📊 {item.quantity}</span>
                      <span>⏰ {item.timing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compost */}
            <div className="bg-agro-earth-light rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sprout className="w-5 h-5 text-agro-earth" />
                <h3 className="font-semibold text-foreground">Organic Compost Options</h3>
              </div>
              <div className="space-y-3">
                {recommendations.compost.map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-3">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.quantity} • {item.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Irrigation */}
            <div className="bg-agro-sky-light rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-agro-sky" />
                <h3 className="font-semibold text-foreground">Irrigation Schedule</h3>
              </div>
              <div className="space-y-3">
                {recommendations.irrigation.slice(0, 2).map((item, index) => (
                  <div key={index} className="bg-card rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">{item.method}</p>
                      <p className="text-sm text-muted-foreground">{item.savings}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-agro-sky">{item.efficiency}</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                ))}
                <div className="bg-card rounded-xl p-3">
                  <p className="text-sm text-foreground">
                    📅 <strong>Schedule:</strong> {recommendations.irrigation[2].schedule}
                  </p>
                </div>
              </div>
            </div>

            {/* Sustainable Practices */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Recycle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Sustainable Practices</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">
                🚫 Say NO to stubble burning! Try these alternatives:
              </p>
              <div className="space-y-2">
                {recommendations.sustainable.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Sun className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">{item.practice}</p>
                      <p className="text-xs text-green-600">{item.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Premium Banner */}
        <div className="mt-6">
          <PremiumBanner variant="compact" />
        </div>
      </div>
    </div>
  );
};

export default SoilHealth;
