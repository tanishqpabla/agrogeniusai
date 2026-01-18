import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PremiumBanner from '@/components/PremiumBanner';

const crops = ['Wheat', 'Rice (Paddy)', 'Cotton', 'Mustard', 'Sugarcane', 'Maize'];
const mandis = [
  'Hisar Mandi', 'Karnal Mandi', 'Ambala Mandi', 'Sirsa Mandi', 
  'Fatehabad Mandi', 'Rohtak Mandi', 'Panipat Mandi', 'Jind Mandi',
  'Bhiwani Mandi', 'Sonipat Mandi', 'Kurukshetra Mandi', 'Yamunanagar Mandi',
  'Kaithal Mandi', 'Jhajjar Mandi', 'Rewari Mandi', 'Palwal Mandi',
  'Faridabad Mandi', 'Gurugram Mandi', 'Mahendragarh Mandi', 'Charkhi Dadri Mandi'
];

const priceData: Record<string, Record<string, { min: number; max: number; modal: number; trend: 'up' | 'down' | 'stable'; change: number }>> = {
  'Wheat': {
    'Hisar Mandi': { min: 2150, max: 2350, modal: 2275, trend: 'up', change: 2.5 },
    'Karnal Mandi': { min: 2200, max: 2400, modal: 2325, trend: 'up', change: 3.1 },
    'Ambala Mandi': { min: 2100, max: 2300, modal: 2200, trend: 'stable', change: 0.5 },
    'Sirsa Mandi': { min: 2180, max: 2380, modal: 2280, trend: 'up', change: 1.8 },
    'Fatehabad Mandi': { min: 2120, max: 2320, modal: 2220, trend: 'down', change: -1.2 },
    'Rohtak Mandi': { min: 2160, max: 2360, modal: 2260, trend: 'stable', change: 0.2 },
    'Panipat Mandi': { min: 2140, max: 2340, modal: 2240, trend: 'up', change: 2.0 },
    'Jind Mandi': { min: 2170, max: 2370, modal: 2270, trend: 'up', change: 1.5 },
    'Bhiwani Mandi': { min: 2130, max: 2330, modal: 2230, trend: 'stable', change: 0.3 },
    'Sonipat Mandi': { min: 2190, max: 2390, modal: 2290, trend: 'up', change: 2.8 },
    'Kurukshetra Mandi': { min: 2210, max: 2410, modal: 2310, trend: 'up', change: 2.2 },
    'Yamunanagar Mandi': { min: 2140, max: 2340, modal: 2240, trend: 'down', change: -0.8 },
    'Kaithal Mandi': { min: 2160, max: 2360, modal: 2260, trend: 'up', change: 1.9 },
    'Jhajjar Mandi': { min: 2120, max: 2320, modal: 2220, trend: 'stable', change: 0.4 },
    'Rewari Mandi': { min: 2100, max: 2300, modal: 2200, trend: 'down', change: -0.5 },
    'Palwal Mandi': { min: 2110, max: 2310, modal: 2210, trend: 'up', change: 1.1 },
    'Faridabad Mandi': { min: 2180, max: 2380, modal: 2280, trend: 'up', change: 2.4 },
    'Gurugram Mandi': { min: 2200, max: 2400, modal: 2300, trend: 'up', change: 3.0 },
    'Mahendragarh Mandi': { min: 2090, max: 2290, modal: 2190, trend: 'stable', change: 0.1 },
    'Charkhi Dadri Mandi': { min: 2140, max: 2340, modal: 2240, trend: 'up', change: 1.7 },
  },
  'Rice (Paddy)': {
    'Hisar Mandi': { min: 2100, max: 2300, modal: 2200, trend: 'up', change: 1.8 },
    'Karnal Mandi': { min: 2150, max: 2350, modal: 2250, trend: 'up', change: 2.2 },
    'Ambala Mandi': { min: 2050, max: 2250, modal: 2150, trend: 'stable', change: 0.3 },
    'Sirsa Mandi': { min: 2080, max: 2280, modal: 2180, trend: 'down', change: -0.8 },
    'Fatehabad Mandi': { min: 2100, max: 2300, modal: 2200, trend: 'up', change: 1.5 },
    'Rohtak Mandi': { min: 2120, max: 2320, modal: 2220, trend: 'stable', change: 0.1 },
    'Panipat Mandi': { min: 2090, max: 2290, modal: 2190, trend: 'up', change: 1.9 },
    'Jind Mandi': { min: 2110, max: 2310, modal: 2210, trend: 'up', change: 1.6 },
    'Bhiwani Mandi': { min: 2070, max: 2270, modal: 2170, trend: 'stable', change: 0.2 },
    'Sonipat Mandi': { min: 2130, max: 2330, modal: 2230, trend: 'up', change: 2.0 },
    'Kurukshetra Mandi': { min: 2160, max: 2360, modal: 2260, trend: 'up', change: 2.4 },
    'Yamunanagar Mandi': { min: 2080, max: 2280, modal: 2180, trend: 'down', change: -0.5 },
    'Kaithal Mandi': { min: 2100, max: 2300, modal: 2200, trend: 'up', change: 1.7 },
    'Jhajjar Mandi': { min: 2060, max: 2260, modal: 2160, trend: 'stable', change: 0.3 },
    'Rewari Mandi': { min: 2040, max: 2240, modal: 2140, trend: 'down', change: -0.9 },
    'Palwal Mandi': { min: 2070, max: 2270, modal: 2170, trend: 'up', change: 1.2 },
    'Faridabad Mandi': { min: 2120, max: 2320, modal: 2220, trend: 'up', change: 1.8 },
    'Gurugram Mandi': { min: 2140, max: 2340, modal: 2240, trend: 'up', change: 2.1 },
    'Mahendragarh Mandi': { min: 2030, max: 2230, modal: 2130, trend: 'stable', change: 0.1 },
    'Charkhi Dadri Mandi': { min: 2090, max: 2290, modal: 2190, trend: 'up', change: 1.4 },
  },
  'Cotton': {
    'Hisar Mandi': { min: 6200, max: 6800, modal: 6500, trend: 'up', change: 3.5 },
    'Karnal Mandi': { min: 6150, max: 6750, modal: 6450, trend: 'stable', change: 0.8 },
    'Ambala Mandi': { min: 6100, max: 6700, modal: 6400, trend: 'down', change: -1.5 },
    'Sirsa Mandi': { min: 6250, max: 6850, modal: 6550, trend: 'up', change: 4.2 },
    'Fatehabad Mandi': { min: 6180, max: 6780, modal: 6480, trend: 'up', change: 2.8 },
    'Rohtak Mandi': { min: 6120, max: 6720, modal: 6420, trend: 'stable', change: 0.4 },
    'Panipat Mandi': { min: 6140, max: 6740, modal: 6440, trend: 'down', change: -0.9 },
    'Jind Mandi': { min: 6170, max: 6770, modal: 6470, trend: 'up', change: 2.1 },
    'Bhiwani Mandi': { min: 6130, max: 6730, modal: 6430, trend: 'stable', change: 0.5 },
    'Sonipat Mandi': { min: 6160, max: 6760, modal: 6460, trend: 'up', change: 1.8 },
    'Kurukshetra Mandi': { min: 6140, max: 6740, modal: 6440, trend: 'down', change: -0.6 },
    'Yamunanagar Mandi': { min: 6110, max: 6710, modal: 6410, trend: 'down', change: -1.2 },
    'Kaithal Mandi': { min: 6190, max: 6790, modal: 6490, trend: 'up', change: 2.5 },
    'Jhajjar Mandi': { min: 6100, max: 6700, modal: 6400, trend: 'stable', change: 0.2 },
    'Rewari Mandi': { min: 6080, max: 6680, modal: 6380, trend: 'down', change: -1.8 },
    'Palwal Mandi': { min: 6120, max: 6720, modal: 6420, trend: 'up', change: 1.4 },
    'Faridabad Mandi': { min: 6150, max: 6750, modal: 6450, trend: 'up', change: 1.9 },
    'Gurugram Mandi': { min: 6180, max: 6780, modal: 6480, trend: 'up', change: 2.3 },
    'Mahendragarh Mandi': { min: 6090, max: 6690, modal: 6390, trend: 'stable', change: 0.1 },
    'Charkhi Dadri Mandi': { min: 6160, max: 6760, modal: 6460, trend: 'up', change: 1.6 },
  },
  'Mustard': {
    'Hisar Mandi': { min: 5100, max: 5500, modal: 5300, trend: 'up', change: 2.1 },
    'Karnal Mandi': { min: 5050, max: 5450, modal: 5250, trend: 'stable', change: 0.6 },
    'Ambala Mandi': { min: 5000, max: 5400, modal: 5200, trend: 'up', change: 1.8 },
    'Sirsa Mandi': { min: 5150, max: 5550, modal: 5350, trend: 'up', change: 3.0 },
    'Fatehabad Mandi': { min: 5080, max: 5480, modal: 5280, trend: 'down', change: -0.7 },
    'Rohtak Mandi': { min: 5060, max: 5460, modal: 5260, trend: 'stable', change: 0.3 },
    'Panipat Mandi': { min: 5040, max: 5440, modal: 5240, trend: 'up', change: 1.5 },
    'Jind Mandi': { min: 5090, max: 5490, modal: 5290, trend: 'up', change: 1.9 },
    'Bhiwani Mandi': { min: 5070, max: 5470, modal: 5270, trend: 'stable', change: 0.4 },
    'Sonipat Mandi': { min: 5110, max: 5510, modal: 5310, trend: 'up', change: 2.3 },
    'Kurukshetra Mandi': { min: 5030, max: 5430, modal: 5230, trend: 'down', change: -0.5 },
    'Yamunanagar Mandi': { min: 5010, max: 5410, modal: 5210, trend: 'down', change: -0.9 },
    'Kaithal Mandi': { min: 5120, max: 5520, modal: 5320, trend: 'up', change: 2.5 },
    'Jhajjar Mandi': { min: 5050, max: 5450, modal: 5250, trend: 'stable', change: 0.2 },
    'Rewari Mandi': { min: 5020, max: 5420, modal: 5220, trend: 'down', change: -0.6 },
    'Palwal Mandi': { min: 5060, max: 5460, modal: 5260, trend: 'up', change: 1.2 },
    'Faridabad Mandi': { min: 5100, max: 5500, modal: 5300, trend: 'up', change: 1.8 },
    'Gurugram Mandi': { min: 5130, max: 5530, modal: 5330, trend: 'up', change: 2.6 },
    'Mahendragarh Mandi': { min: 5000, max: 5400, modal: 5200, trend: 'stable', change: 0.1 },
    'Charkhi Dadri Mandi': { min: 5080, max: 5480, modal: 5280, trend: 'up', change: 1.6 },
  },
  'Sugarcane': {
    'Hisar Mandi': { min: 350, max: 400, modal: 375, trend: 'stable', change: 0.5 },
    'Karnal Mandi': { min: 355, max: 405, modal: 380, trend: 'up', change: 1.2 },
    'Ambala Mandi': { min: 345, max: 395, modal: 370, trend: 'stable', change: 0.2 },
    'Sirsa Mandi': { min: 352, max: 402, modal: 377, trend: 'up', change: 0.8 },
    'Fatehabad Mandi': { min: 348, max: 398, modal: 373, trend: 'down', change: -0.3 },
    'Rohtak Mandi': { min: 350, max: 400, modal: 375, trend: 'stable', change: 0.1 },
    'Panipat Mandi': { min: 353, max: 403, modal: 378, trend: 'up', change: 0.9 },
    'Jind Mandi': { min: 351, max: 401, modal: 376, trend: 'up', change: 0.6 },
    'Bhiwani Mandi': { min: 347, max: 397, modal: 372, trend: 'stable', change: 0.2 },
    'Sonipat Mandi': { min: 354, max: 404, modal: 379, trend: 'up', change: 1.0 },
    'Kurukshetra Mandi': { min: 356, max: 406, modal: 381, trend: 'up', change: 1.3 },
    'Yamunanagar Mandi': { min: 349, max: 399, modal: 374, trend: 'down', change: -0.4 },
    'Kaithal Mandi': { min: 352, max: 402, modal: 377, trend: 'up', change: 0.7 },
    'Jhajjar Mandi': { min: 346, max: 396, modal: 371, trend: 'stable', change: 0.1 },
    'Rewari Mandi': { min: 344, max: 394, modal: 369, trend: 'down', change: -0.6 },
    'Palwal Mandi': { min: 348, max: 398, modal: 373, trend: 'up', change: 0.5 },
    'Faridabad Mandi': { min: 351, max: 401, modal: 376, trend: 'up', change: 0.8 },
    'Gurugram Mandi': { min: 354, max: 404, modal: 379, trend: 'up', change: 1.1 },
    'Mahendragarh Mandi': { min: 343, max: 393, modal: 368, trend: 'stable', change: 0.0 },
    'Charkhi Dadri Mandi': { min: 349, max: 399, modal: 374, trend: 'up', change: 0.6 },
  },
  'Maize': {
    'Hisar Mandi': { min: 1850, max: 2050, modal: 1950, trend: 'up', change: 2.3 },
    'Karnal Mandi': { min: 1880, max: 2080, modal: 1980, trend: 'up', change: 1.9 },
    'Ambala Mandi': { min: 1820, max: 2020, modal: 1920, trend: 'stable', change: 0.4 },
    'Sirsa Mandi': { min: 1860, max: 2060, modal: 1960, trend: 'down', change: -1.1 },
    'Fatehabad Mandi': { min: 1840, max: 2040, modal: 1940, trend: 'up', change: 1.6 },
    'Rohtak Mandi': { min: 1830, max: 2030, modal: 1930, trend: 'stable', change: 0.2 },
    'Panipat Mandi': { min: 1870, max: 2070, modal: 1970, trend: 'up', change: 2.0 },
    'Jind Mandi': { min: 1855, max: 2055, modal: 1955, trend: 'up', change: 1.7 },
    'Bhiwani Mandi': { min: 1825, max: 2025, modal: 1925, trend: 'stable', change: 0.3 },
    'Sonipat Mandi': { min: 1875, max: 2075, modal: 1975, trend: 'up', change: 2.1 },
    'Kurukshetra Mandi': { min: 1890, max: 2090, modal: 1990, trend: 'up', change: 2.5 },
    'Yamunanagar Mandi': { min: 1835, max: 2035, modal: 1935, trend: 'down', change: -0.7 },
    'Kaithal Mandi': { min: 1865, max: 2065, modal: 1965, trend: 'up', change: 1.8 },
    'Jhajjar Mandi': { min: 1815, max: 2015, modal: 1915, trend: 'stable', change: 0.1 },
    'Rewari Mandi': { min: 1800, max: 2000, modal: 1900, trend: 'down', change: -1.3 },
    'Palwal Mandi': { min: 1840, max: 2040, modal: 1940, trend: 'up', change: 1.4 },
    'Faridabad Mandi': { min: 1860, max: 2060, modal: 1960, trend: 'up', change: 1.9 },
    'Gurugram Mandi': { min: 1885, max: 2085, modal: 1985, trend: 'up', change: 2.4 },
    'Mahendragarh Mandi': { min: 1795, max: 1995, modal: 1895, trend: 'stable', change: 0.0 },
    'Charkhi Dadri Mandi': { min: 1850, max: 2050, modal: 1950, trend: 'up', change: 1.5 },
  },
};

