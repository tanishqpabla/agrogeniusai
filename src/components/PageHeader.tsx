import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: string;
  showBack?: boolean;
  showLogo?: boolean;
  children?: React.ReactNode;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  gradient = 'from-primary to-agro-leaf',
  showBack = true,
  showLogo = true,
  children 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-gradient-to-r ${gradient} p-4`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={() => navigate(-1)} 
              className="text-primary-foreground hover:bg-primary-foreground/10 p-1 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">{title}</h1>
            {subtitle && (
              <p className="text-primary-foreground/80 text-sm">{subtitle}</p>
            )}
          </div>
        </div>
        {showLogo && (
          <img 
            src={logo} 
            alt="AgroGenius AI" 
            className="w-10 h-10 rounded-full object-cover shadow-md"
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
