import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Browse from "./pages/Browse.tsx";
import Listing from "./pages/Listing.tsx";
import HostNew from "./pages/HostNew.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import HostDashboard from "./pages/HostDashboard.tsx";
import Checkout from "./pages/Checkout.tsx";
import Auth from "./pages/Auth.tsx";
import Messages from "./pages/Messages.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/host/new" element={<HostNew />} />
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
