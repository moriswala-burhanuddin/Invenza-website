import { useEffect } from 'react';
import { motion } from 'framer-motion';
import invenzaLogo from '../../assets/invenza-bg.png';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    // Total duration of preloader is ~3.2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Geometric 'I' shape coordinates mimicking a data node structure
  const pathVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1, delay: 0.6, ease: "easeInOut" }
    }
  };

  const dotVariants: any = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: custom * 0.1, duration: 0.4, type: "spring" }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030308] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.2, 
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* SVG Wireframe */}
        <motion.svg 
          width="160" 
          height="160" 
          viewBox="0 0 100 100" 
          className="absolute z-10"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          {/* Abstract Data Mesh / Isometric Cube shape for the wireframe */}
          <motion.path
            d="M50,15 L80,30 L80,70 L50,85 L20,70 L20,30 Z M50,15 L50,50 L80,70 M20,30 L50,50 L50,85"
            fill="transparent"
            stroke="#0071E3"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Dots at vertices */}
          {[
            { cx: 50, cy: 15 },
            { cx: 80, cy: 30 },
            { cx: 80, cy: 70 },
            { cx: 50, cy: 85 },
            { cx: 20, cy: 70 },
            { cx: 20, cy: 30 },
            { cx: 50, cy: 50 },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r="3.5"
              fill="#0071E3"
              custom={i}
              variants={dotVariants}
              initial="hidden"
              animate="visible"
            />
          ))}
        </motion.svg>

        {/* Real Logo Fade In */}
        <motion.img
          src={invenzaLogo}
          alt="Invenza Logo"
          className="absolute z-20 w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(0,113,227,0.5)]"
          initial={{ opacity: 0, scale: 0.6, filter: 'brightness(3)' }}
          animate={{ 
            opacity: 1, 
            scale: 1.2,
            filter: 'brightness(1)'
          }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Deep Glow effect behind logo */}
        <motion.div
          className="absolute z-0 w-32 h-32 bg-[#0071E3] rounded-full blur-[70px]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.4, scale: 1.8 }}
          transition={{ delay: 1.5, duration: 1.2 }}
        />
      </div>
    </motion.div>
  );
}
