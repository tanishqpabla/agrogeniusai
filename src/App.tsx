import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
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
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient();

// Protected route wrapper - must be used inside AuthProvider
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Public route - redirects to home if already authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Public route - Login */}
    <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
    
    {/* Protected routes with bottom navigation */}
    <Route path="/home" element={<ProtectedRoute><AppLayout><Home /></AppLayout></ProtectedRoute>} />
    <Route path="/shop" element={<ProtectedRoute><AppLayout><Shop /></AppLayout></ProtectedRoute>} />
    <Route path="/market" element={<ProtectedRoute><AppLayout><Market /></AppLayout></ProtectedRoute>} />
    <Route path="/ask-ai" element={<ProtectedRoute><AppLayout><AskAI /></AppLayout></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><AppLayout><Profile /></AppLayout></ProtectedRoute>} />
    
    {/* Protected routes without bottom navigation */}
    <Route path="/scan" element={<ProtectedRoute><CropScanner /></ProtectedRoute>} />
    <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
    <Route path="/soil" element={<ProtectedRoute><SoilHealth /></ProtectedRoute>} />
    <Route path="/crop-recommendation" element={<ProtectedRoute><CropRecommendation /></ProtectedRoute>} />
    <Route path="/gov-schemes" element={<ProtectedRoute><GovSchemes /></ProtectedRoute>} />
    <Route path="/parali" element={<ProtectedRoute><ParaliManagement /></ProtectedRoute>} />
    <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
    
    {/* Launching Soon */}
    <Route path="/launching-soon" element={<ProtectedRoute><LaunchingSoon /></ProtectedRoute>} />
    
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
