import React, { useEffect, useState } from 'react';
import { Bell, User, Leaf, Settings, Users, Activity, Zap, Shield, BarChart2, Phone, Mail, MapPin, Send, Home, CheckCircle2, Box, Database, Bot, PieChart, Brain, LayoutDashboard, RefreshCw, TrendingUp, Target, ArrowUpRight, IndianRupee, Clock, Headset, MessageSquare, Lock, FileText, PenLine, ChevronRight, Eye, Cloud, Factory, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onLoginSuccess: (role: string) => void;
}

export default function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showIdSuggestions, setShowIdSuggestions] = useState(false);

  const validIds = ['marketing', 'crm', 'sales', 'customer', 'purchase', 'vendor', 'inventory', 'lab', 'dispatch', 'production', 'finance', 'hr', 'costing', 'director', 'admin'];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = loginId.toLowerCase();
    if (validIds.includes(id) && loginPassword === '1234') {
      setIsAuthenticating(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
          progress = 100;
          setLoadingProgress(100);
          clearInterval(interval);
          setTimeout(() => {
            onLoginSuccess(id);
          }, 400);
        } else {
          setLoadingProgress(progress);
        }
      }, 300);
    } else {
      setLoginError('Invalid ID or Password');
    }
  };

  // Smooth scroll and active section tracking
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleSmoothScroll);

    // Scroll spy logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 }); // Trigger when 30% of the section is visible

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  if (showLogin) {
    return (
      <div className="min-h-screen text-gray-900 relative flex flex-col font-sans bg-white overflow-x-hidden">
        {/* Decorative Background blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[50rem] h-[50rem] bg-[#f4f9ea] rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50rem] h-[50rem] bg-[#fff0ea] rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute top-[30%] left-[20%] w-[30rem] h-[30rem] bg-[#f4f9ea] rounded-full blur-[80px] pointer-events-none z-0 opacity-60"></div>
        
        {/* Header */}
        <header className="relative z-50 w-full flex items-center justify-between px-8 md:px-16 py-4 bg-white border-b border-gray-100 shadow-sm">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <svg width="42" height="42" viewBox="25 25 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 25 75 L 25 45 A 25 18 0 0 1 75 45 L 75 75 L 43 75 L 43 63 L 63 63 L 63 45 A 13 6 0 0 0 37 45 L 37 75 Z" fill="#4a6b22" />
                </svg>
              </div>
              <div className="flex flex-col justify-center h-[42px]">
                <span className="font-extrabold text-[#4a6b22] text-[19px] leading-[1.05] tracking-tight mt-1">
                  Passary<br/>Refractories
                </span>
              </div>
            </div>
            
            <div className="hidden xl:flex items-center ml-4 pl-4 border-l-2 border-gray-200 h-[32px]">
              <span className="font-extrabold text-[#ff5a1f] text-[18px] tracking-tight whitespace-nowrap">
                Forging Energy-Efficient Solutions
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 ml-8">
            <button onClick={() => setShowLogin(false)} className="text-[15px] font-extrabold tracking-widest text-[#4a6b22]">HOME</button>
            <button className="text-[15px] font-extrabold tracking-widest text-[#334155] hover:text-[#4a6b22]">ABOUT US</button>
            <button className="text-[15px] font-extrabold tracking-widest text-[#334155] hover:text-[#4a6b22]">SERVICES</button>
            <button className="text-[15px] font-extrabold tracking-widest text-[#334155] hover:text-[#4a6b22]">CONTACT</button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center">
             <button onClick={() => setShowLogin(false)} className="px-6 py-3 text-[13px] font-extrabold bg-[#ff5a1f] hover:bg-[#e64a14] text-white border-none rounded-[4px] transition-all duration-300 tracking-widest shadow-md flex items-center gap-2">
               <span>&larr;</span> BACK TO HOME
             </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-10 w-full max-w-[1400px] mx-auto">
          
          {isAuthenticating ? (
            <div className="w-full flex items-center justify-center min-h-[500px] relative z-20">
              <div className="bg-white rounded-[24px] p-10 md:p-14 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#e1ebd5] flex flex-col items-center justify-center max-w-[450px] w-full animate-in fade-in zoom-in duration-500">
                
                {/* Logo */}
                <div className="flex items-center gap-3 mb-10">
                  <svg width="36" height="36" viewBox="25 25 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 25 75 L 25 45 A 25 18 0 0 1 75 45 L 75 75 L 43 75 L 43 63 L 63 63 L 63 45 A 13 6 0 0 0 37 45 L 37 75 Z" fill="#4a6b22" />
                  </svg>
                  <div className="flex flex-col justify-center h-[36px]">
                    <span className="font-extrabold text-[#4a6b22] text-[17px] leading-[1.05] tracking-tight mt-1">
                      Passary<br/>Refractories
                    </span>
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="relative w-32 h-32 mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#fff0eb" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ff5a1f" strokeWidth="8" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * loadingProgress) / 100} className="transition-all duration-300 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[#4a6b22]">
                    <Factory size={40} className="animate-pulse" />
                  </div>
                </div>

                {/* Text */}
                <h2 className="text-[22px] font-extrabold text-[#2b3a1a] mb-2">Loading...</h2>
                <p className="text-[13px] text-gray-500 font-medium mb-8 text-center">Please wait while we prepare your dashboard</p>

                {/* Linear Progress */}
                <div className="w-full flex items-center gap-4 mb-8">
                  <div className="flex-1 h-3 bg-[#f4f9ea] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4a6b22] to-[#729b38] rounded-full transition-all duration-300 ease-out" style={{ width: `${loadingProgress}%` }}></div>
                  </div>
                  <span className="text-[13px] font-bold text-[#4a6b22] min-w-[32px]">{loadingProgress}%</span>
                </div>

                {/* Footer tags */}
                <div className="text-[11px] font-bold text-[#4a6b22] tracking-widest uppercase">
                  Secure &bull; Smart &bull; Efficient
                </div>

              </div>
            </div>
          ) : (
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 xl:gap-32">
            {/* Login Card */}
            <div className="w-full lg:w-[40%] max-w-[500px] bg-white rounded-[24px] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#e1ebd5] relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f9ea] text-[#4a6b22] text-[11px] font-extrabold tracking-widest mb-6">
                <Shield size={14} /> SECURE LOGIN
              </div>
              <h1 className="text-[36px] font-black text-[#2b3a1a] tracking-tight mb-3">Welcome Back</h1>
              <p className="text-[#5c6b4a] text-[14px] leading-relaxed mb-8 font-medium">
                Securely sign in to access ERP, AI tools, Factory Drawings, Reports, Production Management, and Smart Business Operations.
              </p>

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
                <div className="relative">
                  <label className="block text-[13px] font-extrabold text-[#2b3a1a] mb-2">Employee ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4a6b22]">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={loginId}
                      onChange={(e) => {
                        setLoginId(e.target.value);
                        setShowIdSuggestions(true);
                      }}
                      onBlur={() => setTimeout(() => setShowIdSuggestions(false), 200)}
                      placeholder="Enter your Employee ID" 
                      className="w-full bg-white border border-[#4a6b22] rounded-xl pl-12 pr-10 py-3.5 outline-none focus:border-[#4a6b22] focus:ring-2 focus:ring-[#4a6b22]/20 transition-all text-[14px] placeholder-gray-400 text-gray-900 font-medium"
                    />
                    <button type="button" onClick={() => setShowIdSuggestions(!showIdSuggestions)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#4a6b22] hover:text-gray-900">
                       <ChevronDown size={18} />
                    </button>
                  </div>

                  {showIdSuggestions && (
                    <div className="absolute z-50 mt-1 w-[90%] left-[5%] bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] max-h-[300px] overflow-y-auto overflow-x-hidden p-2 hide-scrollbar">
                      <div className="text-[10px] font-bold text-gray-400 tracking-widest px-3 py-2 uppercase mb-1">Suggested IDs</div>
                      {['admin', 'marketing', 'crm', 'sales', 'customer', 'purchase', 'vendor', 'inventory', 'lab', 'dispatch', 'production', 'finance', 'hr', 'costing', 'director']
                        .filter(id => id.includes(loginId.toLowerCase()))
                        .map((id) => (
                        <button
                          key={id}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setLoginId(id);
                            setShowIdSuggestions(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-left transition-colors group"
                        >
                          <User size={15} className="text-[#4a6b22] group-hover:scale-110 transition-transform" />
                          <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#4a6b22] transition-colors">{id}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[13px] font-extrabold text-[#2b3a1a] mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password" 
                      className="w-full bg-white border border-[#e1ebd5] rounded-xl pl-12 pr-12 py-3.5 outline-none focus:border-[#4a6b22] focus:ring-2 focus:ring-[#4a6b22]/20 transition-all text-[14px] placeholder-gray-400"
                    />
                    <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                       <Eye size={18} />
                    </button>
                  </div>
                </div>

                {loginError && <p className="text-red-500 text-xs font-semibold">{loginError}</p>}

                <div className="flex items-center justify-between mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4a6b22] focus:ring-[#4a6b22]" />
                    <span className="text-[13px] font-semibold text-[#5c6b4a]">Remember Me</span>
                  </label>
                  <a href="#" className="text-[13px] font-extrabold text-[#4a6b22] hover:underline">Forgot Password?</a>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#ff5a1f] hover:bg-[#e64a14] text-white py-4 rounded-xl text-[14px] font-extrabold tracking-widest transition-all mt-4 shadow-md hover:-translate-y-0.5"
                >
                  LOGIN
                </button>
              </form>


            </div>

            {/* Illustration */}
            <div className="w-full lg:w-[50%] relative flex items-center justify-center lg:justify-end z-20 mix-blend-multiply">
              <img src="/illustration_v2.png" alt="Login Illustration" className="w-full max-w-[600px] object-contain relative z-20" />
            </div>
          </div>
          )}



        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 relative overflow-hidden flex flex-col font-sans bg-transparent">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Global Theme Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#f0f5eb]">
         {/* Top Peach Wave */}
         <svg className="absolute top-0 left-0 w-full h-[50vh] min-h-[500px]" preserveAspectRatio="none" viewBox="0 0 1440 500">
           <path d="M0,0 L1440,0 L1440,150 C1100,350 400,0 0,350 Z" fill="#fdf2e8" />
         </svg>
         
         {/* Dot Patterns */}
         <div className="absolute top-[35%] right-[12%] w-[200px] h-[200px] opacity-80" style={{
            backgroundImage: 'radial-gradient(#e5ccb3 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
         }}></div>
         
         <div className="absolute bottom-[15%] left-[8%] w-[160px] h-[160px] opacity-60" style={{
            backgroundImage: 'radial-gradient(#e5ccb3 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
         }}></div>

         {/* Sparkles */}
         <svg className="absolute top-[20%] left-[28%] text-white w-6 h-6 animate-pulse opacity-90" viewBox="0 0 24 24" fill="none">
           <path d="M12 2 C12 8 16 12 22 12 C16 12 12 16 12 22 C12 16 8 12 2 12 C8 12 12 8 12 2 Z" fill="currentColor" />
         </svg>
         <svg className="absolute top-[45%] right-[22%] text-white w-5 h-5 animate-pulse opacity-80" viewBox="0 0 24 24" fill="none" style={{ animationDelay: '1s' }}>
           <path d="M12 2 C12 8 16 12 22 12 C16 12 12 16 12 22 C12 16 8 12 2 12 C8 12 12 8 12 2 Z" fill="currentColor" />
         </svg>
         <svg className="absolute bottom-[30%] left-[18%] text-white w-4 h-4 animate-pulse opacity-70" viewBox="0 0 24 24" fill="none" style={{ animationDelay: '2s' }}>
           <path d="M12 2 C12 8 16 12 22 12 C16 12 12 16 12 22 C12 16 8 12 2 12 C8 12 12 8 12 2 Z" fill="currentColor" />
         </svg>
      </div>

      {/* FIXED HEADER */}
      <header className="fixed w-full flex items-center justify-between px-8 md:px-16 py-4 top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all">
        {/* Logo & Tagline */}
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <svg width="42" height="42" viewBox="25 25 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 25 75 L 25 45 A 25 18 0 0 1 75 45 L 75 75 L 43 75 L 43 63 L 63 63 L 63 45 A 13 6 0 0 0 37 45 L 37 75 Z" fill="#4a6b22" />
              </svg>
            </div>
            <div className="flex flex-col justify-center h-[42px]">
              <span className="font-extrabold text-[#4a6b22] text-[19px] leading-[1.05] tracking-tight mt-1">
                Passary<br/>Refractories
              </span>
            </div>
          </div>
          
          <div className="hidden xl:flex items-center ml-4 pl-4 border-l-2 border-gray-200 h-[32px]">
            <span className="font-extrabold text-[#ff5a1f] text-[18px] tracking-tight whitespace-nowrap">
              Forging Energy-Efficient Solutions
            </span>
          </div>
        </div>

        {/* Navigation Links - Template Style */}
        <nav className="hidden lg:flex items-center gap-8 ml-8">
          <a href="#home" className={`text-[15px] font-extrabold tracking-widest transition-all duration-300 ${activeSection === 'home' ? 'text-[#4a6b22]' : 'text-[#334155] hover:text-[#4a6b22]'}`}>
            HOME
          </a>
          <a href="#about" className={`text-[15px] font-extrabold tracking-widest transition-all duration-300 ${activeSection === 'about' ? 'text-[#4a6b22]' : 'text-[#334155] hover:text-[#4a6b22]'}`}>
            ABOUT US
          </a>
          <a href="#services" className={`text-[15px] font-extrabold tracking-widest transition-all duration-300 ${activeSection === 'services' ? 'text-[#4a6b22]' : 'text-[#334155] hover:text-[#4a6b22]'}`}>
            SERVICES
          </a>
          <a href="#contact" className={`text-[15px] font-extrabold tracking-widest transition-all duration-300 ${activeSection === 'contact' ? 'text-[#4a6b22]' : 'text-[#334155] hover:text-[#4a6b22]'}`}>
            CONTACT
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center">
           <button 
             onClick={() => setShowLogin(true)}
             className="px-8 py-3.5 text-[13px] font-extrabold bg-[#ff5a1f] hover:bg-[#e64a14] text-white border-none rounded-[4px] transition-all duration-300 cursor-pointer tracking-widest shadow-md hover:-translate-y-0.5"
           >
             LOGIN
           </button>
        </div>
      </header>

      {/* --- SECTION 1: HOME --- */}
      <section id="home" className="min-h-screen relative flex flex-col lg:flex-row items-center pt-24 pb-16 bg-transparent">
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 pt-10 lg:pt-0">
          <div className="mb-6 animate-fade-in-up stagger-1">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#e1ebd5] text-[#517b27] text-xs font-bold tracking-widest mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8a9a5b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#517b27]"></span>
                </span>
                NEXT-GEN AUTOMATION PLATFORM
             </div>
             <h1 className="text-5xl md:text-[68px] font-black tracking-tight text-[#2b3a1a] leading-[1.05] mb-4">
               Welcome Back to <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#517b27] to-[#8a9a5b] drop-shadow-sm">Passary Refractories</span>
             </h1>
          </div>
          <div className="flex flex-col gap-3 mb-10 animate-fade-in-up stagger-2 max-w-xl">
            <h2 className="text-xl md:text-[22px] font-medium text-[#5c6b4a] leading-relaxed tracking-wide">
              Transform your daily operations with intelligent workflow automation, AI-driven assistance, and centralized business process management.
            </h2>
            <div className="text-[13px] sm:text-[14px] font-extrabold text-[#4a6b22] tracking-widest leading-relaxed">
              ERP Automation &bull; AI Assistant &bull; Google Workspace Integration &bull; Smart Business Operations
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 animate-fade-in-up stagger-4">
            <button className="bg-[#4a6b22] hover:bg-[#3b591b] text-white px-9 py-4 rounded-full text-[13px] font-bold tracking-widest transition-all shadow-[0_8px_20px_rgba(74,107,34,0.25)] hover:shadow-[0_8px_25px_rgba(74,107,34,0.4)] hover:-translate-y-1 flex items-center gap-2 group">
              LEARN MORE
              <Activity size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
            <button className="bg-white/70 backdrop-blur-md border border-[#e1ebd5] text-[#4a6b22] hover:bg-white hover:text-[#3b591b] px-9 py-4 rounded-full text-[13px] font-bold tracking-widest transition-all shadow-sm hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:-translate-y-1">
              GET STARTED
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-full flex items-center justify-center z-20 pr-4 lg:pr-16 mt-12 lg:mt-0 mix-blend-multiply">
           <img 
              src="/illustration_v2.png" 
              alt="Person typing on laptop" 
              className="w-full max-w-[600px] object-contain relative z-20"
           />
        </div>

      </section>

      {/* --- SECTION 2: ABOUT US --- */}
      <section id="about" className="relative flex flex-col items-center justify-center min-h-[100vh] py-12 bg-gradient-to-b from-white to-[#f4f9ea]/40 px-4 md:px-8 lg:px-12 overflow-hidden">
        
        {/* Top Split Area */}
        <div className="w-full max-w-[1800px] flex flex-col mb-10 z-10 mx-auto">
          
          {/* Top Text Block (Centered) */}
          <div className="w-full flex flex-col items-center text-center">
            <div className="mb-6 animate-fade-in-up stagger-1 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#4a6b22]/20 text-[#4a6b22] text-[10px] font-bold tracking-widest mb-4 shadow-sm">
                <Leaf size={12} />
                OUR MISSION
              </div>
              <h2 className="text-3xl md:text-[42px] font-black tracking-tight text-[#2b3a1a] leading-[1.1] mb-4 max-w-[1600px]">
                Smart <span className="text-[#4a6b22]">ERP</span>. Intelligent <span className="text-[#4a6b22]">AI</span>. Seamless <span className="text-[#517b27]">Workflow</span>.
              </h2>
              <p className="text-[#5c6b4a] text-[15px] leading-relaxed font-medium max-w-[1200px]">
                Our ERP system integrates AI-powered automation to simplify processes, reduce manual work, and drive business efficiency. Work smarter, make better decisions, and grow faster with intelligent technology.
              </p>
            </div>

            {/* 4 Feature Mini Grid */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-20 animate-fade-in-up stagger-2 w-full max-w-[1600px] mt-8">
              <div className="flex gap-3 items-center text-left">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#4a6b22] shrink-0 border border-[#e1ebd5]">
                  <Box size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#2b3a1a] mb-0.5 text-[14px]">Integrated ERP Modules</h4>
                  <p className="text-[#647185] text-[12px] leading-snug font-medium">Finance, HR, Sales, Purchase & More</p>
                </div>
              </div>
              <div className="flex gap-3 items-center text-left">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#4a6b22] shrink-0 border border-[#e1ebd5]">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#2b3a1a] mb-0.5 text-[14px]">AI-Powered Automation</h4>
                  <p className="text-[#647185] text-[12px] leading-snug font-medium">Automate tasks and business processes</p>
                </div>
              </div>
              <div className="flex gap-3 items-center text-left">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#4a6b22] shrink-0 border border-[#e1ebd5]">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#2b3a1a] mb-0.5 text-[14px]">Centralized Data</h4>
                  <p className="text-[#647185] text-[12px] leading-snug font-medium">All data in one secure platform</p>
                </div>
              </div>
              <div className="flex gap-3 items-center text-left">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#4a6b22] shrink-0 border border-[#e1ebd5]">
                  <PieChart size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#2b3a1a] mb-0.5 text-[14px]">Real-Time Insights</h4>
                  <p className="text-[#647185] text-[12px] leading-snug font-medium">Live dashboards and smart analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 z-10 mx-auto">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <LayoutDashboard size={20} />
            </div>
            <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">Smart ERP Management</h3>
            <p className="text-[#647185] text-[12px] leading-relaxed mb-4 font-medium">Manage all core business operations in one place.</p>
            <ul className="space-y-2">
              {['Finance & Accounting', 'HR & Payroll', 'Sales & CRM', 'Purchase & Inventory', 'Reports & Analytics'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                  <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Bot size={20} />
            </div>
            <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">AI Assistant Workflow</h3>
            <p className="text-[#647185] text-[12px] leading-relaxed mb-4 font-medium">Get answers, automate tasks, and generate reports.</p>
            <ul className="space-y-2">
              {['ChatGPT & Gemini AI', 'Intelligent Query Responses', 'Report Generation', 'Data Analysis & Insights', 'Smart Recommendations'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                  <CheckCircle2 size={14} className="text-purple-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-4">
              <RefreshCw size={20} />
            </div>
            <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">Automation & Integration</h3>
            <p className="text-[#647185] text-[12px] leading-relaxed mb-4 font-medium">Automate tasks and integrate tools seamlessly.</p>
            <ul className="space-y-2">
              {['Workflow Automation', 'Approval Management', 'Email Response Automation', 'Google Sheets Integration', 'Google Drive Integration'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                  <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">Performance & Growth</h3>
            <p className="text-[#647185] text-[12px] leading-relaxed mb-4 font-medium">Track performance and make data-driven decisions.</p>
            <ul className="space-y-2">
              {['Real-Time Dashboards', 'KPI Tracking', 'Business Intelligence', 'Custom Reports', 'Predictive Analytics'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Bottom Promise Bar */}
        <div className="w-full max-w-[1800px] bg-white rounded-2xl border border-[#e1ebd5] flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 shadow-sm z-10 mx-auto">
          <div className="flex items-center gap-2 p-4 xl:px-8 shrink-0">
            <Shield size={20} className="text-[#4a6b22]" />
            <span className="font-black text-[#2b3a1a] text-base">Our Promise</span>
          </div>
          
          <div className="flex-1 p-4 xl:px-6">
            <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[14px]">Reduce Manual Work</h5>
            <p className="text-[11px] text-gray-500 font-medium">Save time and reduce errors</p>
          </div>
          
          <div className="flex-1 p-4 xl:px-6">
            <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[14px]">Improve Productivity</h5>
            <p className="text-[11px] text-gray-500 font-medium">Empower your teams</p>
          </div>
          
          <div className="flex-1 p-4 xl:px-6">
            <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[14px]">Data Security</h5>
            <p className="text-[11px] text-gray-500 font-medium">Secure. Reliable. Always.</p>
          </div>
          
          <div className="flex-1 p-4 xl:px-6">
            <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[14px]">Drive Growth</h5>
            <p className="text-[11px] text-gray-500 font-medium">Smarter operations, better results</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SERVICES --- */}
      <section id="services" className="relative flex flex-col items-center justify-center min-h-[100vh] py-12 bg-gradient-to-b from-[#f4f9ea]/40 to-white px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="w-full max-w-[1800px] relative z-10 flex flex-col items-center mx-auto">
          
          <div className="mb-10 animate-fade-in-up stagger-1 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#4a6b22]/20 text-[#4a6b22] text-[10px] font-bold tracking-widest mb-4 shadow-sm">
               <Target size={12}/> CORE CAPABILITIES
            </div>
            <h2 className="text-3xl md:text-[42px] font-black tracking-tight text-[#2b3a1a] leading-[1.1] mb-4 max-w-[1600px]">
              Smart Automation Solutions<br/> for a <span className="text-[#517b27]">Smarter Tomorrow</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4a6b22] to-transparent mb-4"></div>
            <p className="text-[#5c6b4a] text-[15px] leading-relaxed max-w-[1200px] font-medium text-center">
              We deliver intelligent automation solutions that empower industries to boost efficiency, reduce costs, and achieve sustainable, long-term growth.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
              <div className="w-10 h-10 bg-[#f4f9ea] text-[#4a6b22] rounded-xl flex items-center justify-center mb-4">
                <Activity size={20} />
              </div>
              <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">Process Automation</h3>
              <p className="text-[12px] text-[#647185] leading-relaxed mb-4 font-medium">
                Streamline operations and minimize manual intervention with our advanced automation systems.
              </p>
              <ul className="space-y-2">
                {['Workflow Automation', 'Task Scheduling', 'Approval Management', 'Error Reduction'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                    <CheckCircle2 size={14} className="text-[#4a6b22] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
              <div className="w-10 h-10 bg-[#f4f9ea] text-[#4a6b22] rounded-xl flex items-center justify-center mb-4">
                <Settings size={20} />
              </div>
              <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">Energy Management</h3>
              <p className="text-[12px] text-[#647185] leading-relaxed mb-4 font-medium">
                Optimize energy usage and reduce consumption with real-time monitoring and smart analytics.
              </p>
              <ul className="space-y-2">
                {['Real-time Monitoring', 'Energy Optimization', 'Cost Reduction', 'Sustainability Focus'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                    <CheckCircle2 size={14} className="text-[#4a6b22] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
              <div className="w-10 h-10 bg-[#f4f9ea] text-[#4a6b22] rounded-xl flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">Control Systems</h3>
              <p className="text-[12px] text-[#647185] leading-relaxed mb-4 font-medium">
                Reliable and scalable control solutions to ensure safety, accuracy, and maximum performance.
              </p>
              <ul className="space-y-2">
                {['SCADA & PLC Integration', 'Remote Monitoring', 'System Reliability', 'Performance Optimization'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                    <CheckCircle2 size={14} className="text-[#4a6b22] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-6 border border-[#e1ebd5] shadow-sm hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] transition-all hover:-translate-y-1">
              <div className="w-10 h-10 bg-[#f4f9ea] text-[#4a6b22] rounded-xl flex items-center justify-center mb-4">
                <BarChart2 size={20} />
              </div>
              <h3 className="font-black text-[#2b3a1a] text-lg mb-2 tracking-tight">Data & Analytics</h3>
              <p className="text-[12px] text-[#647185] leading-relaxed mb-4 font-medium">
                Harness the power of data to make informed decisions and drive continuous improvement.
              </p>
              <ul className="space-y-2">
                {['Real-time Dashboards', 'Advanced Analytics', 'Predictive Insights', 'Data-driven Decisions'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[12px] text-[#2b3a1a] font-semibold">
                    <CheckCircle2 size={14} className="text-[#4a6b22] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>



          {/* Bottom Promise Bar (5 Items) */}
          <div className="w-full bg-white rounded-2xl border border-[#e1ebd5] flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 shadow-sm">
            <div className="flex items-start md:items-center gap-3 p-4 xl:px-6 flex-1">
              <Shield size={20} className="text-[#4a6b22] shrink-0 mt-1 md:mt-0" />
              <div>
                <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[12px]">Improved Efficiency</h5>
                <p className="text-[10px] text-gray-500 font-medium">Automate. Optimize. Excel.</p>
              </div>
            </div>
            
            <div className="flex items-start md:items-center gap-3 p-4 xl:px-6 flex-1">
              <IndianRupee size={20} className="text-[#4a6b22] shrink-0 mt-1 md:mt-0" />
              <div>
                <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[12px]">Cost Savings</h5>
                <p className="text-[10px] text-gray-500 font-medium">Reduce costs, increase value.</p>
              </div>
            </div>
            
            <div className="flex items-start md:items-center gap-3 p-4 xl:px-6 flex-1">
              <Leaf size={20} className="text-[#4a6b22] shrink-0 mt-1 md:mt-0" />
              <div>
                <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[12px]">Sustainable Future</h5>
                <p className="text-[10px] text-gray-500 font-medium">Build a greener tomorrow.</p>
              </div>
            </div>
            
            <div className="flex items-start md:items-center gap-3 p-4 xl:px-6 flex-1">
              <Clock size={20} className="text-[#4a6b22] shrink-0 mt-1 md:mt-0" />
              <div>
                <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[12px]">Real-time Monitoring</h5>
                <p className="text-[10px] text-gray-500 font-medium">Live data, instant insights.</p>
              </div>
            </div>

            <div className="flex items-start md:items-center gap-3 p-4 xl:px-6 flex-1">
              <Users size={20} className="text-[#4a6b22] shrink-0 mt-1 md:mt-0" />
              <div>
                <h5 className="font-bold text-[#2b3a1a] mb-0.5 text-[12px]">Scalable Solutions</h5>
                <p className="text-[10px] text-gray-500 font-medium">Grow with confidence.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: CONTACT US --- */}
      <section id="contact" className="min-h-screen relative flex flex-col items-center justify-center py-12 bg-gradient-to-b from-white to-[#f4f9ea]/40 px-4 md:px-8 lg:px-12 overflow-hidden">
        <div className="w-full max-w-[1600px] flex flex-col lg:flex-row gap-12 xl:gap-20 relative z-10 mx-auto">
          
          {/* Left Column */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#4a6b22]/20 text-[#4a6b22] text-[10px] font-bold tracking-widest mb-3 shadow-sm">
                 <Headset size={12} /> GET IN TOUCH
              </div>
              <h2 className="text-3xl md:text-[42px] font-black tracking-tight text-[#2b3a1a] leading-[1.1] mb-3">
                Let's <span className="text-[#4a6b22]">Connect</span>
              </h2>
              <h3 className="text-xl md:text-xl font-bold text-[#2b3a1a] mb-2">
                We're here to help!
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#4a6b22] to-transparent mb-3"></div>
              <p className="text-[#5c6b4a] text-[15px] leading-relaxed max-w-md font-medium mb-4">
                Have a question, need a solution, or want to learn more about our automation services? Our team is ready to assist you. Reach out to us today and let's build smarter solutions together.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#e1ebd5] shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f4f9ea] rounded-xl flex items-center justify-center shrink-0 text-[#4a6b22] group-hover:bg-[#4a6b22] group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2b3a1a] text-[14px]">Phone</h4>
                    <p className="text-[#4a6b22] font-bold text-[13px]">+91 98765 43210</p>
                    <p className="text-gray-400 text-[10px] font-medium mt-0.5">Mon - Sat: 9:00 AM to 6:00 PM</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#4a6b22] group-hover:bg-[#eaf4d9] transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#e1ebd5] shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f4f9ea] rounded-xl flex items-center justify-center shrink-0 text-[#4a6b22] group-hover:bg-[#4a6b22] group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2b3a1a] text-[14px]">Email</h4>
                    <p className="text-[#4a6b22] font-bold text-[13px]">info@passary.com</p>
                    <p className="text-gray-400 text-[10px] font-medium mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#4a6b22] group-hover:bg-[#eaf4d9] transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#e1ebd5] shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f4f9ea] rounded-xl flex items-center justify-center shrink-0 text-[#4a6b22] group-hover:bg-[#4a6b22] group-hover:text-white transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2b3a1a] text-[14px]">Address</h4>
                    <p className="text-[#2b3a1a] font-bold text-[12px] leading-snug max-w-[200px]">123, Industrial Area, Raipur, Chhattisgarh, India</p>
                    <p className="text-[#4a6b22] text-[10px] font-semibold mt-1">Visit us at our office</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#4a6b22] group-hover:bg-[#eaf4d9] transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>

            {/* Bottom 4 items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#f8fcf3] p-3 rounded-2xl border border-[#e1ebd5]/50">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-[#eaf4d9] rounded-full flex items-center justify-center text-[#4a6b22] mb-1.5">
                  <Users size={14} />
                </div>
                <h5 className="font-bold text-[#2b3a1a] text-[11px] mb-0.5">Expert Support</h5>
                <p className="text-gray-500 text-[9px]">Get assistance from<br/>our experts</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-[#e1ebd5]/50">
                <div className="w-8 h-8 bg-[#eaf4d9] rounded-full flex items-center justify-center text-[#4a6b22] mb-1.5">
                  <Shield size={14} />
                </div>
                <h5 className="font-bold text-[#2b3a1a] text-[11px] mb-0.5">Quick Response</h5>
                <p className="text-gray-500 text-[9px]">We respond within<br/>24 hours</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-[#e1ebd5]/50">
                <div className="w-8 h-8 bg-[#eaf4d9] rounded-full flex items-center justify-center text-[#4a6b22] mb-1.5">
                  <Box size={14} />
                </div>
                <h5 className="font-bold text-[#2b3a1a] text-[11px] mb-0.5">Reliable Solutions</h5>
                <p className="text-gray-500 text-[9px]">Smart & scalable<br/>solutions for you</p>
              </div>
              <div className="flex flex-col items-center text-center border-l border-[#e1ebd5]/50">
                <div className="w-8 h-8 bg-[#eaf4d9] rounded-full flex items-center justify-center text-[#4a6b22] mb-1.5">
                  <Settings size={14} />
                </div>
                <h5 className="font-bold text-[#2b3a1a] text-[11px] mb-0.5">End-to-End Service</h5>
                <p className="text-gray-500 text-[9px]">From consultation to<br/>implementation</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-[55%] relative flex items-center justify-center z-20">
            <div className="w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(43,58,26,0.06)] border border-[#e1ebd5] p-6 md:p-8 relative">
              
              {/* Form Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#f4f9ea] rounded-xl flex items-center justify-center shrink-0 text-[#4a6b22]">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#2b3a1a] tracking-tight mb-1">Send us a Message</h3>
                  <p className="text-[#647185] text-[13px] font-medium">Fill out the form below and we'll get back to you.</p>
                  <div className="w-8 h-0.5 bg-[#d9f0a3] mt-3"></div>
                </div>
              </div>

              {/* Form Fields */}
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-extrabold text-[#2b3a1a] tracking-wide mb-1.5 pl-1">Your Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4a6b22]">
                      <User size={16} />
                    </div>
                    <input type="text" placeholder="John Doe" className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#517b27] focus:ring-2 focus:ring-[#517b27]/20 transition-all text-[13px] font-medium placeholder-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold text-[#2b3a1a] tracking-wide mb-1.5 pl-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4a6b22]">
                      <Mail size={16} />
                    </div>
                    <input type="email" placeholder="john@example.com" className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#517b27] focus:ring-2 focus:ring-[#517b27]/20 transition-all text-[13px] font-medium placeholder-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold text-[#2b3a1a] tracking-wide mb-1.5 pl-1">Subject</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4a6b22]">
                      <FileText size={16} />
                    </div>
                    <input type="text" placeholder="How can we help?" className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#517b27] focus:ring-2 focus:ring-[#517b27]/20 transition-all text-[13px] font-medium placeholder-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-extrabold text-[#2b3a1a] tracking-wide mb-1.5 pl-1">Message</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none text-[#4a6b22]">
                      <PenLine size={16} />
                    </div>
                    <textarea rows={3} placeholder="Type your message here..." className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#517b27] focus:ring-2 focus:ring-[#517b27]/20 transition-all text-[13px] font-medium placeholder-gray-400 resize-none"></textarea>
                  </div>
                </div>
                
                <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#2b3a1a] hover:bg-[#3b591b] text-white py-3.5 rounded-xl text-[13px] font-bold tracking-widest transition-all shadow-[0_8px_20px_rgba(43,58,26,0.2)] hover:shadow-[0_8px_25px_rgba(43,58,26,0.3)] hover:-translate-y-1 mt-1">
                  SEND MESSAGE <Send size={16} />
                </button>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <Lock size={12} className="text-[#4a6b22]" />
                  <p className="text-[11px] text-[#2b3a1a] font-semibold">Your information is safe with us. We never share your data.</p>
                </div>
              </form>

              {/* Call Now Banner */}
              <div className="mt-5 bg-[#f4f9ea] rounded-2xl p-4 flex items-center justify-between border border-[#e1ebd5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#4a6b22] shadow-sm shrink-0">
                    <Headset size={20} />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-bold text-[#2b3a1a] mb-0.5">Need immediate help?</h5>
                    <p className="text-[10px] text-gray-500 font-medium">Call us directly at <span className="text-[#4a6b22] font-bold">+91 98765 43210</span></p>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-white border border-[#4a6b22] text-[#4a6b22] hover:bg-[#4a6b22] hover:text-white px-4 py-2 rounded-full text-[10px] font-bold transition-colors shadow-sm ml-2">
                  <Phone size={12} /> CALL NOW
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
