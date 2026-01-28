import { useState } from 'react';
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PremiumBanner from '@/components/PremiumBanner';
import PageHeader from '@/components/PageHeader';

const categories = ['All', 'Pesticides', 'Fertilizers', 'Seeds', 'Compost', 'Tools', 'Equipment'];

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  inStock: boolean;
  externalUrl: string;
  source: string;
}

const products: Product[] = [
  // Pesticides
  {
    id: 1,
    name: 'Chlorpyriphos 20% EC',
    category: 'Pesticides',
    price: 450,
    unit: '1L',
    rating: 4.5,
    reviews: 128,
    image: '🧪',
    description: 'Effective against soil pests and termites',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=chlorpyriphos+20+ec',
    source: 'Amazon',
  },
  {
    id: 2,
    name: 'Imidacloprid 17.8% SL',
    category: 'Pesticides',
    price: 680,
    unit: '250ml',
    rating: 4.7,
    reviews: 95,
    image: '💊',
    description: 'For sucking pests like aphids and whitefly',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=imidacloprid+17.8+sl',
    source: 'Amazon',
  },
  {
    id: 3,
    name: 'Neem Oil Organic Pesticide',
    category: 'Pesticides',
    price: 320,
    unit: '500ml',
    rating: 4.6,
    reviews: 234,
    image: '🌿',
    description: 'Natural organic pest control solution',
    inStock: true,
    externalUrl: 'https://www.flipkart.com/search?q=neem+oil+pesticide',
    source: 'Flipkart',
  },
  {
    id: 4,
    name: 'Mancozeb 75% WP Fungicide',
    category: 'Pesticides',
    price: 290,
    unit: '500g',
    rating: 4.4,
    reviews: 156,
    image: '🛡️',
    description: 'Broad spectrum fungicide for crops',
    inStock: true,
    externalUrl: 'https://www.bighaat.com/search?q=mancozeb',
    source: 'BigHaat',
  },
  // Fertilizers
  {
    id: 5,
    name: 'NPK 10-26-26',
    category: 'Fertilizers',
    price: 1450,
    unit: '50kg',
    rating: 4.8,
    reviews: 312,
    image: '🌱',
    description: 'Balanced nutrition for flowering stage',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=npk+10-26-26+fertilizer',
    source: 'Amazon',
  },
  {
    id: 6,
    name: 'Urea (46% N)',
    category: 'Fertilizers',
    price: 290,
    unit: '50kg',
    rating: 4.6,
    reviews: 456,
    image: '🧬',
    description: 'High nitrogen content for vegetative growth',
    inStock: true,
    externalUrl: 'https://www.flipkart.com/search?q=urea+fertilizer',
    source: 'Flipkart',
  },
  {
    id: 7,
    name: 'DAP Fertilizer',
    category: 'Fertilizers',
    price: 1350,
    unit: '50kg',
    rating: 4.7,
    reviews: 289,
    image: '💎',
    description: 'Di-ammonium phosphate for root development',
    inStock: true,
    externalUrl: 'https://www.bighaat.com/search?q=dap+fertilizer',
    source: 'BigHaat',
  },
  {
    id: 8,
    name: 'Potash MOP 60%',
    category: 'Fertilizers',
    price: 850,
    unit: '50kg',
    rating: 4.5,
    reviews: 178,
    image: '🔶',
    description: 'Muriate of potash for fruit quality',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=potash+fertilizer+mop',
    source: 'Amazon',
  },
  // Seeds
  {
    id: 9,
    name: 'Wheat HD-2967 Seeds',
    category: 'Seeds',
    price: 2100,
    unit: '40kg',
    rating: 4.7,
    reviews: 178,
    image: '🌾',
    description: 'High yielding, disease resistant variety',
    inStock: true,
    externalUrl: 'https://www.bighaat.com/search?q=wheat+seeds',
    source: 'BigHaat',
  },
  {
    id: 10,
    name: 'Mustard RH-749 Seeds',
    category: 'Seeds',
    price: 480,
    unit: '5kg',
    rating: 4.5,
    reviews: 92,
    image: '🌻',
    description: 'Early maturing, high oil content',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=mustard+seeds+rh+749',
    source: 'Amazon',
  },
  {
    id: 11,
    name: 'Hybrid Tomato Seeds',
    category: 'Seeds',
    price: 350,
    unit: '100g',
    rating: 4.8,
    reviews: 312,
    image: '🍅',
    description: 'High yield hybrid tomato variety',
    inStock: true,
    externalUrl: 'https://www.flipkart.com/search?q=hybrid+tomato+seeds',
    source: 'Flipkart',
  },
  {
    id: 12,
    name: 'Paddy Pusa Basmati Seeds',
    category: 'Seeds',
    price: 1850,
    unit: '20kg',
    rating: 4.9,
    reviews: 445,
    image: '🌿',
    description: 'Premium basmati rice variety',
    inStock: true,
    externalUrl: 'https://www.bighaat.com/search?q=basmati+rice+seeds',
    source: 'BigHaat',
  },
  {
    id: 13,
    name: 'Chilli Hybrid Seeds',
    category: 'Seeds',
    price: 280,
    unit: '50g',
    rating: 4.6,
    reviews: 198,
    image: '🌶️',
    description: 'High pungency hybrid chilli',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=hybrid+chilli+seeds',
    source: 'Amazon',
  },
  // Compost
  {
    id: 14,
    name: 'Vermicompost Premium',
    category: 'Compost',
    price: 850,
    unit: '50kg',
    rating: 4.9,
    reviews: 234,
    image: '🪱',
    description: 'Organic, nutrient-rich soil amendment',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=vermicompost+organic',
    source: 'Amazon',
  },
  {
    id: 15,
    name: 'Neem Cake Powder',
    category: 'Compost',
    price: 420,
    unit: '25kg',
    rating: 4.4,
    reviews: 87,
    image: '🌿',
    description: 'Natural pest repellent and soil enricher',
    inStock: true,
    externalUrl: 'https://www.flipkart.com/search?q=neem+cake+powder',
    source: 'Flipkart',
  },
  {
    id: 16,
    name: 'Bio-Decomposer Spray',
    category: 'Compost',
    price: 350,
    unit: '5L',
    rating: 4.8,
    reviews: 156,
    image: '🔬',
    description: 'Decomposes stubble in 20-25 days',
    inStock: true,
    externalUrl: 'https://www.bighaat.com/search?q=bio+decomposer',
    source: 'BigHaat',
  },
  {
    id: 17,
    name: 'Cow Dung Compost',
    category: 'Compost',
    price: 280,
    unit: '25kg',
    rating: 4.5,
    reviews: 345,
    image: '🐄',
    description: 'Traditional organic manure',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=cow+dung+compost',
    source: 'Amazon',
  },
  // Tools
  {
    id: 18,
    name: 'Garden Sprayer Pump',
    category: 'Tools',
    price: 1200,
    unit: '16L',
    rating: 4.3,
    reviews: 67,
    image: '🔧',
    description: 'Manual pressure sprayer for pesticides',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=garden+sprayer+pump+16l',
    source: 'Amazon',
  },
  {
    id: 19,
    name: 'Hand Cultivator Set',
    category: 'Tools',
    price: 650,
    unit: '3pc',
    rating: 4.6,
    reviews: 234,
    image: '🛠️',
    description: 'Ergonomic garden tool set',
    inStock: true,
    externalUrl: 'https://www.flipkart.com/search?q=hand+cultivator+set',
    source: 'Flipkart',
  },
  {
    id: 20,
    name: 'Drip Irrigation Kit',
    category: 'Tools',
    price: 2450,
    unit: '100m',
    rating: 4.7,
    reviews: 189,
    image: '💧',
    description: 'Complete drip system for gardens',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=drip+irrigation+kit',
    source: 'Amazon',
  },
  {
    id: 21,
    name: 'Pruning Shears',
    category: 'Tools',
    price: 380,
    unit: '1pc',
    rating: 4.5,
    reviews: 156,
    image: '✂️',
    description: 'Sharp bypass pruner for clean cuts',
    inStock: true,
    externalUrl: 'https://www.flipkart.com/search?q=pruning+shears',
    source: 'Flipkart',
  },
  // Equipment
  {
    id: 22,
    name: 'Solar Water Pump',
    category: 'Equipment',
    price: 25000,
    unit: '1HP',
    rating: 4.8,
    reviews: 89,
    image: '☀️',
    description: 'Solar powered irrigation pump',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=solar+water+pump+1hp',
    source: 'Amazon',
  },
  {
    id: 23,
    name: 'Power Tiller Mini',
    category: 'Equipment',
    price: 45000,
    unit: '1pc',
    rating: 4.6,
    reviews: 56,
    image: '🚜',
    description: 'Compact tiller for small farms',
    inStock: true,
    externalUrl: 'https://www.flipkart.com/search?q=power+tiller+mini',
    source: 'Flipkart',
  },
  {
    id: 24,
    name: 'Battery Sprayer 12V',
    category: 'Equipment',
    price: 3500,
    unit: '16L',
    rating: 4.7,
    reviews: 278,
    image: '🔋',
    description: 'Rechargeable electric sprayer',
    inStock: true,
    externalUrl: 'https://www.amazon.in/s?k=battery+sprayer+12v+16l',
    source: 'Amazon',
  },
  {
    id: 25,
    name: 'Soil Testing Kit',
    category: 'Equipment',
    price: 1850,
    unit: '1kit',
    rating: 4.4,
    reviews: 123,
    image: '🧪',
    description: 'Complete NPK & pH testing kit',
    inStock: true,
    externalUrl: 'https://www.bighaat.com/search?q=soil+testing+kit',
    source: 'BigHaat',
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleBuyNow = (product: Product) => {
    window.open(product.externalUrl, '_blank', 'noopener,noreferrer');
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Amazon': return 'bg-orange-500';
      case 'Flipkart': return 'bg-yellow-500';
      case 'BigHaat': return 'bg-green-600';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Agri Shop"
        subtitle="Quality farming products"
        gradient="from-primary to-agro-leaf"
      >
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-primary'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </PageHeader>
      {/* Products Grid */}
      <div className="p-4">
        {/* Premium Banner */}
        <div className="mb-4">
          <PremiumBanner variant="compact" />
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-4">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            🛒 Products are linked to trusted e-commerce sites. Click "Buy Now" to purchase.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-2xl p-3 shadow-sm border animate-fade-in relative overflow-hidden"
            >
              {/* Source Badge */}
              <div className={`absolute top-2 right-2 ${getSourceColor(product.source)} text-white text-[10px] px-2 py-0.5 rounded-full font-medium`}>
                {product.source}
              </div>
              
              <div className="text-4xl text-center mb-2 mt-4">{product.image}</div>
              <h3 className="font-semibold text-foreground text-sm line-clamp-2 h-10">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {product.description}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3 h-3 fill-agro-sun text-agro-sun" />
                <span className="text-xs font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <div>
                  <p className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">per {product.unit}</p>
                </div>
                {!product.inStock ? (
                  <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                ) : (
                  <Button
                    size="sm"
                    className="rounded-xl h-8 px-3 gap-1"
                    onClick={() => handleBuyNow(product)}
                  >
                    <span className="text-xs">Buy</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
