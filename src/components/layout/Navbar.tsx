import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Settings, LayoutDashboard, Moon, Sun } from 'lucide-react';
import invenzaLogo from '../../assets/invenza-bg.png';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-[#030308]/80 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 py-3' : 'bg-transparent py-5 border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <img src={invenzaLogo} alt="Invenza Logo" className={`h-8 w-auto object-contain transition-all ${theme === 'dark' ? 'bg-white/95 px-2 py-1 rounded-lg' : ''}`} />
          <span className="font-semibold text-xl tracking-tight text-[#1D1D1F] dark:text-white">Invenza</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/pricing" className="text-sm font-medium text-[#1D1D1F] dark:text-white hover:text-[#0071E3] transition-colors hidden md:block">
            Pricing
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-[#1D1D1F] dark:text-white hover:text-[#0071E3] dark:hover:text-[#0071E3] transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                <span>Portal</span>
              </Link>
              <Link to="/settings" className="flex items-center gap-2 text-sm font-medium text-[#1D1D1F] dark:text-white hover:text-[#0071E3] transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
              <button 
                onClick={toggleTheme} 
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={toggleTheme} 
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link to="/login" className="text-sm font-medium text-[#1D1D1F] dark:text-white hover:opacity-70 transition-opacity">
                Log in
              </Link>
              <Link to="/signup" className="text-sm font-medium text-white bg-[#0071E3] px-4 py-2 rounded-full hover:bg-[#0077ED] transition-colors">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
