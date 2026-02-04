import { Home, ShoppingBag, TrendingUp, Bot, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/app' },
  { icon: ShoppingBag, label: 'Shop', path: '/app/shop' },
  { icon: TrendingUp, label: 'Market', path: '/app/market' },
  { icon: Bot, label: 'Ask AI', path: '/app/ask-ai' },
  { icon: User, label: 'Profile', path: '/app/profile' },
];

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              )}
            >
              <div className={cn(
                'p-1.5 rounded-xl',
                isActive && 'bg-primary/10'
              )}>
                <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.5]')} />
              </div>
              <span className={cn(
                'text-[10px] font-medium',
                isActive && 'font-semibold'
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
