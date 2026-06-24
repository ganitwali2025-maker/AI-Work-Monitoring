import React, { useEffect, useState } from 'react';
import { Bell, User, Leaf, Settings, Users, Activity, Zap, Shield, BarChart2, Phone, Mail, MapPin, Send, Home } from 'lucide-react';

interface LandingPageProps {
  onLoginSuccess: (role: string) => void;
}

export default function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState('home');
  
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
             onClick={() => onLoginSuccess('admin')}
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
          <h2 className="text-xl md:text-[22px] font-medium text-[#5c6b4a] leading-relaxed tracking-wide mb-10 animate-fade-in-up stagger-2 max-w-xl">
            We believe in driving progress responsibly by forging energy-efficient solutions and saving over 1.5 lakh tons of coal energy for a greener future.
          </h2>
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
      <section id="about" className="min-h-screen relative flex flex-col lg:flex-row items-center py-24 bg-transparent">
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="mb-10 animate-fade-in-up stagger-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#fdf2e8] border border-[#f5dbbf] text-[#d97706] text-xs font-bold tracking-widest mb-6">
               OUR MISSION
            </div>
            <h2 className="text-4xl md:text-[52px] font-black tracking-tight text-[#2b3a1a] leading-[1.1] mb-6">
              Driving Efficiency.<br /> <span className="text-[#517b27]">Building a Greener Tomorrow.</span>
            </h2>
            <p className="text-[#5c6b4a] text-lg leading-relaxed max-w-xl font-medium">
              Passary Refractories is committed to creating energy-efficient solutions through smart automation. Our mission is to help industries reduce energy consumption, optimize operations, and contribute to a sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm border border-white/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#eaf4d9] to-[#d9f0a3] flex items-center justify-center mb-5 text-[#3b591b] shadow-inner">
                <Leaf size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-2">Sustainability</h3>
              <p className="text-[13px] text-[#647185] leading-relaxed">
                Focusing on reducing energy usage and promoting a cleaner environment.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-white/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#eaf4d9] to-[#d9f0a3] flex items-center justify-center mb-5 text-[#3b591b] shadow-inner">
                <Settings size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-2">Innovation</h3>
              <p className="text-[13px] text-[#647185] leading-relaxed">
                Leveraging smart automation to drive operational excellence.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-white/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#eaf4d9] to-[#d9f0a3] flex items-center justify-center mb-5 text-[#3b591b] shadow-inner">
                <Users size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-2">Commitment</h3>
              <p className="text-[13px] text-[#647185] leading-relaxed">
                Dedicated to delivering reliable solutions and lasting value.
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-[50%] relative min-h-[400px] lg:min-h-full flex items-center justify-center z-20 pr-4 lg:pr-16 mt-16 lg:mt-0 animate-fade-in-up stagger-4">
           {/* Placeholder for the Wind Turbines illustration */}
           <div className="w-full max-w-[600px] aspect-square bg-[#eaf4d9]/50 rounded-full flex flex-col items-center justify-center border border-[#d9f0a3] text-[#517b27]/50 border-dashed animate-float-slow">
             <Leaf size={64} className="mb-4 animate-float" />
             <span className="font-bold tracking-widest text-sm uppercase">About Illustration Placeholder</span>
           </div>
        </div>

      </section>

      {/* --- SECTION 3: SERVICES --- */}
      <section id="services" className="min-h-screen relative flex flex-col items-center justify-center py-24 bg-transparent px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-[1400px] relative z-10">
          <div className="mb-16 animate-fade-in-up stagger-1 text-center flex flex-col items-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-[#e1ebd5] text-[#517b27] text-xs font-bold tracking-widest mb-6">
               CORE CAPABILITIES
            </div>
            <h2 className="text-4xl md:text-[52px] font-black tracking-tight text-[#2b3a1a] leading-[1.1] mb-6 max-w-3xl">
              Smart Automation Solutions<br/> for a <span className="text-[#517b27]">Smarter Tomorrow</span>
            </h2>
            <p className="text-[#5c6b4a] text-lg leading-relaxed max-w-2xl font-medium">
              We provide intelligent automation solutions that help industries improve efficiency, reduce costs, and ensure sustainable, long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#f4f9ea] group-hover:bg-[#4a6b22] rounded-2xl flex items-center justify-center mb-8 text-[#517b27] group-hover:text-white transition-colors duration-300">
                <Activity size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-extrabold text-[#2b3a1a] mb-4 text-xl tracking-tight">Process Automation</h3>
              <p className="text-[15px] text-[#647185] leading-relaxed">
                Streamline operations and minimize manual intervention with our advanced automation systems.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#f4f9ea] group-hover:bg-[#4a6b22] rounded-2xl flex items-center justify-center mb-8 text-[#517b27] group-hover:text-white transition-colors duration-300">
                <Settings size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-extrabold text-[#2b3a1a] mb-4 text-xl tracking-tight">Energy Management</h3>
              <p className="text-[15px] text-[#647185] leading-relaxed">
                Optimize energy usage and reduce consumption with real-time monitoring and smart analytics.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#f4f9ea] group-hover:bg-[#4a6b22] rounded-2xl flex items-center justify-center mb-8 text-[#517b27] group-hover:text-white transition-colors duration-300">
                <Shield size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-extrabold text-[#2b3a1a] mb-4 text-xl tracking-tight">Control Systems</h3>
              <p className="text-[15px] text-[#647185] leading-relaxed">
                Reliable and scalable control solutions to ensure safety, accuracy, and maximum performance.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(74,107,34,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#f4f9ea] group-hover:bg-[#4a6b22] rounded-2xl flex items-center justify-center mb-8 text-[#517b27] group-hover:text-white transition-colors duration-300">
                <BarChart2 size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-extrabold text-[#2b3a1a] mb-4 text-xl tracking-tight">Data & Analytics</h3>
              <p className="text-[15px] text-[#647185] leading-relaxed">
                Harness the power of data to make informed decisions and drive continuous improvement.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="bg-[#2b3a1a] hover:bg-[#3b591b] text-white px-10 py-4 rounded-full text-[13px] font-bold tracking-widest transition-all shadow-[0_8px_20px_rgba(43,58,26,0.2)] hover:shadow-[0_8px_25px_rgba(43,58,26,0.3)] hover:-translate-y-1">
              EXPLORE FULL SERVICES
            </button>
          </div>
        </div>

      </section>

      {/* --- SECTION 4: CONTACT US --- */}
      <section id="contact" className="min-h-screen relative flex flex-col lg:flex-row items-center py-24 bg-transparent">
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-[#e1ebd5] text-[#517b27] text-xs font-bold tracking-widest mb-6">
               GET IN TOUCH
            </div>
            <h2 className="text-4xl md:text-[52px] font-black tracking-tight text-[#2b3a1a] leading-[1.1] mb-6">
              Let's Connect
            </h2>
            <p className="text-[#5c6b4a] text-lg leading-relaxed max-w-md font-medium">
              Have a question or need a solution?<br/> We're here to help. Reach out to us today.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/40 hover:bg-white/60 border border-white/50 transition-colors shadow-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-[#eaf4d9] to-[#d9f0a3] rounded-xl flex items-center justify-center shrink-0 text-[#3b591b] shadow-inner">
                <Phone size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#2b3a1a] mb-1 text-lg">Phone</h4>
                <p className="text-[#647185] font-medium">+91 9876543210</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/40 hover:bg-white/60 border border-white/50 transition-colors shadow-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-[#eaf4d9] to-[#d9f0a3] rounded-xl flex items-center justify-center shrink-0 text-[#3b591b] shadow-inner">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#2b3a1a] mb-1 text-lg">Email</h4>
                <p className="text-[#647185] font-medium">info@passary.com</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/40 hover:bg-white/60 border border-white/50 transition-colors shadow-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-[#eaf4d9] to-[#d9f0a3] rounded-xl flex items-center justify-center shrink-0 text-[#3b591b] shadow-inner">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-extrabold text-[#2b3a1a] mb-1 text-lg">Address</h4>
                <p className="text-[#647185] font-medium leading-relaxed">
                  123, Industrial Area, Raipur,<br/>
                  Chhattisgarh, India - 492001
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] relative flex items-center justify-center z-20 px-8 mt-16 lg:mt-0">
          <div className="w-full max-w-[550px] bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(43,58,26,0.08)] border border-white p-8 md:p-12 relative">
            
            {/* Form Fields */}
            <form className="flex flex-col gap-6">
              <div>
                <label className="block text-[13px] font-extrabold text-[#2b3a1a] tracking-wide mb-2 pl-1">Your Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl px-5 py-4 outline-none focus:border-[#517b27] focus:ring-4 focus:ring-[#517b27]/10 transition-all text-[15px] font-medium placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-[#2b3a1a] tracking-wide mb-2 pl-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl px-5 py-4 outline-none focus:border-[#517b27] focus:ring-4 focus:ring-[#517b27]/10 transition-all text-[15px] font-medium placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-[#2b3a1a] tracking-wide mb-2 pl-1">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl px-5 py-4 outline-none focus:border-[#517b27] focus:ring-4 focus:ring-[#517b27]/10 transition-all text-[15px] font-medium placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-[#2b3a1a] tracking-wide mb-2 pl-1">Message</label>
                <textarea rows={4} placeholder="Type your message here..." className="w-full bg-[#f8fcf3] border border-[#e1ebd5] rounded-xl px-5 py-4 outline-none focus:border-[#517b27] focus:ring-4 focus:ring-[#517b27]/10 transition-all text-[15px] font-medium placeholder-gray-400 resize-none"></textarea>
              </div>
              
              <button type="button" className="w-full bg-[#4a6b22] hover:bg-[#3b591b] text-white py-5 rounded-xl text-[14px] font-bold tracking-widest transition-all shadow-[0_8px_20px_rgba(74,107,34,0.25)] hover:shadow-[0_8px_25px_rgba(74,107,34,0.4)] hover:-translate-y-1 mt-4">
                SEND MESSAGE
              </button>
            </form>

            {/* Placeholder for Paper Plane Illustration */}
            <div className="absolute -right-20 -bottom-10 hidden xl:flex flex-col items-center">
               <div className="w-40 h-40 bg-[#eaf4d9] rounded-full flex flex-col items-center justify-center border border-[#d9f0a3] text-[#517b27] border-dashed">
                 <Send size={40} className="mb-2" />
                 <span className="font-bold tracking-widest text-[10px] uppercase text-center px-4">Contact Illustration</span>
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
