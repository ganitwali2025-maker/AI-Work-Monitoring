import React from 'react';
import { Bell, User, UserPlus } from 'lucide-react';

interface LandingPageProps {
  onLoginSuccess: (role: string) => void;
}

export default function LandingPage({ onLoginSuccess }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden flex flex-col">
      <style>{`
        @keyframes float-wave-top {
          0% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(10px) scaleY(1.05); }
          100% { transform: translateY(0px) scaleY(1); }
        }
        @keyframes float-wave-bottom {
          0% { transform: translateY(0px) scaleY(1); }
          50% { transform: translateY(-10px) scaleY(1.05); }
          100% { transform: translateY(0px) scaleY(1); }
        }
      `}</style>

      {/* Top decorative animated wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0">
        <svg 
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto opacity-70"
          style={{ animation: 'float-wave-top 8s ease-in-out infinite' }}
        >
          <path d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,106.7C672,107,768,149,864,154.7C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="url(#paint_top_linear)"/>
          <defs>
            <linearGradient id="paint_top_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d9f0a3" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Decorative Glowing Orbs behind header */}
      <div className="absolute top-[-50px] left-[15%] w-[300px] h-[300px] bg-[#d9f0a3] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse z-0 pointer-events-none"></div>
      <div className="absolute top-[-100px] right-[25%] w-[400px] h-[400px] bg-[#eaf4d9] rounded-full mix-blend-multiply filter blur-[100px] opacity-80 z-0 pointer-events-none" style={{ animation: 'float-wave-top 10s ease-in-out infinite' }}></div>

      {/* Top Header */}
      <header className="w-full flex items-center justify-between px-8 md:px-16 py-6 absolute top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Arch Logo (Passary Refractories) */}
          <div className="flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Pale green rounded background */}
              <rect x="5" y="5" width="90" height="90" rx="20" fill="#e6f0d5" />
              {/* Dark green arch */}
              <path d="M 25 75 L 25 50 A 25 25 0 0 1 75 50 L 75 75 L 58 75 L 58 50 A 8 8 0 0 0 42 50 L 42 75 Z" fill="#4a6b22" />
            </svg>
          </div>
          <div className="flex flex-col justify-center h-full">
            <span className="font-extrabold text-[#2b3a1a] text-[22px] leading-tight tracking-tight mt-1">
              Passary Refractories
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-gray-200/80 shadow-sm">
          <a href="#" className="text-[12px] font-bold text-[#2b3a1a] tracking-wider bg-[#e6f0d5] px-5 py-2 rounded-full transition-all shadow-sm ring-1 ring-white">
            HOME
          </a>
          <a href="#" className="text-[12px] font-bold text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-100/80 px-5 py-2 rounded-full tracking-wider transition-all">
            ABOUT US
          </a>
          <a href="#" className="text-[12px] font-bold text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-100/80 px-5 py-2 rounded-full tracking-wider transition-all">
            PRODUCTS
          </a>
          <a href="#" className="text-[12px] font-bold text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-100/80 px-5 py-2 rounded-full tracking-wider transition-all">
            SERVICES
          </a>
          <a href="#" className="text-[12px] font-bold text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-100/80 px-5 py-2 rounded-full tracking-wider transition-all">
            CONTACT
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
           <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Bell size={20} />
           </button>
           <button 
             onClick={() => onLoginSuccess('admin')}
             className="flex items-center gap-2 bg-white border border-[#4a6b22] hover:bg-[#f4f8ee] text-[#2c4013] px-5 py-2 rounded-md text-[12px] font-bold tracking-wider transition-colors shadow-sm"
           >
             <User size={16} />
             LOGIN
           </button>
        </div>

      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row relative mt-24">
        
        {/* Left Content Container */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 pt-10 pb-20">
          
          <div className="mb-4">
             <span className="text-5xl md:text-[64px] font-black tracking-tight text-[#517b27] leading-tight block mb-2">
               Welcome Back,
             </span>
             <h1 className="text-5xl md:text-[64px] font-black tracking-tight text-[#3b4a26] leading-tight">
               Passary Refractories
             </h1>
          </div>
          
          <h2 className="text-[26px] md:text-[32px] font-semibold text-[#3b4654] leading-snug tracking-wide mb-6">
            Forging Energy-Efficient Solutions<br className="hidden lg:block"/> Through Smart Business Automation
          </h2>
          
          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg mb-10">
            We believe in driving progress responsibly by saving<br className="hidden md:block"/>
            over 1.5 lakh tons of coal energy, powering a greener<br className="hidden md:block"/>
            and more efficient future.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-[#4d6031] hover:bg-[#3b4c24] text-white px-8 py-3.5 rounded text-[13px] font-bold tracking-widest transition-all shadow-md">
              LEARN MORE
            </button>
            <button className="bg-transparent border-2 border-[#4d6031] text-[#4d6031] hover:bg-[#4d6031] hover:text-white px-8 py-3.5 rounded text-[13px] font-bold tracking-widest transition-all">
              START
            </button>
          </div>

        </div>

        {/* Right Image Container */}
        <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-full flex items-center justify-end z-20 mix-blend-multiply pr-4 lg:pr-16">
           <img 
              src="/illustration_v2.png" 
              alt="Person typing on laptop" 
              className="w-full max-w-[800px] object-contain relative z-20 mt-10 lg:mt-0 mix-blend-multiply"
              style={{ maxHeight: '80vh', objectPosition: 'right center' }}
           />
        </div>

      </main>

      {/* Bottom decorative wave */}
      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
        <svg 
          viewBox="0 0 1440 320" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto opacity-70"
          style={{ animation: 'float-wave-bottom 7s ease-in-out infinite' }}
        >
          <path d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,234.7C672,235,768,213,864,186.7C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="url(#paint0_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="160" x2="1440" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#b6db73" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Super clean bottom sweeping curve effect */}
      <div className="absolute -bottom-24 -left-24 w-[80%] h-[300px] bg-gradient-to-r from-[#d9f0a3]/80 to-transparent rounded-[100%] blur-3xl -z-10"></div>
      <div className="absolute -bottom-[200px] left-0 w-[120%] h-[400px] border-t-[10px] border-[#cbed82] rounded-[100%] pointer-events-none -z-10 opacity-60"></div>
      <div className="absolute -bottom-[160px] -left-[10%] w-[120%] h-[300px] bg-[#f3f9e6] rounded-[100%] pointer-events-none -z-20"></div>

    </div>
  );
}
