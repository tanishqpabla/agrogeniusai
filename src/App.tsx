import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CropRecommendation from "./pages/CropRecommendation";
import GovSchemes from "./pages/GovSchemes";
import CropScanner from "./pages/CropScanner";
import Weather from "./pages/Weather";
import SoilHealth from "./pages/SoilHealth";
import Market from "./pages/Market";
import Shop from "./pages/Shop";
import AskAI from "./pages/AskAI";
import Profile from "./pages/Profile";
import ParaliManagement from "./pages/ParaliManagement";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import LaunchingSoon from "./pages/LaunchingSoon";
 import PrivacyPolicy from "./pages/PrivacyPolicy";
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient();

// Protected route wrapper - must be used inside AuthProvider
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Login route - redirects to app if already authenticated
const LoginRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
     <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    
    {/* Protected app routes with bottom navigation */}
    <Route path="/app" element={<ProtectedRoute><AppLayout><Home /></AppLayout></ProtectedRoute>} />
    <Route path="/app/shop" element={<ProtectedRoute><AppLayout><Shop /></AppLayout></ProtectedRoute>} />
    <Route path="/app/market" element={<ProtectedRoute><AppLayout><Market /></AppLayout></ProtectedRoute>} />
    <Route path="/app/ask-ai" element={<ProtectedRoute><AppLayout><AskAI /></AppLayout></ProtectedRoute>} />
    <Route path="/app/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
    
    {/* Protected app routes without bottom navigation */}
    <Route path="/app/scan" element={<ProtectedRoute><CropScanner /></ProtectedRoute>} />
    <Route path="/app/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
    <Route path="/app/soil" element={<ProtectedRoute><SoilHealth /></ProtectedRoute>} />
    <Route path="/app/crop-recommendation" element={<ProtectedRoute><CropRecommendation /></ProtectedRoute>} />
    <Route path="/app/gov-schemes" element={<ProtectedRoute><GovSchemes /></ProtectedRoute>} />
    <Route path="/app/parali" element={<ProtectedRoute><ParaliManagement /></ProtectedRoute>} />
    <Route path="/app/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
    <Route path="/app/launching-soon" element={<ProtectedRoute><LaunchingSoon /></ProtectedRoute>} />
    
    {/* Legacy route redirects for compatibility */}
    <Route path="/home" element={<Navigate to="/app" replace />} />
    <Route path="/shop" element={<Navigate to="/app/shop" replace />} />
    <Route path="/market" element={<Navigate to="/app/market" replace />} />
    <Route path="/ask-ai" element={<Navigate to="/app/ask-ai" replace />} />
    <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
    <Route path="/scan" element={<Navigate to="/app/scan" replace />} />
    <Route path="/weather" element={<Navigate to="/app/weather" replace />} />
    <Route path="/soil" element={<Navigate to="/app/soil" replace />} />
    <Route path="/crop-recommendation" element={<Navigate to="/app/crop-recommendation" replace />} />
    <Route path="/gov-schemes" element={<Navigate to="/app/gov-schemes" replace />} />
    <Route path="/parali" element={<Navigate to="/app/parali" replace />} />
    <Route path="/pricing" element={<Navigate to="/app/pricing" replace />} />
    <Route path="/launching-soon" element={<Navigate to="/app/launching-soon" replace />} />
    
    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Wrapper that ensures routes are rendered inside AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppWithAuth />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
