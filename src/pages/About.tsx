import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import sysfotechLogo from '../assets/sysfotech-logo.png';

// Using the exact interactive particles from the Home page's Download section
const InteractiveParticles = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const particlesRef = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; size: number; opacity: number; hue: number }[]>([]);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: typeof particlesRef.current = [];
    const numRings = 18;
    const cx = width / 2;
    const cy = height / 2;
    
    for (let ring = 1; ring <= numRings; ring++) {
      const radius = ring * 35;
      const count = Math.floor(ring * 8);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const r = radius + (Math.random() - 0.5) * 15;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (Math.random() > 0.25) {
          particles.push({
            x, y,
            baseX: x, baseY: y,
            vx: 0, vy: 0,
            size: 1.2 + Math.random() * 1.8,
            opacity: 0.3 + Math.random() * 0.5,
            hue: 210 + Math.random() * 20 // Blue hues
          });
        }
      }
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles(rect.width, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = canvas.width / 2;
      mouseRef.current.targetY = canvas.height / 2;
    };
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
      
      for (const p of particlesRef.current) {
        let extraBrightness = 0;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            extraBrightness = (180 - dist) / 180;
            p.vx -= (dx / dist) * extraBrightness * 1.2;
            p.vy -= (dy / dist) * extraBrightness * 1.2;
          }
        }
        
        // Return to base position softly
        p.vx += (p.baseX - p.x) * 0.02;
        p.vy += (p.baseY - p.y) * 0.02;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
        
        const finalOpacity = Math.min(p.opacity + extraBrightness, 1);
        if (finalOpacity > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + extraBrightness * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${finalOpacity})`;
          ctx.fill();
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [containerRef, initParticles]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default function About() {
  const downloadRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#030308] min-h-screen pt-32 pb-24 selection:bg-[#0071E3] selection:text-white transition-colors duration-500">
      
      <section className="px-4 sm:px-8 max-w-[1400px] mx-auto">
        <motion.div 
          ref={downloadRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#0D0D0D] rounded-[32px] sm:rounded-[48px] w-full overflow-hidden min-h-[750px] flex flex-col justify-between p-10 sm:p-16 border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]"
        >
          {/* Exact interactive particles from Home page */}
          <InteractiveParticles containerRef={downloadRef} />
          
          {/* Top Section: Logo */}
          <div className="relative z-10 flex justify-between items-start">
            <div className="bg-white/95 border border-white/20 rounded-2xl p-4 shadow-2xl">
              <img src={sysfotechLogo} alt="Sysfotech Logo" className="h-10 md:h-14 object-contain" />
            </div>
            <a 
              href="https://sysfotech.uk/" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-sm font-medium transition-colors"
            >
              Visit sysfotech.uk
            </a>
          </div>
          
          {/* Middle/Bottom Section: Large Typography exactly like Download section */}
          <div className="relative z-10 mt-auto pt-20 max-w-4xl">
            <h2 className="text-[50px] sm:text-[70px] md:text-[90px] font-normal tracking-[-0.04em] text-white leading-[1.05] mb-8">
              Built by <br/>Sysfotech.
            </h2>
            
            {/* Rainbow cursor effect from download section */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
              className="inline-block w-[3px] h-[50px] sm:h-[70px] rounded-full mb-10"
              style={{ background: 'linear-gradient(180deg, #0071E3, #47bfff, #0071E3)' }}
            />
            
            <p className="text-[20px] md:text-[24px] text-gray-400 font-light leading-relaxed max-w-3xl mb-12">
              Invenza ERP is proudly developed by Sysfotech, a premier software engineering firm in London, UK. We specialize in custom software, AI solutions, and digital transformation.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+447442193577"
                className="bg-white text-black px-8 py-4 rounded-full text-[16px] font-medium hover:bg-gray-200 transition-colors flex items-center gap-3"
              >
                +44 74421 93577
              </a>
              <a 
                href="mailto:info@sysfotech.uk"
                className="bg-[#2D2D2D] border border-white/15 text-white px-8 py-4 rounded-full text-[16px] font-medium hover:bg-[#3D3D3D] transition-colors flex items-center gap-3"
              >
                info@sysfotech.uk
              </a>
              <a 
                href="https://sysfotech.uk/"
                target="_blank" 
                rel="noreferrer"
                className="sm:hidden bg-[#0071E3] text-white px-8 py-4 rounded-full text-[16px] font-medium hover:bg-[#005bb5] transition-colors flex items-center gap-3"
              >
                sysfotech.uk
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
