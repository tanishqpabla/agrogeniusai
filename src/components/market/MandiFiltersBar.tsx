import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { STATES, DISTRICTS, COMMODITIES, type MandiFilters } from '@/hooks/useMandiPrices';

interface MandiFiltersBarProps {
  filters: MandiFilters;
  onFilterChange: (key: keyof MandiFilters, value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const MandiFiltersBar = ({ filters, onFilterChange, onSearch, loading }: MandiFiltersBarProps) => {
  const districts = DISTRICTS[filters.state] || ['All'];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Select value={filters.state} onValueChange={(v) => onFilterChange('state', v)}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl h-11 text-sm">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent className="bg-card max-h-60">
            {STATES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.district} onValueChange={(v) => onFilterChange('district', v)}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl h-11 text-sm">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent className="bg-card max-h-60">
            {districts.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select value={filters.commodity} onValueChange={(v) => onFilterChange('commodity', v)}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl h-11 text-sm">
            <SelectValue placeholder="Commodity" />
          </SelectTrigger>
          <SelectContent className="bg-card max-h-60">
            {COMMODITIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={onSearch}
          disabled={loading}
          className="h-11 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 font-medium text-sm"
        >
          <Search className="w-4 h-4 mr-2" />
          {loading ? 'Searching...' : 'Search Prices'}
        </Button>
      </div>
    </div>
  );
};

export default MandiFiltersBar;
