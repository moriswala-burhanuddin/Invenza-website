import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useTime } from 'framer-motion';
import { Play, Sparkles, Code, Terminal, Copy, Upload, Command, CornerDownLeft, Box, Circle, Diamond, LayoutGrid, Wand2, Monitor, Undo2, FolderOpen, Pen, Star, Server, Shield, Lock as LockIcon, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/sections/Testimonials';
import invenzaLogo from '../assets/invenza-bg.png';
import PromoVideo from '../assets/VIDEO/InvenzaPromo.mp4';

// ---------------------------------------------------------
// Invenza Logo SVG Component (used everywhere)
// ---------------------------------------------------------
const InvenzaLogo = ({ className = "", size = 28 }) => {
  return (
    <img src={invenzaLogo} alt="Invenza" style={{ height: size }} className={`w-auto object-contain ${className}`} />
  );
};

// ---------------------------------------------------------
// Custom Hook for Typing Effect (Cycling Words)
// ---------------------------------------------------------
function useTypingEffect(words: string[], speed: number = 80, pause: number = 2000) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: ReturnType<typeof setTimeout>;
    
    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, speed / 2); // delete faster
      }
    } else {
      if (displayedText.length === currentWord.length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, speed);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex, words, speed, pause]);

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
  const isVisibleRef = useRef(true);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: typeof particlesRef.current = [];
    const spacing = 80; // Increased spacing for significantly better performance (less lag)
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col + 0.5) * spacing + (Math.random() - 0.5) * 20;
        const y = (row + 0.5) * spacing + (Math.random() - 0.5) * 20;
        particles.push({
          x, y,
          baseX: x,
          baseY: y,
          vx: 0, vy: 0,
          size: 1 + Math.random() * 1.5,
          opacity: 0, // Particles are invisible by default!
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

    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0].isIntersecting;
      if (isVisibleRef.current) {
        animate();
      } else {
        cancelAnimationFrame(animationRef.current);
      }
    }, { threshold: 0 });
    observer.observe(container);

    const animate = () => {
      if (!ctx || !canvas || !isVisibleRef.current) return;
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
        gradient.addColorStop(0, 'rgba(0, 113, 227, 0.20)'); // Softer center
        gradient.addColorStop(0.3, 'rgba(0, 113, 227, 0.05)');
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
          const maxDist = 350; // Increased reveal radius
          
          if (dist < maxDist) {
            // Smooth falloff curve
            const force = Math.pow((maxDist - dist) / maxDist, 1.5);
            extraBrightness = force * 0.9;
            
            // Gentle push away from cursor
            if (dist < 200) {
                const pushForce = (200 - dist) / 200;
                const angle = Math.atan2(dy, dx);
                p.vx -= Math.cos(angle) * pushForce * 1.5;
                p.vy -= Math.sin(angle) * pushForce * 1.5;
            }
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
      observer.disconnect();
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
  const isVisibleRef = useRef(true);

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

    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0].isIntersecting;
      if (isVisibleRef.current) {
        animate();
      } else {
        cancelAnimationFrame(animationRef.current);
      }
    }, { threshold: 0 });
    observer.observe(container);

    const animate = () => {
      if (!ctx || !canvas || !isVisibleRef.current) return;
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
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [containerRef, initParticles]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};


