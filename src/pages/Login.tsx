import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Leaf, Phone, ArrowRight } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setShowOtp(true);
      setError('');
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      login(phone);
      navigate('/home');
    } else {
      setError('Invalid OTP. Use 1234 for demo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-agro-green-light to-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Leaf className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AgroGenius AI</h1>
        <p className="text-muted-foreground text-center">
          Your smart farming companion
        </p>
      </div>

      {/* Login Form */}
      <div className="bg-card rounded-t-3xl p-6 shadow-lg animate-slide-up">
        <h2 className="text-xl font-semibold mb-6 text-center">
          {showOtp ? 'Enter OTP' : 'Login with Phone'}
        </h2>

        {!showOtp ? (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                <Phone className="w-5 h-5" />
                <span className="text-sm font-medium">+91</span>
              </div>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="pl-20 h-14 text-lg rounded-xl"
                maxLength={10}
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button 
              onClick={handleSendOtp} 
              className="w-full h-14 text-lg rounded-xl gap-2"
              disabled={phone.length !== 10}
            >
              Send OTP
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center mb-4">
              OTP sent to +91 {phone}
            </p>
            <Input
              type="tel"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="h-14 text-2xl text-center tracking-[0.5em] rounded-xl"
              maxLength={4}
            />
            <p className="text-xs text-muted-foreground text-center">
              Demo OTP: <span className="font-mono font-bold">1234</span>
            </p>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button 
              onClick={handleVerifyOtp} 
              className="w-full h-14 text-lg rounded-xl gap-2"
              disabled={otp.length !== 4}
            >
              Verify & Login
              <ArrowRight className="w-5 h-5" />
            </Button>
            <button 
              onClick={() => { setShowOtp(false); setOtp(''); setError(''); }}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Change phone number
            </button>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Login;
