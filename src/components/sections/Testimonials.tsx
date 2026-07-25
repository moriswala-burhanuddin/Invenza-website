import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Operations Director',
    company: 'TechFlow Inc.',
    content: 'Invenza ERP completely transformed how we manage our multi-store inventory. The real-time sync is flawless and the UI is incredibly intuitive. It feels like software from 2030.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chang',
    role: 'CEO',
    company: 'Apex Retail',
    content: 'We used to struggle with disconnected systems across our 15 locations. Invenza brought everything under one roof. The offline-first capability saved us during a major internet outage.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Financial Controller',
    company: 'Global Supply Co.',
    content: 'The depth of the reporting and the seamless accounting integration makes my job so much easier. Plus, the dynamic dark mode and fast navigation are a joy to use every day.',
    rating: 5,
  }
];

// High Performance Canvas: Flowing Ribbon of Light
const RibbonCanvas = ({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
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
      // Gently glide off screen
      mouseRef.current.targetX = width / 2;
      mouseRef.current.targetY = height + 200;
    };
    
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Initialize strands for the ribbon
    const numStrands = 5;
    const strands = Array.from({ length: numStrands }, (_, i) => ({
      history: Array(40).fill({ x: width / 2, y: height + 200 }),
      phase: i * (Math.PI * 2 / numStrands), // Offset for wave
      friction: 0.15 + (i * 0.02),
      color: i % 2 === 0 ? 'rgba(0, 113, 227,' : 'rgba(56, 189, 248,' // Alternate blue and light blue
    }));

    // For smooth mouse interpolation
    let currentMouseX = width / 2;
    let currentMouseY = height + 200;

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
      if (!isVisibleRef.current) return;
      
      timeRef.current += 0.03;
      
      // Clear with slight trailing effect for glow
      ctx.fillStyle = '#F8F9FA'; // Match background
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      
      // Interpolate main target position for smoothness
      if (mouse.active || mouse.targetY > height) {
        currentMouseX += (mouse.targetX - currentMouseX) * 0.1;
        currentMouseY += (mouse.targetY - currentMouseY) * 0.1;
      }

      // Update and draw each strand
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      strands.forEach((strand, index) => {
        // Ribbons mix exactly at the cursor point (waveRadius is 0 at the head)
        const targetX = currentMouseX;
        const targetY = currentMouseY;

        // Current head of the strand eases towards the target
        const head = strand.history[0];
        
        // Add a slight sine wave wobble to the movement to keep them organic before they mix
        const wobbleX = Math.sin(timeRef.current * 3 + strand.phase) * 5;
        const wobbleY = Math.cos(timeRef.current * 2 + strand.phase) * 5;

        const nextX = head.x + (targetX + wobbleX - head.x) * strand.friction;
        const nextY = head.y + (targetY + wobbleY - head.y) * strand.friction;

        // Push new head, pop tail
        strand.history.unshift({ x: nextX, y: nextY });
        strand.history.pop();

        // Draw the ribbon strand
        ctx.beginPath();
        ctx.moveTo(strand.history[0].x, strand.history[0].y);

        // Smooth bezier curves through history points
        for (let i = 1; i < strand.history.length - 2; i++) {
          const xc = (strand.history[i].x + strand.history[i + 1].x) / 2;
          const yc = (strand.history[i].y + strand.history[i + 1].y) / 2;
          ctx.quadraticCurveTo(strand.history[i].x, strand.history[i].y, xc, yc);
        }

        // Connect the last two points
        const last = strand.history.length - 1;
        const secondLast = last - 1;
        ctx.quadraticCurveTo(
          strand.history[secondLast].x, 
          strand.history[secondLast].y, 
          strand.history[last].x, 
          strand.history[last].y
        );

        // Styling the line
        ctx.lineWidth = 4 + Math.sin(timeRef.current + index) * 2;
        
        // Dynamic opacity based on mouse activity
        const baseOpacity = mouse.active ? 0.6 : 0.2;
        ctx.strokeStyle = `${strand.color} ${baseOpacity})`;
        
        ctx.stroke();
      });

      // Ambient glow orb tracking the center of the ribbon
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(currentMouseX, currentMouseY, 0, currentMouseX, currentMouseY, 300);
        gradient.addColorStop(0, 'rgba(0, 113, 227, 0.08)');
        gradient.addColorStop(0.5, 'rgba(0, 113, 227, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 113, 227, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
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

// High Performance 3D Tilt Card Component
const TiltCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="z-10 h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="h-full relative group"
      >
        <div 
          className="relative h-full bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-[32px] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgb(0,113,227,0.08)] flex flex-col"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Subtle hover gradient inside card */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <Quote className="w-10 h-10 text-blue-500/20 mb-6 relative z-10" style={{ transform: "translateZ(10px)" }} />
          
          <div className="flex gap-1 mb-6 relative z-10" style={{ transform: "translateZ(5px)" }}>
            {[...Array(testimonial.rating)].map((_, j) => (
              <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <p className="text-[#1D1D1F] text-[16px] leading-relaxed font-normal mb-8 relative z-10 flex-grow" style={{ transform: "translateZ(15px)" }}>
            "{testimonial.content}"
          </p>

          <div className="mt-auto flex items-center gap-4 relative z-10" style={{ transform: "translateZ(10px)" }}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0071E3] to-blue-400 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-[#1D1D1F] font-bold text-[15px]">{testimonial.name}</h4>
              <p className="text-[#5F6368] text-[13px] font-medium">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      className="py-24 px-4 sm:px-8 relative overflow-hidden bg-[#F8F9FA] min-h-[750px] flex flex-col justify-center cursor-crosshair"
      ref={containerRef}
    >
      <RibbonCanvas containerRef={containerRef} />

      <div className="max-w-7xl mx-auto relative z-10 w-full pointer-events-none">
        <div className="text-center mb-16 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[44px] md:text-[56px] font-normal tracking-[-0.03em] text-[#1D1D1F] mb-4 leading-tight">
              Loved by businesses.
            </h2>
            <p className="text-[#5F6368] text-xl font-light max-w-2xl mx-auto">
              See what our customers have to say about their experience with Invenza ERP.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20 pointer-events-auto">
          {testimonials.map((t, i) => (
            <TiltCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
