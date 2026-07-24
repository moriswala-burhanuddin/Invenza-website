import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useTime } from 'framer-motion';
import { Play, Sparkles, Code, Terminal, Copy, Upload, Command, CornerDownLeft, Box, Circle, Diamond, LayoutGrid, Wand2, Monitor, Undo2, FolderOpen, Pen, Star, Server, Shield, Lock as LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import invenzaLogo from '../assets/invenza-bg.png';

// ---------------------------------------------------------
// Invenza Logo SVG Component (used everywhere)
// ---------------------------------------------------------
const InvenzaLogo = ({ className = "", size = 28 }) => {
  return (
    <img src={invenzaLogo} alt="Invenza" style={{ height: size }} className={`w-auto object-contain ${className}`} />
  );
};

// ---------------------------------------------------------
// Custom Hook for Typing Effect
// ---------------------------------------------------------
function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

// ---------------------------------------------------------
// Component: Hero Cursor Canvas (smooth glow follows mouse)
// ---------------------------------------------------------
const HeroCursorCanvas = ({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const particlesRef = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; size: number; opacity: number; hue: number }[]>([]);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: typeof particlesRef.current = [];
    const cols = Math.floor(width / 32);
    const rows = Math.floor(height / 32);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col + 0.5) * 32 + (Math.random() - 0.5) * 8;
        const y = (row + 0.5) * 32 + (Math.random() - 0.5) * 8;
        particles.push({
          x, y,
          baseX: x,
          baseY: y,
          vx: 0, vy: 0,
          size: 1 + Math.random() * 1.5,
          opacity: 0.06 + Math.random() * 0.1,
          hue: 200 + Math.random() * 20,  // blue range
        });
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
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
    };
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const w = () => canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const h = () => canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    const animate = () => {
      if (!ctx || !canvas) return;
      const cw = w();
      const ch = h();
      ctx.clearRect(0, 0, cw, ch);
      
      const mouse = mouseRef.current;
      
      // Smooth interpolation of mouse position (no lag feel)
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
      
      const particles = particlesRef.current;
      
      // Draw a subtle radial glow around cursor
      if (mouse.active) {
        // Increase radius and make the opacity falloff extremely smooth
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 450);
        gradient.addColorStop(0, 'rgba(0, 113, 227, 0.25)'); // Softer center
        gradient.addColorStop(0.3, 'rgba(0, 113, 227, 0.08)');
        gradient.addColorStop(0.7, 'rgba(0, 113, 227, 0.01)');
        gradient.addColorStop(1, 'rgba(0, 113, 227, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cw, ch);
      }
      
      for (const p of particles) {
        let extraBrightness = 0;
        
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 220;
          
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            extraBrightness = force * 0.8;
            
            // Gentle push away from cursor
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 1.2;
            p.vy -= Math.sin(angle) * force * 1.2;
          }
        }
        
        // Spring back to base position
        const dx = p.baseX - p.x;
        const dy = p.baseY - p.y;
        p.vx += dx * 0.025;
        p.vy += dy * 0.025;
        
        // Damping
        p.vx *= 0.9;
        p.vy *= 0.9;
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Draw particle
        const finalOpacity = Math.min(p.opacity + extraBrightness, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + extraBrightness * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, ${45 + extraBrightness * 30}%, ${finalOpacity})`;
        ctx.fill();
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

// ---------------------------------------------------------
// Component: Download Section Interactive Canvas Particles
// ---------------------------------------------------------
const DownloadParticles = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const particlesRef = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; size: number; opacity: number }[]>([]);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: typeof particlesRef.current = [];
    const numRings = 18;
    const cx = width / 2;
    const cy = height / 2;
    
    for (let ring = 1; ring <= numRings; ring++) {
      const radius = ring * 28;
      const count = Math.floor(ring * 8);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const r = radius + (Math.random() - 0.5) * 15;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (Math.random() > 0.25) {
          particles.push({
            x, y,
            baseX: x,
            baseY: y,
            vx: 0, vy: 0,
            size: 1.2 + Math.random() * 1.8,
            opacity: 0.3 + Math.random() * 0.5,
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
    };
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
      const particles = particlesRef.current;
      
      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 2;
            p.vy -= Math.sin(angle) * force * 2;
          }
        }
        
        const dx = p.baseX - p.x;
        const dy = p.baseY - p.y;
        p.vx += dx * 0.02;
        p.vy += dy * 0.02;
        
        p.vx *= 0.92;
        p.vy *= 0.92;
        
        p.x += p.vx;
        p.y += p.vy;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 113, 227, ${p.opacity})`;
        ctx.fill();
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


