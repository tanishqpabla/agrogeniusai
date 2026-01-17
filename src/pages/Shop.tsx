import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Plus, Minus, Package, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PremiumBanner from '@/components/PremiumBanner';

const categories = ['All', 'Pesticides', 'Fertilizers', 'Seeds', 'Compost', 'Tools', 'Equipment'];

const products = [
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
    amazonLink: 'https://www.amazon.in/s?k=chlorpyriphos+20+ec+insecticide',
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
    amazonLink: 'https://www.amazon.in/s?k=imidacloprid+insecticide',
  },
  {
    id: 3,
    name: 'NPK 10-26-26 Fertilizer',
    category: 'Fertilizers',
    price: 1450,
    unit: '50kg',
    rating: 4.8,
    reviews: 312,
    image: '🌱',
    description: 'Balanced nutrition for flowering stage',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=npk+fertilizer+10-26-26',
  },
  {
    id: 4,
    name: 'Urea (46% N)',
    category: 'Fertilizers',
    price: 290,
    unit: '50kg',
    rating: 4.6,
    reviews: 456,
    image: '🧬',
    description: 'High nitrogen content for vegetative growth',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=urea+fertilizer+agriculture',
  },
  {
    id: 5,
    name: 'Vermicompost Premium',
    category: 'Compost',
    price: 850,
    unit: '50kg',
    rating: 4.9,
    reviews: 234,
    image: '🪱',
    description: 'Organic, nutrient-rich soil amendment',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=vermicompost+organic',
  },
  {
    id: 6,
    name: 'Neem Cake Powder',
    category: 'Compost',
    price: 420,
    unit: '25kg',
    rating: 4.4,
    reviews: 87,
    image: '🌿',
    description: 'Natural pest repellent and soil enricher',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=neem+cake+powder+fertilizer',
  },
  {
    id: 7,
    name: 'Wheat HD-2967 Seeds',
    category: 'Seeds',
    price: 2100,
    unit: '40kg',
    rating: 4.7,
    reviews: 178,
    image: '🌾',
    description: 'High yielding, disease resistant variety',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=wheat+seeds+hd+2967',
  },
  {
    id: 8,
    name: 'Mustard RH-749 Seeds',
    category: 'Seeds',
    price: 480,
    unit: '5kg',
    rating: 4.5,
    reviews: 92,
    image: '🌻',
    description: 'Early maturing, high oil content',
    inStock: false,
    amazonLink: 'https://www.amazon.in/s?k=mustard+seeds+agriculture',
  },
  {
    id: 9,
    name: 'Bio-Decomposer Spray',
    category: 'Compost',
    price: 350,
    unit: '5L',
    rating: 4.8,
    reviews: 156,
    image: '🔬',
    description: 'Decomposes stubble in 20-25 days',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=bio+decomposer+spray+agriculture',
  },
  {
    id: 10,
    name: 'Garden Sprayer Pump',
    category: 'Tools',
    price: 1200,
    unit: '16L',
    rating: 4.3,
    reviews: 67,
    image: '🔧',
    description: 'Manual pressure sprayer for pesticides',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=garden+sprayer+pump+16+litre',
  },
  {
    id: 11,
    name: 'DAP Fertilizer 18-46-0',
    category: 'Fertilizers',
    price: 1350,
    unit: '50kg',
    rating: 4.7,
    reviews: 289,
    image: '💎',
    description: 'Di-ammonium phosphate for root development',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=dap+fertilizer+50kg',
  },
  {
    id: 12,
    name: 'Potash MOP 60%',
    category: 'Fertilizers',
    price: 980,
    unit: '50kg',
    rating: 4.5,
    reviews: 167,
    image: '🧂',
    description: 'Muriate of potash for fruit quality',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=potash+mop+fertilizer',
  },
  {
    id: 13,
    name: 'Humic Acid Liquid',
    category: 'Fertilizers',
    price: 520,
    unit: '5L',
    rating: 4.6,
    reviews: 134,
    image: '🫧',
    description: 'Improves soil structure and nutrient uptake',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=humic+acid+liquid+agriculture',
  },
  {
    id: 14,
    name: 'Paddy Rice Seeds',
    category: 'Seeds',
    price: 1800,
    unit: '25kg',
    rating: 4.8,
    reviews: 245,
    image: '🍚',
    description: 'Basmati variety, high yield potential',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=paddy+rice+seeds+basmati',
  },
  {
    id: 15,
    name: 'Tomato Hybrid Seeds',
    category: 'Seeds',
    price: 350,
    unit: '100g',
    rating: 4.4,
    reviews: 189,
    image: '🍅',
    description: 'Disease resistant, high yielding hybrid',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=tomato+hybrid+seeds',
  },
  {
    id: 16,
    name: 'Onion Seeds Black',
    category: 'Seeds',
    price: 280,
    unit: '500g',
    rating: 4.3,
    reviews: 112,
    image: '🧅',
    description: 'Nasik Red variety, good storage life',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=onion+seeds+nasik+red',
  },
  {
    id: 17,
    name: 'Neem Oil Pesticide',
    category: 'Pesticides',
    price: 380,
    unit: '1L',
    rating: 4.6,
    reviews: 267,
    image: '🌳',
    description: 'Organic pest control for all crops',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=neem+oil+pesticide+organic',
  },
  {
    id: 18,
    name: 'Mancozeb 75% WP',
    category: 'Pesticides',
    price: 520,
    unit: '1kg',
    rating: 4.5,
    reviews: 198,
    image: '🛡️',
    description: 'Fungicide for blight and leaf spot',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=mancozeb+75+wp+fungicide',
  },
  {
    id: 19,
    name: 'Carbendazim 50% WP',
    category: 'Pesticides',
    price: 290,
    unit: '500g',
    rating: 4.4,
    reviews: 145,
    image: '💉',
    description: 'Systemic fungicide for seed treatment',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=carbendazim+50+wp+fungicide',
  },
  {
    id: 20,
    name: 'Seaweed Extract',
    category: 'Fertilizers',
    price: 450,
    unit: '1L',
    rating: 4.7,
    reviews: 178,
    image: '🌊',
    description: 'Bio-stimulant for plant growth',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=seaweed+extract+fertilizer',
  },
  {
    id: 21,
    name: 'Cow Dung Compost',
    category: 'Compost',
    price: 320,
    unit: '25kg',
    rating: 4.8,
    reviews: 312,
    image: '🐄',
    description: 'Natural organic manure for all crops',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=cow+dung+compost+organic',
  },
  {
    id: 22,
    name: 'Cocopeat Block',
    category: 'Compost',
    price: 180,
    unit: '5kg',
    rating: 4.6,
    reviews: 234,
    image: '🥥',
    description: 'Excellent water retention for seedlings',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=cocopeat+block+5kg',
  },
  {
    id: 23,
    name: 'Bone Meal Fertilizer',
    category: 'Compost',
    price: 280,
    unit: '5kg',
    rating: 4.5,
    reviews: 156,
    image: '🦴',
    description: 'Organic phosphorus source for roots',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=bone+meal+fertilizer+organic',
  },
  {
    id: 24,
    name: 'Pruning Shears',
    category: 'Tools',
    price: 450,
    unit: '1pc',
    rating: 4.4,
    reviews: 189,
    image: '✂️',
    description: 'Sharp bypass pruner for clean cuts',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=pruning+shears+garden',
  },
  {
    id: 25,
    name: 'Garden Hoe Steel',
    category: 'Tools',
    price: 380,
    unit: '1pc',
    rating: 4.3,
    reviews: 134,
    image: '⛏️',
    description: 'Heavy duty weeding and cultivating tool',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=garden+hoe+steel+tool',
  },
  {
    id: 26,
    name: 'Drip Irrigation Kit',
    category: 'Equipment',
    price: 2800,
    unit: '100m',
    rating: 4.7,
    reviews: 267,
    image: '💧',
    description: 'Complete drip system for 1 acre',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=drip+irrigation+kit+agriculture',
  },
  {
    id: 27,
    name: 'Mulching Sheet Black',
    category: 'Equipment',
    price: 1200,
    unit: '400m',
    rating: 4.5,
    reviews: 189,
    image: '🎭',
    description: 'Weed control and moisture retention',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=mulching+sheet+black+agriculture',
  },
  {
    id: 28,
    name: 'Shade Net 50%',
    category: 'Equipment',
    price: 950,
    unit: '10m',
    rating: 4.6,
    reviews: 145,
    image: '🏕️',
    description: 'UV stabilized green shade net',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=shade+net+50+percent+green',
  },
  {
    id: 29,
    name: 'Soil pH Tester',
    category: 'Tools',
    price: 650,
    unit: '1pc',
    rating: 4.4,
    reviews: 178,
    image: '📊',
    description: 'Digital pH meter for soil testing',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=soil+ph+tester+digital',
  },
  {
    id: 30,
    name: 'Battery Sprayer 12V',
    category: 'Equipment',
    price: 3500,
    unit: '16L',
    rating: 4.8,
    reviews: 312,
    image: '🔋',
    description: 'Rechargeable electric sprayer pump',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=battery+sprayer+16+litre+agriculture',
  },
  {
    id: 31,
    name: 'Chilli Seeds F1 Hybrid',
    category: 'Seeds',
    price: 420,
    unit: '100g',
    rating: 4.6,
    reviews: 234,
    image: '🌶️',
    description: 'High pungency, heavy bearing variety',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=chilli+seeds+f1+hybrid',
  },
  {
    id: 32,
    name: 'Cotton BT Seeds',
    category: 'Seeds',
    price: 850,
    unit: '450g',
    rating: 4.5,
    reviews: 198,
    image: '☁️',
    description: 'Bollworm resistant BT cotton variety',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=bt+cotton+seeds',
  },
  {
    id: 33,
    name: 'Soybean JS-335 Seeds',
    category: 'Seeds',
    price: 1200,
    unit: '30kg',
    rating: 4.7,
    reviews: 156,
    image: '🫘',
    description: 'High protein, disease tolerant variety',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=soybean+seeds+js+335',
  },
  {
    id: 34,
    name: 'Thiamethoxam 25% WG',
    category: 'Pesticides',
    price: 780,
    unit: '250g',
    rating: 4.6,
    reviews: 167,
    image: '⚡',
    description: 'Systemic insecticide for sucking pests',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=thiamethoxam+25+wg+insecticide',
  },
  {
    id: 35,
    name: 'Glyphosate 41% SL',
    category: 'Pesticides',
    price: 580,
    unit: '1L',
    rating: 4.3,
    reviews: 189,
    image: '☠️',
    description: 'Non-selective herbicide for weeds',
    inStock: true,
    amazonLink: 'https://www.amazon.in/s?k=glyphosate+41+herbicide',
  },
];

