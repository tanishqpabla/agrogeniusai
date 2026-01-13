import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Plus, Minus, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PremiumBanner from '@/components/PremiumBanner';

const categories = ['All', 'Pesticides', 'Fertilizers', 'Seeds', 'Compost', 'Tools'];

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
  },
  {
    id: 3,
    name: 'NPK 10-26-26',
    category: 'Fertilizers',
    price: 1450,
    unit: '50kg',
    rating: 4.8,
    reviews: 312,
    image: '🌱',
    description: 'Balanced nutrition for flowering stage',
    inStock: true,
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
        
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const cartQty = getCartQuantity(product.id);
            return (
              <div
                key={product.id}
                className="bg-card rounded-2xl p-3 shadow-sm border animate-fade-in"
              >
                <div className="text-4xl text-center mb-2">{product.image}</div>
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
                      onClick={() => addToCart(product.id)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
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
            <Button variant="secondary" className="rounded-xl">
              View Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