const Market = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedMandi, setSelectedMandi] = useState('Hisar Mandi');

  const currentPrice = priceData[selectedCrop]?.[selectedMandi];

  const TrendIcon = currentPrice?.trend === 'up' ? TrendingUp : 
                    currentPrice?.trend === 'down' ? TrendingDown : Minus;
  
  const trendColor = currentPrice?.trend === 'up' ? 'text-green-600' :
                     currentPrice?.trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  // Get all mandis for comparison
  const allMandiPrices = Object.entries(priceData[selectedCrop] || {})
    .sort((a, b) => b[1].modal - a[1].modal);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Market Prices</h1>
            <p className="text-white/80 text-sm">Today's mandi rates</p>
          </div>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl h-12">
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {crops.map((crop) => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMandi} onValueChange={setSelectedMandi}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl h-12">
              <SelectValue placeholder="Select Mandi" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {mandis.map((mandi) => (
                <SelectItem key={mandi} value={mandi}>{mandi}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Price Card */}
        {currentPrice && (
          <div className="bg-card rounded-2xl p-5 shadow-sm border animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-muted-foreground text-sm">{selectedCrop}</p>
                <p className="text-xs text-muted-foreground">{selectedMandi}</p>
              </div>
              <div className={`flex items-center gap-1 ${trendColor}`}>
                <TrendIcon className="w-5 h-5" />
                <span className="font-semibold">{currentPrice.change > 0 ? '+' : ''}{currentPrice.change}%</span>
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-muted-foreground text-sm mb-1">Modal Price</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-foreground">₹{currentPrice.modal}</span>
                <span className="text-muted-foreground">/quintal</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Minimum</p>
                <p className="text-lg font-semibold text-foreground">₹{currentPrice.min}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Maximum</p>
                <p className="text-lg font-semibold text-foreground">₹{currentPrice.max}</p>
              </div>
            </div>
          </div>
        )}

        {/* Best Price Tip */}
        <div className="bg-agro-green-light rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground">Best Selling Tip</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {allMandiPrices[0] && (
                  <>
                    <strong>{allMandiPrices[0][0]}</strong> is offering the highest price at 
                    <strong> ₹{allMandiPrices[0][1].modal}/quintal</strong> for {selectedCrop} today.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* All Mandis Comparison */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border">
          <h3 className="font-semibold text-foreground mb-3">Compare All Mandis</h3>
          <div className="space-y-2">
            {allMandiPrices.map(([mandi, price], index) => (
              <div 
                key={mandi} 
                className={`flex items-center justify-between p-3 rounded-xl ${
                  mandi === selectedMandi ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{mandi}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">₹{price.modal}</p>
                  <p className={`text-xs ${price.trend === 'up' ? 'text-green-600' : price.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {price.change > 0 ? '+' : ''}{price.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <div className="mt-4">
          <PremiumBanner variant="compact" />
        </div>
      </div>
    </div>
  );
};

export default Market;
