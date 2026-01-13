import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Landmark, 
  IndianRupee, 
  Shield, 
  CreditCard, 
  Droplets,
  Tractor,
  ExternalLink,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PremiumBanner from '@/components/PremiumBanner';

interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  amount: string;
  deadline?: string;
  status: 'active' | 'upcoming' | 'closing-soon';
  link: string;
  icon: React.ElementType;
  category: 'subsidy' | 'insurance' | 'loan' | 'irrigation';
}

const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    nameHindi: 'पीएम-किसान सम्मान निधि',
    description: 'Direct income support of ₹6,000 per year to farmer families, paid in three equal installments.',
    benefits: [
      '₹6,000 per year in 3 installments',
      'Direct bank transfer (DBT)',
      'No middleman involvement',
      'Covers all operational landholding farmers'
    ],
    eligibility: [
      'All landholding farmer families',
      'Valid Aadhaar card required',
      'Bank account linked to Aadhaar',
      'Land records in farmer\'s name'
    ],
    amount: '₹6,000/year',
    status: 'active',
    link: 'https://pmkisan.gov.in',
    icon: IndianRupee,
    category: 'subsidy'
  },
  {
    id: 'pmfby',
    name: 'PM Fasal Bima Yojana',
    nameHindi: 'पीएम फसल बीमा योजना',
    description: 'Comprehensive crop insurance covering yield losses due to natural calamities, pests, and diseases.',
    benefits: [
      'Low premium: 2% for Kharif, 1.5% for Rabi',
      'Full sum insured coverage',
      'Quick claim settlement',
      'Covers prevented sowing & post-harvest losses'
    ],
    eligibility: [
      'All farmers (loanee & non-loanee)',
      'Crops notified by state govt',
      'Enrollment before sowing deadline',
      'Valid land records or tenancy agreement'
    ],
    amount: 'Upto ₹2 lakh coverage',
    deadline: 'Kharif: July 31',
    status: 'active',
    link: 'https://pmfby.gov.in',
    icon: Shield,
    category: 'insurance'
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC)',
    nameHindi: 'किसान क्रेडिट कार्ड',
    description: 'Flexible credit facility for farmers to meet their cultivation and other needs at low interest rates.',
    benefits: [
      'Interest rate: 4% (with subsidy)',
      'Credit limit based on land holding',
      'Revolving cash credit facility',
      'ATM-enabled for cash withdrawal'
    ],
    eligibility: [
      'Owner cultivators & tenant farmers',
      'Oral lessees & share croppers',
      'SHGs or Joint Liability Groups',
      'Age: 18-75 years'
    ],
    amount: 'Upto ₹3 lakh @ 4%',
    status: 'active',
    link: 'https://www.india.gov.in/kisan-credit-card',
    icon: CreditCard,
    category: 'loan'
  },
  {
    id: 'pmksy',
    name: 'PM Krishi Sinchai Yojana',
    nameHindi: 'पीएम कृषि सिंचाई योजना',
    description: 'Subsidies for micro-irrigation systems including drip and sprinkler irrigation to improve water efficiency.',
    benefits: [
      '55-90% subsidy on drip/sprinkler',
      'Water savings upto 50%',
      'Increased crop yield by 20-40%',
      'Reduced fertilizer usage'
    ],
    eligibility: [
      'All categories of farmers',
      'Own/leased agricultural land',
      'Water source availability',
      'Small & marginal farmers get higher subsidy'
    ],
    amount: 'Upto 90% subsidy',
    status: 'active',
    link: 'https://pmksy.gov.in',
    icon: Droplets,
    category: 'irrigation'
  },
  {
    id: 'smam',
    name: 'Sub-Mission on Agri Mechanization',
    nameHindi: 'कृषि यंत्रीकरण उप-मिशन',
    description: 'Financial assistance for purchase of agricultural machinery and equipment.',
    benefits: [
      '40-50% subsidy on machinery',
      'Custom hiring centers support',
      'Hi-tech hub promotion',
      'Farm machinery banks'
    ],
    eligibility: [
      'Individual farmers',
      'Farmer groups/cooperatives',
      'FPOs and custom hiring centers',
      'Priority to SC/ST/small farmers'
    ],
    amount: '40-50% subsidy',
    status: 'active',
    link: 'https://agrimachinery.nic.in',
    icon: Tractor,
    category: 'subsidy'
  },
  {
    id: 'soil-health',
    name: 'Soil Health Card Scheme',
    nameHindi: 'मृदा स्वास्थ्य कार्ड योजना',
    description: 'Free soil testing and recommendations for appropriate nutrients and fertilizers.',
    benefits: [
      'Free soil testing every 2 years',
      'Nutrient recommendations',
      'Improved fertilizer efficiency',
      'Better crop planning'
    ],
    eligibility: [
      'All farmers with agricultural land',
      'No registration fee',
      'Available at local agriculture office',
      'Online application available'
    ],
    amount: 'Free service',
    status: 'active',
    link: 'https://soilhealth.dac.gov.in',
    icon: FileText,
    category: 'subsidy'
  },
];

