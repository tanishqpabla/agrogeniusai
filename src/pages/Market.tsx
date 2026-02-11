import { useState, useEffect } from 'react';
import { AlertCircle, TrendingUp, Database, Leaf } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PremiumBanner from '@/components/PremiumBanner';
import MandiPriceCard from '@/components/market/MandiPriceCard';
import MandiPriceSkeleton from '@/components/market/MandiPriceSkeleton';
import MandiFiltersBar from '@/components/market/MandiFiltersBar';
import { useMandiPrices, type MandiFilters } from '@/hooks/useMandiPrices';

const Market = () => {
  const [filters, setFilters] = useState<MandiFilters>({
    state: 'Haryana',
    district: 'All',
    commodity: 'Wheat',
    market: 'All',
  });

  const { prices, loading, error, source, fetchPrices } = useMandiPrices();

  // Auto-fetch on first load
  useEffect(() => {
    fetchPrices(filters);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterChange = (key: keyof MandiFilters, value: string) => {
    const updated = { ...filters, [key]: value };
    // Reset district when state changes
    if (key === 'state') {
      updated.district = 'All';
      updated.market = 'All';
    }
    setFilters(updated);
  };

  const handleSearch = () => {
    fetchPrices(filters);
  };

  // Find best price
  const bestPrice = prices.length > 0
    ? prices.reduce((best, p) => p.modal_price > best.modal_price ? p : best, prices[0])
    : null;

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader
        title="Live Mandi Prices"
        subtitle="Updated daily from official market data sources"
        gradient="from-primary to-agro-leaf"
      >
        <MandiFiltersBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          loading={loading}
        />
      </PageHeader>

      <div className="p-4 space-y-4">
        {/* Data Source Badge */}
        {source && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              source === 'live'
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              <Database className="w-3 h-3" />
              {source === 'live' ? 'Live Data from Agmarknet' : 'Sample Data (Connect API for live prices)'}
            </div>
            {prices.length > 0 && (
              <span className="text-xs text-muted-foreground">{prices.length} results</span>
            )}
          </div>
        )}

        {/* Best Price Tip */}
        {bestPrice && !loading && (
          <div className="bg-accent rounded-2xl p-4 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Best Price Today</h4>
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className="font-semibold text-primary">₹{bestPrice.modal_price.toLocaleString()}/q</span>
                  {' '}for {bestPrice.commodity} at{' '}
                  <span className="font-medium">{bestPrice.market}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-foreground">Error</h4>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MandiPriceSkeleton />
          </div>
        )}

        {/* Results */}
        {!loading && prices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prices.map((price, index) => (
              <MandiPriceCard key={`${price.market}-${price.commodity}-${index}`} price={price} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && prices.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No Results Found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Try changing your filters or select a different state and commodity.
            </p>
          </div>
        )}

        {/* Premium Banner */}
        <div className="mt-4">
          <PremiumBanner variant="compact" />
        </div>
      </div>
    </div>
  );
};

export default Market;
