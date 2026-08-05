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
import Settings from './pages/Portal/Settings';
import Home from './pages/Home';
import SetupCompany from './pages/Onboarding/SetupCompany';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = () => (
  <div className="flex flex-col min-h-screen bg-white dark:bg-[#030308] text-[#1D1D1F] dark:text-white transition-colors duration-300">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
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
        <ReactLenis root options={{ lerp: 0.12, duration: 1.5, smoothWheel: true, wheelMultiplier: 1.2 }}>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/setup-company" element={<SetupCompany />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/billing-history" element={<BillingHistory />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ReactLenis>
      </div>
    </ThemeProvider>
  );
}
