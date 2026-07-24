import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import invenzaLogo from '../../assets/invenza-bg.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access_token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link to="/" className="flex items-center transition-opacity hover:opacity-70">
          <img src={invenzaLogo} alt="Invenza" className="h-7 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span>Portal</span>
              </Link>
              <Link to="/settings" className="flex items-center gap-2 text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#F5F5F7] rounded-full flex items-center justify-center border border-gray-200">
                  <User className="w-4 h-4 text-[#86868B]" />
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-medium bg-[#0071E3] text-white px-5 py-2.5 rounded-full hover:bg-[#0077ED] transition-colors">
                Start Free Trial
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