interface CartItem {
  id: number;
  quantity: number;
}

const Shop = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const getCartQuantity = (productId: number) => {
    return cart.find(item => item.id === productId)?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const openProductLink = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-agro-leaf p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Agri Shop</h1>
              <p className="text-white/80 text-sm">Quality farming products</p>
            </div>
          </div>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
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
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {/* Premium Banner */}
        <div className="mb-4">
          <PremiumBanner variant="compact" />
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <p className="text-xs text-blue-700">
            Tap on any product to view and buy on Amazon India
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const cartQty = getCartQuantity(product.id);
            return (
              <div
                key={product.id}
                className="bg-card rounded-2xl p-3 shadow-sm border animate-fade-in cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openProductLink(product.amazonLink)}
              >
                <div className="flex justify-between items-start">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
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
                    <p className="text-lg font-bold text-foreground">₹{product.price}</p>
                    <p className="text-xs text-muted-foreground">per {product.unit}</p>
                  </div>
                  {!product.inStock ? (
                    <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                  ) : cartQty === 0 ? (
                    <Button
                      size="sm"
                      className="rounded-xl h-8 px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-sm w-4 text-center">{cartQty}</span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 z-50">
          <div className="bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg flex items-center justify-between max-w-lg mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">{totalItems} items</p>
                <p className="text-sm text-primary-foreground/80">₹{totalAmount}</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              className="rounded-xl"
              onClick={() => navigate('/launching-soon')}
            >
              View Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
