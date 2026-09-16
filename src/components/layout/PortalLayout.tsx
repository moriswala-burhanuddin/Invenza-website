import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  CreditCard, 
  LogOut,
  Monitor,
  Menu,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Billing', path: '/billing-history', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#FAFAFA] dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-white/10 overflow-hidden">
      
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-white/10 shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-gray-900 dark:text-white" />
          <span className="font-semibold text-[15px] tracking-tight text-gray-900 dark:text-white">
            Invenza
          </span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-200/50 dark:bg-white/10 text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-white/10 shrink-0">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white dark:bg-black text-gray-900 dark:text-[#EDEDED] font-sans antialiased overflow-hidden">
      
      {/* Desktop Sidebar (Fixed) */}
      <aside className="w-64 hidden md:block shrink-0 h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 z-50 flex flex-col md:hidden bg-[#FAFAFA] dark:bg-[#0A0A0A] border-r border-gray-200 dark:border-white/10 shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-50 md:hidden">
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                   <X className="w-5 h-5"/>
                 </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen relative">
        
        {/* Minimal Header */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 md:hidden transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
               <span className="text-sm font-medium text-gray-900 dark:text-[#EDEDED]">Portal</span>
               <span className="text-gray-400 dark:text-gray-600">/</span>
               <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                 {location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard'}
               </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-bold">
              A
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-black">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-8 lg:p-10 max-w-[1200px] mx-auto w-full"
          >
            {children}
          </motion.div>
        </div>

      </main>
    </div>
  );
}
