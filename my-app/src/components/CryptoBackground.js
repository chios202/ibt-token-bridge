import React from 'react';
import { Sun, Moon, Globe2, Star, Sparkles, Orbit, Atom } from 'lucide-react';

// SVG components for crypto logos
const EthereumLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg">
    <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="currentColor" fillOpacity="0.4"/>
    <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="currentColor" fillOpacity="0.3"/>
    <path d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" fill="currentColor" fillOpacity="0.4"/>
    <path d="M127.962 416.905v-104.72L0 236.585z" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

const SuiLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.4"/>
    <path d="M30 40 L70 40 L70 60 L30 60 Z" fill="currentColor" fillOpacity="0.3"/>
  </svg>
);

const CryptoBackground = () => {
  const generateElements = (count) => {
    return Array(count).fill(null).map((_, index) => {
      // Increased probability of crypto logos appearing
      const icons = [
        EthereumLogo, EthereumLogo, EthereumLogo, // 3x ETH
        SuiLogo, SuiLogo, SuiLogo, // 3x SUI
        Globe2, Star, Sparkles, Orbit, Atom // Space elements
      ];
      const IconComponent = icons[Math.floor(Math.random() * icons.length)];
      const size = 30 + Math.random() * 50;
      const left = Math.random() * 100;
      const initialTop = Math.random() * 100;
      const duration = 15 + Math.random() * 20;
      const delay = index * -2; // Reduced delay for more movement
      
      return {
        IconComponent,
        style: {
          left: `${left}%`,
          top: `${initialTop}%`,
          width: size,
          height: size,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`
        }
      };
    });
  };

  const elements = generateElements(24); // Increased number of elements

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />
      
      {/* Stars twinkling effect */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} 
      />

      {/* Main celestial bodies */}
      <div className="absolute top-10 right-10">
        <Sun className="w-24 h-24 text-yellow-500/20 animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-20">
        <Moon className="w-16 h-16 text-gray-400/20 animate-pulse" />
      </div>

      {/* Large static logos in corners */}
      <div className="absolute top-20 left-20">
        <EthereumLogo className="w-40 h-40 text-blue-500/10" />
      </div>
      <div className="absolute bottom-20 right-20">
        <SuiLogo className="w-40 h-40 text-green-500/10" />
      </div>

      {/* Floating elements */}
      <div className="relative w-full h-full">
        {elements.map((element, index) => (
          <div
            key={index}
            className="absolute animate-float opacity-20"
            style={element.style}
          >
            <element.IconComponent 
              className={`w-full h-full ${
                element.IconComponent === EthereumLogo 
                  ? 'text-blue-300/40' 
                  : element.IconComponent === SuiLogo
                    ? 'text-green-300/40'
                    : index % 3 === 0 
                      ? 'text-purple-300/40' 
                      : 'text-cyan-300/40'
              } animate-spin-slow`}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -30px) rotate(5deg); }
          50% { transform: translate(-20px, -50px) rotate(-5deg); }
          75% { transform: translate(-30px, -20px) rotate(3deg); }
        }
        .animate-float {
          animation: float var(--duration, 20s) infinite ease-in-out;
          animation-delay: var(--delay, 0s);
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CryptoBackground;