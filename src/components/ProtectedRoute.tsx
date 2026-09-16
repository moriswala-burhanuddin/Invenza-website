import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthAndCompany = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        await axios.get(`${API_URL}/erp-credentials/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setIsAuthenticated(true);
        setHasCompany(true);
      } catch (err: any) {
        if (err.response?.status === 404) {
          // 404 means the user exists and is logged in, but has no company
          setIsAuthenticated(true);
          setHasCompany(false);
        } else {
          // 401, 403, or Network Error
          setIsAuthenticated(false);
          if (err.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndCompany();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] pt-32 pb-10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0071E3] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Strict route enforcement: User is logged in but has no company
  if (isAuthenticated && hasCompany === false && location.pathname !== '/setup-company') {
    return <Navigate to="/setup-company" replace />;
  }

  // If they are on setup-company but already have a company, push to dashboard
  if (isAuthenticated && hasCompany === true && location.pathname === '/setup-company') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
