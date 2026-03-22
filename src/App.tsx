import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Assessment from "./pages/Assessment";
import DonorForm from "./pages/DonorForm";
import PatientResults from "./pages/PatientResults";
import CarrierResults from "./pages/CarrierResults";
import NormalResults from "./pages/NormalResults";
import DonorCertificate from "./pages/DonorCertificate";
import DonorIneligible from "./pages/DonorIneligible";
import PartnerMatch from "./pages/PartnerMatch";
import BookConsultation from "./pages/BookConsultation";
import ScheduleTest from "./pages/ScheduleTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/donor-form" element={<DonorForm />} />
          <Route path="/partner-match" element={<PartnerMatch />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/schedule-test" element={<ScheduleTest />} />
          <Route path="/results/patient" element={<PatientResults />} />
          <Route path="/results/carrier" element={<CarrierResults />} />
          <Route path="/results/normal" element={<NormalResults />} />
          <Route path="/donor-certificate" element={<DonorCertificate />} />
          <Route path="/donor-ineligible" element={<DonorIneligible />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