// ---------------------------------------------------------
// Component: Data Mesh Canvas (Dense connected particles)
// ---------------------------------------------------------
// ---------------------------------------------------------
// Component: Data Mesh Canvas (Advanced Interactive Grid)
// ---------------------------------------------------------
// ---------------------------------------------------------
// Component: Data Mesh Canvas (Advanced 3D Particle Wave)
// ---------------------------------------------------------
const DataMeshCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  // 3D Wave Configuration
  const spacing = 45; // Space between particles
  const rows = 50; // Depth
  const cols = 80; // Width

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

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
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalize mouse between -1 and 1
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0].isIntersecting;
      if (isVisibleRef.current) {
        animate();
      } else {
        cancelAnimationFrame(animationRef.current);
      }
    }, { threshold: 0 });
    observer.observe(container);

    const animate = () => {
      if (!ctx || !canvas || !isVisibleRef.current) return;
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      
      // Clear background
      ctx.fillStyle = '#030308';
      ctx.fillRect(0, 0, w, h);
      
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05; // Smooth camera pan
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      const time = Date.now() * 0.0015;
      const fov = 400;
      const cameraZ = 300 + mouse.y * 100; // Mouse Y controls camera depth
      const cameraY = -150 + mouse.y * 200; // Mouse Y controls camera height
      const cameraX = mouse.x * 300; // Mouse X controls camera side shift
      
      ctx.fillStyle = '#0071E3';
      
      for (let iz = 0; iz < rows; iz++) {
        for (let ix = 0; ix < cols; ix++) {
          // Calculate 3D position
          const x = (ix - cols / 2) * spacing;
          const z = (iz - rows / 2) * spacing;
          
          // The magic: complex wave math combining sine/cosine
          const waveX = Math.sin((ix * 0.2) + time) * 40;
          const waveZ = Math.cos((iz * 0.2) + time) * 40;
          const waveCombined = Math.sin(Math.sqrt(x*x + z*z) * 0.01 - time * 2) * 60;
          
          const y = waveX + waveZ + waveCombined;
          
          // Apply camera offset
          const dx = x - cameraX;
          const dy = y - cameraY;
          const dz = z + cameraZ;
          
          // Only render if in front of camera
          if (dz > 0) {
            const scale = fov / dz;
            const screenX = w / 2 + dx * scale;
            const screenY = h / 2 + dy * scale + 150; // +150 to center vertically
            
            // Only draw if on screen
            if (screenX > -50 && screenX < w + 50 && screenY > -50 && screenY < h + 50) {
              const radius = Math.max(0.5, (scale * 2.5));
              
              // Dynamic color based on height (y)
              const hue = 200 + (y * 0.5);
              const opacity = Math.min(1, scale * 1.5);
              
              ctx.beginPath();
              ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;
              ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// Component for individual wave icon
const WaveIconItem = ({ Icon, idx, time, scrollY, totalWidth }: any) => {
  // Calculate X position outside React render cycle
  const x = useTransform([time, scrollY], ([tMs, s]) => {
    const t = (tMs as number) / 1000;
    const scrollOffset = (s as number) * -0.5;
    const xOffset = t * -40; // 40px per second left
    
    const baseXPx = idx * 100;
    
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
    
    const rawX = baseXPx + xOffset + scrollOffset;
    let currentX = rawX % totalWidth;
    if (currentX < -100) currentX += totalWidth;
    
    return Math.sin((currentX / totalWidth) * Math.PI * 2) * -60;
  });
  
  return (
    <motion.div
      className="absolute w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-[#E8EAED] dark:bg-white/10 dark:border dark:border-white/10 flex items-center justify-center transition-none shadow-sm"
      style={{ x, y }}
    >
      <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#1D1D1F] dark:text-white" strokeWidth={1.5} />
    </motion.div>
  );
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
  const totalWidth = baseIcons.length * 100;
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use framer motion scroll and time (0 React re-renders)
  const { scrollY } = useScroll();
  const time = useTime();

  return (
    <div className="w-full overflow-hidden py-16" ref={containerRef}>
      <div className="relative flex items-center h-[200px]">
        {icons.map((Icon, idx) => (
          <WaveIconItem 
            key={idx} 
            Icon={Icon} 
            idx={idx} 
            time={time} 
            scrollY={scrollY} 
            totalWidth={totalWidth} 
          />
        ))}
      </div>
    </div>
  );
};


// ---------------------------------------------------------
// Component: ERP Network Interactive Canvas (The Intelligent Core)
// ---------------------------------------------------------
const NetworkCanvasSection = ({ scale, opacity, sectionRef }: { scale: any, opacity: any, sectionRef: React.RefObject<HTMLElement | null> }) => {
  const containerRef = sectionRef;
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
    <section ref={containerRef} className="relative w-full h-[600px] bg-white dark:bg-[#09090B] overflow-hidden flex flex-col items-center justify-center border-t border-gray-100 dark:border-gray-800/50">
      <motion.canvas style={{ scale, opacity }} ref={canvasRef} className="absolute inset-0 z-0 origin-center" />
      <div className="relative z-10 text-center pointer-events-none p-6">
        <h2 className="text-[40px] md:text-[56px] font-normal tracking-[-0.03em] text-[#1D1D1F] dark:text-white leading-tight mb-4">
          The Intelligent Core
        </h2>
        <p className="text-[18px] text-[#86868B] max-w-2xl mx-auto">
          Hover over the network to see how our modern ERP seamlessly connects and processes data across all your departments in real-time.
        </p>
      </div>
    </section>
  );
};


// ---------------------------------------------------------
// Main Home Page Component
// ---------------------------------------------------------
export default function Home() {
  const typedText = useTypingEffect(["RETAIL", "INVENTORY", "SALES", "GROWTH", "BUSINESS"], 100, 2000);
  
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });
  
  // Video container scroll animation — enhanced with 3D tilt
  const videoY = useTransform(smoothScrollY, [100, 700], [200, 0]);
  const videoScale = useTransform(smoothScrollY, [100, 700], [0.88, 1]);
  const videoRotateX = useTransform(smoothScrollY, [100, 700], [4, 0]);
  
  const downloadRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // --- Section refs for scroll-driven 3D ---
  const taglineRef = useRef<HTMLElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const feature3Ref = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const dataMeshRef = useRef<HTMLElement>(null);
  const downloadCtaRef = useRef<HTMLDivElement>(null);

  // Hero parallax — content drifts up faster than scroll
  const heroParallaxY = useTransform(smoothScrollY, [0, 800], [0, -150]);
  // (heroOpacity removed per user request)

  // Tagline — card-flip reveal from subtle rotateX
  const { scrollYProgress: taglineProgress } = useScroll({ target: taglineRef, offset: ["start end", "end start"] });
  const taglineRotateX = useTransform(taglineProgress, [0, 0.35], [6, 0]);
  const taglineY = useTransform(taglineProgress, [0, 0.35], [60, 0]);
  const taglineOpacity = useTransform(taglineProgress, [0, 0.25], [0, 1]);
  const smoothTaglineRotateX = useSpring(taglineRotateX, { stiffness: 80, damping: 20 });

  // Feature 1 — mockup lifts with 3D
  const { scrollYProgress: f1Progress } = useScroll({ target: feature1Ref, offset: ["start end", "end start"] });
  const f1MockupRotateX = useTransform(f1Progress, [0.1, 0.4], [5, 0]);
  const f1MockupY = useTransform(f1Progress, [0.1, 0.4], [80, 0]);
  const f1TextX = useTransform(f1Progress, [0.1, 0.4], [-40, 0]);
  const smoothF1RotateX = useSpring(f1MockupRotateX, { stiffness: 80, damping: 20 });

  // Feature 2
  const { scrollYProgress: f2Progress } = useScroll({ target: feature2Ref, offset: ["start end", "end start"] });
  const f2MockupRotateX = useTransform(f2Progress, [0.1, 0.4], [5, 0]);
  const f2MockupY = useTransform(f2Progress, [0.1, 0.4], [80, 0]);
  const f2TextX = useTransform(f2Progress, [0.1, 0.4], [40, 0]);
  const smoothF2RotateX = useSpring(f2MockupRotateX, { stiffness: 80, damping: 20 });

  // Feature 3
  const { scrollYProgress: f3Progress } = useScroll({ target: feature3Ref, offset: ["start end", "end start"] });
  const f3MockupRotateX = useTransform(f3Progress, [0.1, 0.4], [5, 0]);
  const f3MockupY = useTransform(f3Progress, [0.1, 0.4], [80, 0]);
  const f3TextX = useTransform(f3Progress, [0.1, 0.4], [-40, 0]);
  const smoothF3RotateX = useSpring(f3MockupRotateX, { stiffness: 80, damping: 20 });

  // Network section — zoom-through
  const { scrollYProgress: networkProgress } = useScroll({ target: networkRef, offset: ["start end", "end start"] });
  const networkScale = useTransform(networkProgress, [0, 0.4], [0.9, 1]);
  const networkOpacity = useTransform(networkProgress, [0, 0.3], [0, 1]);
  const smoothNetworkScale = useSpring(networkScale, { stiffness: 80, damping: 20 });

  // Data Mesh parallax
  const { scrollYProgress: meshProgress } = useScroll({ target: dataMeshRef, offset: ["start end", "end start"] });
  const meshHeadY = useTransform(meshProgress, [0, 0.5], [60, -20]);
  const meshPillsX = useTransform(meshProgress, [0.2, 0.6], [30, -15]);

  // Download CTA — billboard tilt
  const { scrollYProgress: dlProgress } = useScroll({ target: downloadCtaRef, offset: ["start end", "end start"] });
const dlRotateX = useTransform(dlProgress, [0.1, 0.5], [4, 0]);
  const dlScale = useTransform(dlProgress, [0.1, 0.5], [0.95, 1]);
  const smoothDlRotateX = useSpring(dlRotateX, { stiffness: 80, damping: 20 });
  
  return (
    <div className="bg-[#F8F9FA] dark:bg-[#030308] min-h-screen font-sans selection:bg-[#0071E3] selection:text-white">
      
      {/* ===== 1. HERO SECTION (Minimalist SaaS Style) ===== */}
      <section ref={heroRef} className="relative min-h-[90vh] pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] dark:bg-[#000000] transition-colors duration-500 border-b border-gray-200 dark:border-white/10">
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTUwLCAxNTAsIDE1MCwgMC4yKSIvPjwvc3ZnPg==')] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-50 dark:opacity-30"></div>
          
          {/* Very subtle top gradient for depth, not glowing orbs */}
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-gray-200/50 dark:from-white/[0.03] to-transparent"></div>
        </div>
        
        <motion.div style={{ y: heroParallaxY }} className="w-full max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center justify-center relative">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 mb-8 shadow-sm"
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#000] dark:bg-[#fff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#000] dark:bg-[#fff]"></span>
            </span>
            <span className="text-xs font-semibold text-gray-900 dark:text-[#EDEDED] uppercase tracking-wider">Invenza 2.0 is Live</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-6 max-w-4xl"
          >
            Powering retail at <br className="hidden sm:block" />
            <span className="text-gray-400 dark:text-gray-500">
              unprecedented speed.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18px] md:text-[20px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl mb-10"
          >
            A perfectly engineered, offline-first inventory and point-of-sale system. Built for speed, extreme reliability, and uncompromising security.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 z-40 relative w-full sm:w-auto"
          >
            <Link to="/signup" className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg text-[15px] font-semibold hover:bg-black dark:hover:bg-gray-100 transition-colors flex items-center justify-center shadow-md">
              Start Free Trial
            </Link>
            <Link to="/pricing" className="w-full sm:w-auto bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-6 py-3 rounded-lg text-[15px] font-semibold hover:bg-gray-50 dark:hover:bg-[#222] transition-colors flex items-center justify-center shadow-sm">
              View Documentation
            </Link>
          </motion.div>
          
        </motion.div>
        
        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 w-full max-w-4xl mx-auto z-10 relative px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            <div className="flex flex-col items-center text-center">
              <Server className="w-5 h-5 text-gray-400 dark:text-gray-500 mb-2" />
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm">99.9% Uptime</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Guaranteed reliability</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <LockIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 mb-2" />
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm">Secure Auth</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Enterprise-grade security</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Shield className="w-5 h-5 text-gray-400 dark:text-gray-500 mb-2" />
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm">Encrypted Data</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">End-to-end protection</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <Monitor className="w-5 h-5 text-gray-400 dark:text-gray-500 mb-2" />
              <h4 className="text-gray-900 dark:text-white font-semibold text-sm">Native Apps</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Windows & macOS</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 2. VIDEO SCROLL-UP SECTION ===== */}
      <section className="relative px-4 sm:px-6 md:px-8 z-20 flex justify-center mt-[-10vh] bg-transparent pb-24" style={{ perspective: '1200px' }}>
        <motion.div 
          style={{ y: videoY, scale: videoScale, rotateX: videoRotateX, transformOrigin: 'center bottom' }}
          className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#1D1D1F] rounded-[24px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] relative group cursor-pointer"
        >
          <video 
            src={PromoVideo}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </motion.div>
      </section>

      {/* ===== 3. WAVE ICONS + TAGLINE ===== */}
      <section ref={taglineRef} className="py-20 bg-[#F8F9FA] dark:bg-[#030308]" style={{ perspective: '1200px' }}>
        <WaveIcons />
        
        <div className="max-w-4xl px-6 mt-12" style={{ paddingLeft: '80px' }}>
          <motion.h2
            style={{ rotateX: smoothTaglineRotateX, y: taglineY, opacity: taglineOpacity, transformOrigin: 'center bottom' }}
            className="text-[36px] sm:text-[44px] md:text-[56px] font-normal tracking-[-0.03em] text-[#1D1D1F] dark:text-white leading-[1.15]"
          >
            Invenza ERP is the ultimate business management platform, designed to make sales, inventory, and accounting incredibly simple.
          </motion.h2>
        </div>
      </section>

      {/* ===== 4. ERP NETWORK SECTION ===== */}
      <NetworkCanvasSection scale={smoothNetworkScale} opacity={networkOpacity} sectionRef={networkRef} />

      {/* ===== 5. FEATURE MOCKUPS (Alternating Layout) ===== */}
      <section className="py-20 px-6 bg-[#F8F9FA] dark:bg-[#030308]">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Feature 1: ERP Desktop App */}
          <div ref={feature1Ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24" style={{ perspective: '1200px' }}>
            <motion.div className="lg:w-5/12 lg:order-1" style={{ x: f1TextX, opacity: useTransform(f1Progress, [0.1, 0.35], [0, 1]) }}>
              <h3 className="text-[36px] md:text-[44px] font-normal tracking-[-0.03em] text-[#1D1D1F] dark:text-white mb-6 leading-tight">
                All-in-One Dashboard
              </h3>
              <p className="text-[17px] text-[#5F6368] dark:text-[#A1A1A6] font-light leading-relaxed mb-6">
                Your complete command center to manage sales, track inventory, and monitor daily profits in real-time. Everything you need to run your business smoothly is just one click away.
              </p>
            </motion.div>
            <div className="lg:w-7/12 lg:order-2">
              <motion.div
                style={{ rotateX: smoothF1RotateX, y: f1MockupY, transformOrigin: 'center bottom', opacity: useTransform(f1Progress, [0.1, 0.35], [0, 1]) }}
                className="bg-gradient-to-br from-[#F3EAFF] to-[#E0D0FF] rounded-[28px] p-6 shadow-lg"
              >
                <div className="bg-white dark:bg-[#09090B] rounded-2xl shadow-sm h-[380px] p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <InvenzaLogo size={20} />
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Invenza ERP</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800/50">
                    <div className="bg-white dark:bg-[#09090B] rounded-lg p-3 border border-gray-200 dark:border-gray-800 mb-3">
                      <p className="text-sm text-gray-400 dark:text-gray-500">Search inventory, invoices, customers...</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>+ Dashboard Overview</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                      <span>📊 Sales Report ›</span>
                      <span>📦 Inventory ›</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feature 2: CLI */}
          <div ref={feature2Ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24" style={{ perspective: '1200px' }}>
            <motion.div className="lg:w-5/12 lg:order-1" style={{ x: f2TextX, opacity: useTransform(f2Progress, [0.1, 0.35], [0, 1]) }}>
              <h3 className="text-[36px] md:text-[44px] font-normal tracking-[-0.03em] text-[#1D1D1F] dark:text-white mb-6 leading-tight">
                Lightning Fast POS
              </h3>
              <p className="text-[17px] text-[#5F6368] dark:text-[#A1A1A6] font-light leading-relaxed">
                A highly optimized, keyboard-friendly checkout system. Process sales in seconds, handle walk-in customers quickly, and keep your queues moving without any delays or complicated menus.
              </p>
            </motion.div>
            <div className="lg:w-7/12 lg:order-2">
              <motion.div
                style={{ rotateX: smoothF2RotateX, y: f2MockupY, transformOrigin: 'center bottom', opacity: useTransform(f2Progress, [0.1, 0.35], [0, 1]) }}
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
                    <p className="mb-4">Welcome to <span className="text-[#0071E3]">Invenza POS</span>!</p>
                    <p className="mb-2">Recent Transactions:</p>
                    <ul className="pl-4 mb-3 text-[#8B949E] text-xs sm:text-sm">
                      <li className="py-0.5">INV-1001 - Walk-in - $45.00</li>
                      <li className="py-0.5">INV-1002 - John Doe - $12.50</li>
                      <li className="py-0.5">INV-1003 - Walk-in - $89.99</li>
                      <li className="text-white py-0.5">&gt; New Sale (F2)</li>
                      <li className="py-0.5">Search Product (F3)</li>
                    </ul>
                    <p className="text-[#8B949E]">[Ready]</p>
                  </div>
                  {/* Right panel - diff */}
                  <div className="w-[280px] border-l border-gray-800 pl-4 hidden md:block">
                    <p className="text-[#8B949E] mb-1 text-xs">&gt; <span className="text-white">cart:</span> scan barcode</p>
                    <p className="text-[#0071E3] mb-3 text-xs">POS: Item added successfully:</p>
                    <div className="text-xs font-mono">
                      <p className="text-[#8B949E]"><span className="text-gray-600 dark:text-gray-300 mr-2">1</span>  Product: Wireless Mouse</p>
                      <p className="text-[#8B949E]"><span className="text-gray-600 dark:text-gray-300 mr-2">2</span>  Qty: 1</p>
                      <p className="bg-[#0d2818] text-[#3FB950]"><span className="text-gray-600 dark:text-gray-300 mr-2">3</span>+ Price: $25.00</p>
                      <p className="bg-[#0d2818] text-[#3FB950]"><span className="text-gray-600 dark:text-gray-300 mr-2">4</span>+ Tax: $1.25</p>
                      <p className="text-[#8B949E]"><span className="text-gray-600 dark:text-gray-300 mr-2">5</span>  Total: $26.25</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feature 3: SDK */}
          <div ref={feature3Ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24" style={{ perspective: '1200px' }}>
            <motion.div className="lg:w-5/12 lg:order-1" style={{ x: f3TextX, opacity: useTransform(f3Progress, [0.1, 0.35], [0, 1]) }}>
              <h3 className="text-[36px] md:text-[44px] font-normal tracking-[-0.03em] text-[#1D1D1F] dark:text-white mb-6 leading-tight">
                Offline Mode
              </h3>
              <p className="text-[17px] text-[#5F6368] dark:text-[#A1A1A6] font-light leading-relaxed">
                Continue selling even when the internet goes down. Our desktop application runs locally and automatically syncs your data securely to the cloud the moment you're back online. Never lose a single sale.
              </p>
            </motion.div>
            <div className="lg:w-7/12 lg:order-2">
              <motion.div
                style={{ rotateX: smoothF3RotateX, y: f3MockupY, transformOrigin: 'center bottom', opacity: useTransform(f3Progress, [0.1, 0.35], [0, 1]) }}
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
                  <p className="text-3xl md:text-4xl font-light text-white/80 tracking-wide">Always Synced</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== 4.2 DATA MESH SECTION (New Advanced ERP Feature) ===== */}
      <section ref={dataMeshRef} className="py-24 px-4 sm:px-8 bg-[#030308] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <DataMeshCanvas />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center text-center pt-10 pb-16">
          <motion.div
            style={{ y: meshHeadY }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-6 backdrop-blur-md">
              <Database className="w-4 h-4 text-[#0071E3]" />
              <span>Real-Time Data Mesh</span>
            </div>
            
            <h2 className="text-[44px] md:text-[64px] font-normal tracking-[-0.03em] text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-2xl">
              The nervous system of your entire business.
            </h2>
            
            <p className="text-[19px] md:text-[21px] text-[#A1A1A6] font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Invenza ERP doesn't just store data; it connects it. Every invoice, inventory movement, and customer interaction flows through a hyper-connected mesh, making automation instantaneous and intelligent.
            </p>
            
            <motion.div style={{ x: meshPillsX }} className="flex flex-wrap items-center justify-center gap-6 text-[#A1A1A6] text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
                Live Sync
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Instant Validation
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                Cross-Module Analytics
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4.5 TESTIMONIALS SECTION ===== */}
      <Testimonials />

      {/* ===== 5. DOWNLOAD SECTION (Interactive Cursor Particles) ===== */}
      <section ref={downloadCtaRef} className="py-20 px-4 sm:px-8 bg-[#F8F9FA] dark:bg-[#030308]" style={{ perspective: '1200px' }}>
        <motion.div 
          ref={downloadRef}
          style={{ rotateX: smoothDlRotateX, scale: dlScale, transformOrigin: 'center bottom' }}
          className="relative bg-[#0D0D0D] rounded-[32px] max-w-7xl mx-auto overflow-hidden min-h-[520px] flex items-end p-10 sm:p-16"
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
              <button 
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await fetch('https://api.github.com/repos/moriswala-burhanuddin/Invenza-Electron-app/releases/latest');
                    const data = await res.json();
                    const asset = data.assets.find((a: any) => a.name.endsWith('.exe'));
                    if (asset) window.location.href = asset.browser_download_url;
                    else alert('No Windows build found in the latest release!');
                  } catch (err) { alert('Could not fetch the latest download link.'); }
                }}
                className="bg-white dark:bg-[#09090B] text-black px-6 py-3 rounded-full text-[15px] font-medium hover:bg-gray-100 transition-colors"
              >
                Download for Windows
              </button>
              <button 
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await fetch('https://api.github.com/repos/moriswala-burhanuddin/Invenza-Electron-app/releases/latest');
                    const data = await res.json();
                    const asset = data.assets.find((a: any) => a.name.endsWith('.dmg') || a.name.endsWith('.zip'));
                    if (asset) window.location.href = asset.browser_download_url;
                    else alert('No Mac build found in the latest release!');
                  } catch (err) { alert('Could not fetch the latest download link.'); }
                }}
                className="bg-[#2D2D2D] border border-white/15 text-white px-6 py-3 rounded-full text-[15px] font-medium hover:bg-[#3D3D3D] transition-colors"
              >
                Download for Mac
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
