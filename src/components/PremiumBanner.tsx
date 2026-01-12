import { useNavigate } from 'react-router-dom';
import { Crown, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PremiumBannerProps {
  variant?: 'compact' | 'full';
}

const PremiumBanner = ({ variant = 'compact' }: PremiumBannerProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isHindi = user?.language === 'hi';

  if (variant === 'compact') {
    return (
      <button
        onClick={() => navigate('/pricing')}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl flex items-center justify-between text-white hover:opacity-95 transition-all active:scale-[0.99]"
      >
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5" />
          <span className="font-medium text-sm">
            {isHindi ? 'प्रीमियम में अपग्रेड करें' : 'Upgrade to Premium'}
          </span>
        </div>
        <ArrowRight className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate('/pricing')}
      className="w-full bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-4 rounded-2xl text-white hover:opacity-95 transition-all active:scale-[0.99] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8" />
      
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            <span className="font-bold">
              {isHindi ? 'प्रीमियम अनलॉक करें' : 'Unlock Premium'}
            </span>
          </div>
          <p className="text-white/80 text-xs mt-0.5">
            {isHindi 
              ? 'असीमित सुविधाएं ₹99/महीना से शुरू'
              : 'Unlimited features from ₹99/month'}
          </p>
        </div>
        <ArrowRight className="w-5 h-5" />
      </div>
    </button>
  );
};

export default PremiumBanner;