// ---------------------------------------------------------
// Component: Wave Icons (continuously animating sine wave)
// ---------------------------------------------------------
const WaveIcons = () => {
  const baseIcons = [
    Sparkles, CornerDownLeft, Code, Wand2, Circle, Box, LayoutGrid,
    Terminal, Copy, Upload, Command, Pen, Monitor, Undo2, FolderOpen, Diamond,
  ];
  // Duplicate icons to create an infinite loop marquee
  const icons = [...baseIcons, ...baseIcons, ...baseIcons];
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use framer motion scroll and time (0 React re-renders)
  const { scrollY } = useScroll();
  const time = useTime();

  return (
    <div className="w-full overflow-hidden py-16" ref={containerRef}>
      <div className="relative flex items-center h-[200px]">
        {icons.map((Icon, idx) => {
          
          // Calculate X position outside React render cycle
          const x = useTransform([time, scrollY], ([tMs, s]) => {
            const t = (tMs as number) / 1000;
            const scrollOffset = (s as number) * -0.5;
            const xOffset = t * -40; // 40px per second left
            
            const baseXPx = idx * 100;
            const totalWidth = baseIcons.length * 100;
            
            const rawX = baseXPx + xOffset + scrollOffset;
            let currentX = rawX % totalWidth;
            if (currentX < -100) currentX += totalWidth;
            
            return currentX;
          });

          // Calculate Y position outside React render cycle
          const y = useTransform([time, scrollY], ([tMs, s]) => {
            const t = (tMs as number) / 1000;
            const scrollOffset = (s as number) * -0.5;
            const xOffset = t * -40;
            
            const baseXPx = idx * 100;
            const totalWidth = baseIcons.length * 100;
            
            const rawX = baseXPx + xOffset + scrollOffset;
            let currentX = rawX % totalWidth;
            if (currentX < -100) currentX += totalWidth;
            
            return Math.sin((currentX / totalWidth) * Math.PI * 2) * -60;
          });
          
          return (
            <motion.div
              key={idx}
              className="absolute w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-[#E8EAED] flex items-center justify-center transition-none shadow-sm"
              style={{ x, y }}
            >
              <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#1D1D1F]" strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


// ---------------------------------------------------------
// Component: ERP Network Interactive Canvas (The Intelligent Core)
// ---------------------------------------------------------
const NetworkCanvasSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const nodesRef = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; radius: number; angle: number; dist: number }[]>([]);
  const animationRef = useRef<number>(0);

  const initNodes = useCallback((width: number, height: number) => {
    const nodes: typeof nodesRef.current = [];
    const cx = width / 2;
    const cy = height / 2;
    
    // Create concentric rings similar to download section, but fewer particles so we can draw lines
    const numRings = 12;
    for (let ring = 1; ring <= numRings; ring++) {
      const dist = ring * 35; // Distance from center
      const count = Math.floor(ring * 5); // Particles per ring
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist;
        nodes.push({
          x, y,
          baseX: x,
          baseY: y,
          vx: 0, vy: 0,
          radius: 1.5 + Math.random() * 1.5,
          angle,
          dist
        });
      }
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initNodes(rect.width, rect.height);
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
    };
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      
      ctx.clearRect(0, 0, w, h);
      
      const mouse = mouseRef.current;
      // Smooth mouse interpolation (like download section)
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
      
      const nodes = nodesRef.current;
      time += 0.002; // Slow rotation

      const cx = w / 2;
      const cy = h / 2;

      // Update node positions
      for (const node of nodes) {
        // Slowly rotate base positions
        const currentBaseX = cx + Math.cos(node.angle + time * (50/node.dist)) * node.dist;
        const currentBaseY = cy + Math.sin(node.angle + time * (50/node.dist)) * node.dist;

        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          
          if (dist < maxDist) {
            // Repel from mouse
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            node.vx -= Math.cos(angle) * force * 1.5;
            node.vy -= Math.sin(angle) * force * 1.5;
          }
        }

        // Spring back to rotating base position
        const dx = currentBaseX - node.x;
        const dy = currentBaseY - node.y;
        node.vx += dx * 0.02;
        node.vy += dy * 0.02;

        // Friction
        node.vx *= 0.92;
        node.vy *= 0.92;
        
        node.x += node.vx;
        node.y += node.vy;
      }

      // Draw lines between nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;
          
          // Using squared distance is faster than Math.sqrt
          if (distSq < 5000) { // approx 70px
            const dist = Math.sqrt(distSq);
            const opacity = 1 - (dist / 70);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 113, 227, ${opacity * 0.4})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 113, 227, 0.8)';
        ctx.fill();
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
  }, [initNodes]);

  return (
    <section ref={containerRef} className="relative w-full h-[600px] bg-white overflow-hidden flex flex-col items-center justify-center border-t border-gray-100 cursor-crosshair">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 text-center pointer-events-none p-6">
        <h2 className="text-[40px] md:text-[56px] font-normal tracking-[-0.03em] text-[#1D1D1F] leading-tight mb-4">
          The Intelligent Core
        </h2>
        <p className="text-[18px] text-[#86868B] max-w-2xl mx-auto">
          Hover over the network to see how our agentic ERP seamlessly connects and processes data across all your departments in real-time.
        </p>
      </div>
    </section>
  );
};


// ---------------------------------------------------------
// Main Home Page Component
// ---------------------------------------------------------
export default function Home() {
  const typedText = useTypingEffect("next-gen ERP platform", 70);
  
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });
  
  // Video container scroll animation
  const videoY = useTransform(smoothScrollY, [100, 700], [200, 0]);
  const videoScale = useTransform(smoothScrollY, [100, 700], [0.88, 1]);
  
  const downloadRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans selection:bg-[#0071E3] selection:text-white">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section ref={heroRef} className="relative pt-36 pb-32 px-6 flex flex-col items-center overflow-hidden bg-white cursor-crosshair">
        <HeroCursorCanvas containerRef={heroRef} />
        
        <div className="max-w-5xl mx-auto text-center z-10 pt-6">
          {/* Logo badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-[#1D1D1F] text-sm font-medium mb-10 shadow-sm"
          >
            <InvenzaLogo size={18} />
            Invenza ERP
          </motion.div>

          {/* Giant heading with typing */}
          <h1 className="text-[52px] sm:text-[68px] md:text-[88px] font-normal tracking-[-0.04em] text-[#1D1D1F] leading-[1.08] mb-14">
            Experience liftoff with the{' '}<br className="hidden sm:block"/>
            <span className="inline">{typedText}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
              className="inline-block w-[3px] h-[55px] sm:h-[70px] md:h-[90px] bg-[#0071E3] ml-1 align-middle"
            />
          </h1>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/signup" className="bg-[#1D1D1F] text-white px-6 py-3 rounded-full text-[15px] font-medium hover:bg-black transition-all hover:shadow-lg flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4" /> Download Desktop App
            </Link>
            <Link to="/features" className="bg-white border border-gray-300 text-[#1D1D1F] px-6 py-3 rounded-full text-[15px] font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
              Explore use cases
            </Link>
          </motion.div>
          
          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-16 w-full max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#0071E3] text-[#0071E3]" />
                ))}
              </div>
              <p className="text-[#86868B] font-medium text-[15px]">Trusted by Businesses</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[20px] p-5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="bg-[#0071E3]/10 p-3 rounded-full mb-3 text-[#0071E3]">
                  <Server className="w-6 h-6" />
                </div>
                <h4 className="text-[#1D1D1F] font-semibold text-sm">99.9% Uptime</h4>
                <p className="text-[#86868B] text-xs mt-1">Guaranteed reliability</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[20px] p-5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="bg-[#0071E3]/10 p-3 rounded-full mb-3 text-[#0071E3]">
                  <LockIcon className="w-6 h-6" />
                </div>
                <h4 className="text-[#1D1D1F] font-semibold text-sm">Secure Auth</h4>
                <p className="text-[#86868B] text-xs mt-1">Enterprise-grade security</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[20px] p-5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="bg-[#0071E3]/10 p-3 rounded-full mb-3 text-[#0071E3]">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-[#1D1D1F] font-semibold text-sm">Encrypted Data</h4>
                <p className="text-[#86868B] text-xs mt-1">End-to-end protection</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md border border-gray-100 rounded-[20px] p-5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="bg-[#0071E3]/10 p-3 rounded-full mb-3 text-[#0071E3]">
                  <Monitor className="w-6 h-6" />
                </div>
                <h4 className="text-[#1D1D1F] font-semibold text-sm">Desktop ERP</h4>
                <p className="text-[#86868B] text-xs mt-1">Windows & macOS</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* ===== 2. VIDEO SCROLL-UP SECTION ===== */}
      <section className="relative px-4 sm:px-8 z-20 flex justify-center mt-[-40px] bg-white pb-16">
        <motion.div 
          style={{ y: videoY, scale: videoScale }}
          className="w-full max-w-[1100px] aspect-[16/9] bg-[#1D1D1F] rounded-[24px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] relative group cursor-pointer"
        >
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-lg group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 text-black fill-black" />
              <span className="text-black font-medium text-[15px]">Play intro</span>
            </div>
          </div>
          
          {/* Faux IDE UI */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
            <div className="absolute top-4 left-5 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="absolute top-12 left-0 right-0 bottom-0 flex">
              {/* Sidebar */}
              <div className="w-56 border-r border-white/10 p-4 hidden md:block">
                <div className="space-y-3 mt-2">
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                  <div className="h-3 bg-white/8 rounded w-2/3" />
                </div>
              </div>
              {/* Editor */}
              <div className="flex-1 p-6">
                <div className="flex gap-3 border-b border-white/10 pb-3 mb-4">
                  <div className="h-3 bg-white/15 rounded w-20" />
                  <div className="h-3 bg-white/8 rounded w-16" />
                </div>
                <div className="space-y-2.5 font-mono text-xs text-white/60">
                  <div className="h-3 bg-white/5 rounded w-4/5" />
                  <div className="h-3 bg-white/8 rounded w-3/5" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/3 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 3. WAVE ICONS + TAGLINE ===== */}
      <section className="py-20 bg-[#F8F9FA]">
        <WaveIcons />
        
        <div className="max-w-4xl px-6 mt-12" style={{ paddingLeft: '80px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[36px] sm:text-[44px] md:text-[56px] font-normal tracking-[-0.03em] text-[#1D1D1F] leading-[1.15]"
          >
            Invenza ERP is our agentic enterprise platform, allowing anyone to manage in the agent-first era.
          </motion.h2>
        </div>
      </section>

      {/* ===== 4. ERP NETWORK SECTION ===== */}
      <NetworkCanvasSection />

      {/* ===== 5. FEATURE MOCKUPS (Alternating Layout) ===== */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Feature 1: ERP Desktop App */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-5/12 lg:order-1">
              <h3 className="text-[36px] md:text-[44px] font-normal tracking-[-0.03em] text-[#1D1D1F] mb-6 leading-tight">
                Invenza 2.0
              </h3>
              <p className="text-[17px] text-[#5F6368] font-light leading-relaxed mb-6">
                Your command center to manage multiple local agents in parallel. Group conversations into Projects, operate across multiple workspaces, and automate routine tasks with scheduled messages.
              </p>
            </div>
            <div className="lg:w-7/12 lg:order-2">
              <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-[#F3EAFF] to-[#E0D0FF] rounded-[28px] p-6 shadow-lg"
              >
                <div className="bg-white rounded-2xl shadow-sm h-[380px] p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <InvenzaLogo size={20} />
                      <span className="text-sm text-gray-600 font-medium">Invenza ERP</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                      <p className="text-sm text-gray-400">Search inventory, invoices, customers...</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span>+ Dashboard Overview</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>📊 Sales Report ›</span>
                      <span>📦 Inventory ›</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feature 2: CLI */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-5/12 lg:order-1">
              <h3 className="text-[36px] md:text-[44px] font-normal tracking-[-0.03em] text-[#1D1D1F] mb-6 leading-tight">
                Invenza CLI
              </h3>
              <p className="text-[17px] text-[#5F6368] font-light leading-relaxed">
                The lightweight, fast, terminal-first surface to work with Invenza agents. Run autonomous coding agents, execute shell commands directly, and manage background subagents all from your keyboard.
              </p>
            </div>
            <div className="lg:w-7/12 lg:order-2">
              <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#1D1D1F] rounded-[28px] p-1 pt-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-3 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="bg-[#0D1117] rounded-b-[24px] p-6 font-mono text-sm text-[#C9D1D9] min-h-[350px] flex">
                  {/* Left panel */}
                  <div className="flex-1 pr-6">
                    <div className="flex gap-1 mb-4">
                      <div className="w-3 h-3 bg-red-400"></div>
                      <div className="w-3 h-3 bg-orange-400 mt-1"></div>
                      <div className="w-3 h-3 bg-yellow-400 mt-2"></div>
                      <div className="w-3 h-3 bg-green-400 mt-3"></div>
                      <div className="w-3 h-3 bg-purple-400 mt-4"></div>
                    </div>
                    <p className="mb-4">Welcome to <span className="text-[#0071E3]">Invenza CLI</span>!</p>
                    <p className="mb-2">Choose your color scheme:</p>
                    <ul className="pl-4 mb-3 text-[#8B949E] text-xs sm:text-sm">
                      <li className="py-0.5">light</li>
                      <li className="py-0.5">solarized light</li>
                      <li className="py-0.5">colorblind-friendly light</li>
                      <li className="text-white py-0.5">&gt; dark</li>
                      <li className="py-0.5">solarized dark</li>
                      <li className="py-0.5">colorblind-friendly dark</li>
                      <li className="py-0.5">tokyo night</li>
                      <li className="py-0.5">terminal</li>
                    </ul>
                    <p className="text-[#8B949E]">[Next]</p>
                  </div>
                  {/* Right panel - diff */}
                  <div className="w-[280px] border-l border-gray-800 pl-4 hidden md:block">
                    <p className="text-[#8B949E] mb-1 text-xs">&gt; <span className="text-white">you:</span> add a greeting function</p>
                    <p className="text-[#0071E3] mb-3 text-xs">INV: Here's the change:</p>
                    <div className="text-xs font-mono">
                      <p className="text-[#8B949E]"><span className="text-gray-600 mr-2">3</span>  import "fmt"</p>
                      <p className="text-[#8B949E]"><span className="text-gray-600 mr-2">4</span></p>
                      <p className="bg-[#3d1117] text-[#F85149]"><span className="text-gray-600 mr-2">5</span>- func main() {'{'}</p>
                      <p className="bg-[#0d2818] text-[#3FB950]"><span className="text-gray-600 mr-2">5</span>+ func greet(name string) {'{'}</p>
                      <p className="bg-[#0d2818] text-[#3FB950]"><span className="text-gray-600 mr-2">6</span>+   fmt.Printf("Hello, %s!\n", name)</p>
                      <p className="text-[#8B949E]"><span className="text-gray-600 mr-2">7</span>  {'}'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feature 3: SDK */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-5/12 lg:order-1">
              <h3 className="text-[36px] md:text-[44px] font-normal tracking-[-0.03em] text-[#1D1D1F] mb-6 leading-tight">
                Invenza SDK
              </h3>
              <p className="text-[17px] text-[#5F6368] font-light leading-relaxed">
                Prototype custom agents leveraging Invenza's harness with minimal code. Simple Python scripts to iterate on agentic applications, automate software engineering tasks, and run evaluations on top of the Invenza agent harness.
              </p>
            </div>
            <div className="lg:w-7/12 lg:order-2">
              <motion.div
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#0a0a20] rounded-[28px] overflow-hidden shadow-2xl relative h-[380px] flex items-center justify-center"
              >
                {/* Glowing rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[500px] h-[500px] rounded-full border border-purple-500/20 absolute" />
                  <div className="w-[350px] h-[350px] rounded-full border border-purple-500/30 absolute" />
                  <div className="w-[200px] h-[200px] rounded-full bg-purple-600/20 blur-xl absolute" />
                </div>
                <div className="flex items-center gap-4 z-10">
                  <InvenzaLogo size={48} />
                  <p className="text-3xl md:text-4xl font-light text-white/80 tracking-wide">Invenza SDK</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== 5. DOWNLOAD SECTION (Interactive Cursor Particles) ===== */}
      <section className="py-20 px-4 sm:px-8 bg-[#F8F9FA]">
        <div 
          ref={downloadRef}
          className="relative bg-[#0D0D0D] rounded-[32px] max-w-7xl mx-auto overflow-hidden min-h-[520px] flex items-end p-10 sm:p-16 cursor-crosshair"
        >
          <DownloadParticles containerRef={downloadRef} />
          
          <div className="relative z-10">
            <h2 className="text-[44px] sm:text-[56px] md:text-[72px] font-normal tracking-[-0.04em] text-white leading-[1.08] mb-2">
              Download Invenza<br/>ERP
            </h2>
            
            {/* Rainbow cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
              className="inline-block w-[3px] h-[50px] sm:h-[65px] rounded-full mb-8"
              style={{ background: 'linear-gradient(180deg, #0071E3, #47bfff, #0071E3)' }}
            />
            
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="#" className="bg-white text-black px-6 py-3 rounded-full text-[15px] font-medium hover:bg-gray-100 transition-colors">
                Download for x64
              </a>
              <a href="#" className="bg-[#2D2D2D] border border-white/15 text-white px-6 py-3 rounded-full text-[15px] font-medium hover:bg-[#3D3D3D] transition-colors">
                Download for ARM64
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
