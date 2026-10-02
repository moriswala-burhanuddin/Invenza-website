import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/ui/Preloader';
import ProtectedRoute from './components/ProtectedRoute';
import CookieConsentBanner from './components/ui/CookieConsentBanner';
import PortalLayout from './components/layout/PortalLayout';

// Lazy loaded routes
const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const VerifyEmail = lazy(() => import('./pages/Auth/VerifyEmail'));
const Dashboard = lazy(() => import('./pages/Portal/Dashboard'));
const Pricing = lazy(() => import('./pages/Portal/Pricing'));
const BillingHistory = lazy(() => import('./pages/Portal/BillingHistory'));
const CheckoutSuccess = lazy(() => import('./pages/Portal/CheckoutSuccess'));
const Checkout = lazy(() => import('./pages/Portal/Checkout'));
const Settings = lazy(() => import('./pages/Portal/Settings'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const SetupCompany = lazy(() => import('./pages/Onboarding/SetupCompany'));
const Terms = lazy(() => import('./pages/Policies/Terms'));
const Billing = lazy(() => import('./pages/Policies/Billing'));
const Cancellation = lazy(() => import('./pages/Policies/Cancellation'));
const Privacy = lazy(() => import('./pages/Policies/Privacy'));
const AcceptableUse = lazy(() => import('./pages/Policies/AcceptableUse'));
const CookiePolicy = lazy(() => import('./pages/Policies/CookiePolicy'));
const SLA = lazy(() => import('./pages/Policies/SLA'));
const DPA = lazy(() => import('./pages/Policies/DPA'));

const Layout = () => (
  <ReactLenis root options={{ lerp: 0.12, duration: 1.5, smoothWheel: true, wheelMultiplier: 1.2 }}>
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#030308] text-[#1D1D1F] dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  </ReactLenis>
);

// Home component is imported from pages/Home.tsx

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isAppLoading && <Preloader key="preloader" onComplete={() => setIsAppLoading(false)} />}
      </AnimatePresence>

      {/* Main App Content - Hidden from screen readers while loading */}
      <div aria-hidden={isAppLoading} style={{ opacity: isAppLoading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        <Router>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] dark:bg-[#030308]" />}>
            <Routes>
              {/* Marketing & Auth Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />

              {/* Public Routes */}
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/billing-policy" element={<Billing />} />
              <Route path="/cancellation-policy" element={<Cancellation />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/acceptable-use" element={<AcceptableUse />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/sla" element={<SLA />} />
              <Route path="/data-processing-agreement" element={<DPA />} />
            </Route>

            {/* Portal Routes with Dedicated Layout */}
            <Route element={<ProtectedRoute />}>
              <Route path="/setup-company" element={<SetupCompany />} />
              
              {/* Wrap actual portal pages in PortalLayout */}
              <Route element={<PortalLayout><Outlet /></PortalLayout>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/billing-history" element={<BillingHistory />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
          <CookieConsentBanner />
        </Router>
      </div>
    </ThemeProvider>
  );
}
