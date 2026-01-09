import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, Leaf, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const diseases = [
  {
    name: 'Leaf Blight',
    confidence: 87,
    severity: 'Moderate',
    treatment: [
      'Remove and destroy infected leaves immediately',
      'Apply copper-based fungicide (2g per liter water)',
      'Ensure proper spacing between plants for air circulation',
      'Water at the base of plants, avoid wetting leaves',
    ],
    prevention: 'Use disease-resistant varieties and practice crop rotation',
  },
  {
    name: 'Powdery Mildew',
    confidence: 92,
    severity: 'Mild',
    treatment: [
      'Spray neem oil solution (5ml per liter)',
      'Apply sulfur-based fungicide in morning hours',
      'Remove heavily infected leaves',
      'Increase sunlight exposure if possible',
    ],
    prevention: 'Avoid overhead irrigation and maintain plant hygiene',
  },
  {
    name: 'Bacterial Leaf Spot',
    confidence: 78,
    severity: 'Severe',
    treatment: [
      'Apply streptomycin sulfate spray',
      'Remove all infected plant parts',
      'Avoid working with wet plants',
      'Disinfect tools after use',
    ],
    prevention: 'Use certified disease-free seeds and maintain field sanitation',
  },
];

const CropScanner = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof diseases[0] | null>(null);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setResult(randomDisease);
      setIsAnalyzing(false);
    }, 2500);
  };

  const resetScanner = () => {
    setImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-agro-leaf p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-primary-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-primary-foreground">Crop Disease Scanner</h1>
          <p className="text-primary-foreground/80 text-sm">AI-powered leaf analysis</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {!image ? (
          <>
            {/* Upload Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary/30 rounded-2xl p-8 flex flex-col items-center justify-center bg-agro-green-light/50 cursor-pointer hover:border-primary/50 transition-colors min-h-[300px]"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Scan Crop Leaf</h3>
              <p className="text-muted-foreground text-center text-sm mb-6">
                Take a clear photo of the affected leaf for accurate diagnosis
              </p>
              <div className="flex gap-3">
                <Button className="gap-2 rounded-xl">
                  <Camera className="w-5 h-5" />
                  Camera
                </Button>
                <Button variant="outline" className="gap-2 rounded-xl">
                  <Upload className="w-5 h-5" />
                  Gallery
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageCapture}
              className="hidden"
            />

            {/* Tips */}
            <div className="bg-agro-sun-light rounded-2xl p-4">
              <h4 className="font-semibold text-foreground mb-2">📸 Tips for best results</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use good lighting (natural daylight is best)</li>
                <li>• Focus on the affected area of the leaf</li>
                <li>• Keep the camera steady and close</li>
                <li>• Include both healthy and diseased parts</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Image Preview */}
            <div className="relative rounded-2xl overflow-hidden">
              <img src={image} alt="Scanned leaf" className="w-full h-64 object-cover" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="font-medium">Analyzing with AI...</p>
                    <p className="text-sm opacity-80">Detecting disease patterns</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-4 animate-fade-in">
                {/* Disease Card */}
                <div className="bg-card rounded-2xl p-4 border shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <h3 className="text-lg font-bold text-foreground">{result.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Detected Disease</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{result.confidence}%</div>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    result.severity === 'Mild' ? 'bg-green-100 text-green-700' :
                    result.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Severity: {result.severity}
                  </div>
                </div>

                {/* Treatment Steps */}
                <div className="bg-agro-green-light rounded-2xl p-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Treatment Steps
                  </h4>
                  <ol className="space-y-2">
                    {result.treatment.map((step, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Prevention */}
                <div className="bg-agro-sky-light rounded-2xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">🛡️ Prevention</h4>
                  <p className="text-sm text-muted-foreground">{result.prevention}</p>
                </div>

                <Button onClick={resetScanner} className="w-full h-12 rounded-xl gap-2">
                  <Camera className="w-5 h-5" />
                  Scan Another Leaf
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CropScanner;
