import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/ui/Preloader';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Dashboard from './pages/Portal/Dashboard';
import Pricing from './pages/Portal/Pricing';
import BillingHistory from './pages/Portal/BillingHistory';
import CheckoutSuccess from './pages/Portal/CheckoutSuccess';
import Checkout from './pages/Portal/Checkout';
import Settings from './pages/Portal/Settings';
import Home from './pages/Home';
import SetupCompany from './pages/Onboarding/SetupCompany';
import Terms from './pages/Policies/Terms';
import Billing from './pages/Policies/Billing';
import Cancellation from './pages/Policies/Cancellation';
import Privacy from './pages/Policies/Privacy';
import AcceptableUse from './pages/Policies/AcceptableUse';
import ProtectedRoute from './components/ProtectedRoute';

import PortalLayout from './components/layout/PortalLayout';

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
              <Route path="/terms" element={<Terms />} />
              <Route path="/billing-policy" element={<Billing />} />
              <Route path="/cancellation-policy" element={<Cancellation />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/acceptable-use" element={<AcceptableUse />} />
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
        </Router>
      </div>
    </ThemeProvider>
  );
}
