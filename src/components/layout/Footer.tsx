import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top row: tagline left, link columns right */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <h3 className="text-[28px] md:text-[36px] font-normal tracking-[-0.03em] text-[#1D1D1F] leading-tight">
              Experience liftoff
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-x-24 gap-y-8">
            <div>
              <h4 className="text-[13px] font-semibold text-[#5F6368] uppercase tracking-wider mb-5">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Download</a></li>
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Product</a></li>
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Docs</a></li>
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Changelog</a></li>
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Press</a></li>
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Releases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-[#5F6368] uppercase tracking-wider mb-5">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Blog</a></li>
                <li><Link to="/pricing" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Pricing</Link></li>
                <li><a href="#" className="text-[15px] text-[#1D1D1F] hover:text-[#5F6368] transition-colors">Use Cases</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive brand text */}
        <div className="w-full overflow-hidden mb-8">
          <h1 className="text-[20vw] md:text-[18vw] font-bold tracking-tighter text-[#1D1D1F] leading-[0.85] select-none whitespace-nowrap">
            Invenza
          </h1>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-[15px] text-[#1D1D1F]">Invenza</span>
          <div className="flex flex-wrap gap-5 text-[13px] text-[#5F6368]">
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">About Invenza</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Invenza Products</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