const categoryLabels = {
  subsidy: { label: 'Subsidies', icon: IndianRupee, color: 'bg-green-500' },
  insurance: { label: 'Insurance', icon: Shield, color: 'bg-blue-500' },
  loan: { label: 'Loans', icon: CreditCard, color: 'bg-purple-500' },
  irrigation: { label: 'Irrigation', icon: Droplets, color: 'bg-cyan-500' },
};

const GovSchemes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const filteredSchemes = activeTab === 'all' 
    ? schemes 
    : schemes.filter(s => s.category === activeTab);

  const getStatusBadge = (status: Scheme['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 text-white"><Clock className="w-3 h-3 mr-1" />Upcoming</Badge>;
      case 'closing-soon':
        return <Badge className="bg-orange-500 text-white"><Clock className="w-3 h-3 mr-1" />Closing Soon</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-500 p-4 pb-6 rounded-b-3xl">
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
            <h1 className="text-xl font-bold text-primary-foreground">Government Schemes</h1>
            <p className="text-primary-foreground/80 text-sm">सरकारी योजनाएं</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-primary-foreground/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold text-primary-foreground">{schemes.length}</p>
            <p className="text-xs text-primary-foreground/80">Active Schemes</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold text-primary-foreground">₹6K</p>
            <p className="text-xs text-primary-foreground/80">PM-KISAN/yr</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-bold text-primary-foreground">4%</p>
            <p className="text-xs text-primary-foreground/80">KCC Interest</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-auto flex-wrap gap-1 bg-muted/50 p-1">
            <TabsTrigger value="all" className="flex-1 min-w-[70px]">All</TabsTrigger>
            <TabsTrigger value="subsidy" className="flex-1 min-w-[70px]">Subsidies</TabsTrigger>
            <TabsTrigger value="insurance" className="flex-1 min-w-[70px]">Insurance</TabsTrigger>
            <TabsTrigger value="loan" className="flex-1 min-w-[70px]">Loans</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Scheme Cards */}
        <div className="space-y-4">
          {filteredSchemes.map((scheme, index) => {
            const Icon = scheme.icon;
            const category = categoryLabels[scheme.category];
            
            return (
              <Card 
                key={scheme.id} 
                className="border-0 shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-0">
                  {/* Scheme Header */}
                  <div className={`bg-gradient-to-r ${
                    scheme.category === 'subsidy' ? 'from-green-50 to-emerald-50' :
                    scheme.category === 'insurance' ? 'from-blue-50 to-cyan-50' :
                    scheme.category === 'loan' ? 'from-purple-50 to-pink-50' :
                    'from-cyan-50 to-teal-50'
                  } p-4`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {getStatusBadge(scheme.status)}
                    </div>
                    <h3 className="font-bold text-lg">{scheme.name}</h3>
                    <p className="text-muted-foreground text-sm">{scheme.nameHindi}</p>
                  </div>

                  {/* Scheme Details */}
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>

                    {/* Amount Highlight */}
                    <div className="bg-primary/10 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-sm font-medium">Benefit Amount</span>
                      <span className="text-lg font-bold text-primary">{scheme.amount}</span>
                    </div>

                    {scheme.deadline && (
                      <div className="bg-orange-50 rounded-lg p-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-700">Deadline: {scheme.deadline}</span>
                      </div>
                    )}

                    {/* Benefits */}
                    <div>
                      <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Key Benefits
                      </p>
                      <ul className="space-y-1">
                        {scheme.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Eligibility */}
                    <div>
                      <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <FileText className="w-4 h-4 text-blue-500" />
                        Eligibility
                      </p>
                      <ul className="space-y-1">
                        {scheme.eligibility.slice(0, 2).map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Apply Button */}
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => window.open(scheme.link, '_blank')}
                    >
                      <Landmark className="w-4 h-4 mr-2" />
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Premium Banner */}
        <PremiumBanner variant="compact" />

        {/* Help Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-agro-leaf/10">
          <CardContent className="p-4 text-center">
            <Landmark className="w-10 h-10 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Need Help Applying?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Visit your nearest CSC (Common Service Centre) or Krishi Vigyan Kendra for assistance.
            </p>
            <p className="text-xs text-muted-foreground">
              📞 Kisan Call Center: <span className="font-bold">1800-180-1551</span> (Toll Free)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovSchemes;
