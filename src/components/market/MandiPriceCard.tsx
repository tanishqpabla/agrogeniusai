import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';
import type { MandiPrice } from '@/hooks/useMandiPrices';

interface MandiPriceCardProps {
  price: MandiPrice;
}

const MandiPriceCard = ({ price }: MandiPriceCardProps) => {
  const TrendIcon = price.trend === 'up' ? TrendingUp :
    price.trend === 'down' ? TrendingDown : Minus;

  const trendColor = price.trend === 'up' ? 'text-green-600' :
    price.trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  const trendBg = price.trend === 'up' ? 'bg-green-50' :
    price.trend === 'down' ? 'bg-red-50' : 'bg-muted/50';

  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm border animate-fade-in hover-lift">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-foreground truncate">{price.commodity}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground truncate">{price.market}</p>
          </div>
          <p className="text-xs text-muted-foreground">{price.district}, {price.state}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trendBg} ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">
            {price.change_percent > 0 ? '+' : ''}{price.change_percent}%
          </span>
        </div>
      </div>

      {/* Modal Price - Highlighted */}
      <div className="bg-accent/50 rounded-xl p-3 mb-3 text-center">
        <p className="text-xs text-muted-foreground mb-0.5">Modal Price</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl font-bold text-primary">₹{price.modal_price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">/quintal</span>
        </div>
      </div>

      {/* Min/Max Prices */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <p className="text-xs text-muted-foreground">Min Price</p>
          <p className="font-semibold text-sm text-foreground">₹{price.min_price.toLocaleString()}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-muted/30">
          <p className="text-xs text-muted-foreground">Max Price</p>
          <p className="font-semibold text-sm text-foreground">₹{price.max_price.toLocaleString()}</p>
        </div>
      </div>

      {/* Date */}
      <p className="text-xs text-muted-foreground text-right mt-2">{price.date}</p>
    </div>
  );
};

export default MandiPriceCard;
