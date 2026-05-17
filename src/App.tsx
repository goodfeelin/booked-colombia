import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/ThemeProvider.tsx";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute.tsx";
import { AuthProvider } from "@/contexts/AuthContext.tsx";
import Index from "./pages/Index.tsx";
import Browse from "./pages/Browse.tsx";
import Listing from "./pages/Listing.tsx";
import HostNew from "./pages/HostNew.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import HostDashboard from "./pages/HostDashboard.tsx";
import Profile from "./pages/Profile.tsx";
import Checkout from "./pages/Checkout.tsx";
import Auth from "./pages/Auth.tsx";
import Messages from "./pages/Messages.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/listing/:id" element={<Listing />} />
              <Route path="/host/new" element={<ProtectedRoute><HostNew /></ProtectedRoute>} />
              <Route path="/host/dashboard" element={<ProtectedRoute><HostDashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
