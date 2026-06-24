import React, { useEffect, useState } from 'react';
import { Bell, User, Leaf, Settings, Users, Activity, Zap, Shield, BarChart2, Phone, Mail, MapPin, Send } from 'lucide-react';

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
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden flex flex-col font-sans">
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
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* FIXED HEADER */}
      <header className="fixed w-full flex items-center justify-between px-8 md:px-16 py-4 top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <svg width="32" height="32" viewBox="25 25 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 25 75 L 25 45 A 25 18 0 0 1 75 45 L 75 75 L 43 75 L 43 63 L 63 63 L 63 45 A 13 6 0 0 0 37 45 L 37 75 Z" fill="#8a9a5b" />
            </svg>
          </div>
          <div className="flex flex-col justify-center h-full">
            <span className="font-extrabold text-[#2b3a1a] text-[20px] leading-tight tracking-tight mt-1">
              Passary Refractories
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-white border border-gray-100 rounded-full shadow-sm">
          <a href="#home" className={`text-[12px] font-bold tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${activeSection === 'home' ? 'text-[#2b3a1a] bg-[#eaf4d9]' : 'text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-50'}`}>
            HOME
          </a>
          <a href="#about" className={`text-[12px] font-bold tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${activeSection === 'about' ? 'text-[#2b3a1a] bg-[#eaf4d9]' : 'text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-50'}`}>
            ABOUT US
          </a>
          <a href="#services" className={`text-[12px] font-bold tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${activeSection === 'services' ? 'text-[#2b3a1a] bg-[#eaf4d9]' : 'text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-50'}`}>
            SERVICES
          </a>
          <a href="#contact" className={`text-[12px] font-bold tracking-wider px-6 py-2 rounded-full transition-all duration-300 ${activeSection === 'contact' ? 'text-[#2b3a1a] bg-[#eaf4d9]' : 'text-[#444f60] hover:text-[#2b3a1a] hover:bg-gray-50'}`}>
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
             className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#4a6b22] text-[#2c4013] px-5 py-2 rounded-md text-[12px] font-bold tracking-wider transition-all shadow-sm"
           >
             <User size={16} />
             LOGIN
           </button>
        </div>
      </header>

      {/* --- SECTION 1: HOME --- */}
      <section id="home" className="min-h-screen relative flex flex-col lg:flex-row items-center pt-24 pb-16">
        {/* Background Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0">
          <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-70" style={{ animation: 'float-wave-top 8s ease-in-out infinite' }}>
            <path d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,106.7C672,107,768,149,864,154.7C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="url(#paint_top_linear_home)"/>
            <defs>
              <linearGradient id="paint_top_linear_home" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d9f0a3" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 pt-10">
          <div className="mb-4">
             <span className="text-4xl md:text-[56px] font-black tracking-tight text-[#517b27] leading-tight block mb-2">
               Welcome Back,
             </span>
             <h1 className="text-4xl md:text-[56px] font-black tracking-tight text-[#3b4a26] leading-tight">
               Passary Refractories
             </h1>
          </div>
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#3b4654] leading-snug tracking-wide mb-6">
            Forging Energy-Efficient Solutions<br className="hidden lg:block"/> Through Smart Business Automation
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-lg mb-10">
            We believe in driving progress responsibly by saving over 1.5 lakh tons of coal energy, powering a greener and more efficient future.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-[#4d6031] hover:bg-[#3b4c24] text-white px-8 py-3.5 rounded text-[13px] font-bold tracking-widest transition-all shadow-md">
              LEARN MORE
            </button>
            <button className="bg-transparent border-2 border-[#4d6031] text-[#4d6031] hover:bg-[#4d6031] hover:text-white px-8 py-3.5 rounded text-[13px] font-bold tracking-widest transition-all">
              GET STARTED
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-full flex items-center justify-center z-20 pr-4 lg:pr-16 mt-12 lg:mt-0">
           <img 
              src="/illustration_v2.png" 
              alt="Person typing on laptop" 
              className="w-full max-w-[600px] object-contain relative z-20 mix-blend-multiply"
           />
        </div>

        {/* Bottom decorative wave for Home section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-40">
            <path d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,160C1120,160,1280,128,1360,112L1440,96L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z" fill="#d9f0a3"/>
          </svg>
        </div>
      </section>

      {/* --- SECTION 2: ABOUT US --- */}
      <section id="about" className="min-h-screen relative flex flex-col lg:flex-row items-center py-24 bg-[#fafdf5]">
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="mb-8">
            <span className="text-[#648b37] text-sm font-bold tracking-widest uppercase mb-2 block">ABOUT US —</span>
            <h2 className="text-4xl md:text-[48px] font-black tracking-tight text-[#2b3a1a] leading-tight mb-6">
              Driving Efficiency.<br /> Building a Greener Tomorrow.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl mb-10">
              Passary Refractories is committed to creating energy-efficient solutions through smart automation. Our mission is to help industries reduce energy consumption, optimize operations, and contribute to a sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-4 text-[#517b27] bg-white shadow-sm">
                <Leaf size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-2">Sustainability</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We focus on reducing energy usage and promoting a cleaner environment.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-4 text-[#517b27] bg-white shadow-sm">
                <Settings size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-2">Innovation</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Leveraging smart automation to drive operational excellence and efficiency.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mb-4 text-[#517b27] bg-white shadow-sm">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-2">Commitment</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We are dedicated to delivering reliable solutions and lasting value to our clients.
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-[50%] relative min-h-[400px] lg:min-h-full flex items-center justify-center z-20 pr-4 lg:pr-16 mt-16 lg:mt-0">
           {/* Placeholder for the Wind Turbines illustration */}
           <div className="w-full max-w-[600px] aspect-square bg-[#eaf4d9]/50 rounded-full flex flex-col items-center justify-center border border-[#d9f0a3] text-[#517b27]/50 border-dashed">
             <Leaf size={64} className="mb-4" />
             <span className="font-bold tracking-widest text-sm uppercase">About Illustration Placeholder</span>
           </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-40 transform scale-x-[-1]">
            <path d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,160C1120,160,1280,128,1360,112L1440,96L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z" fill="#d9f0a3"/>
          </svg>
        </div>
      </section>

      {/* --- SECTION 3: SERVICES --- */}
      <section id="services" className="min-h-screen relative flex flex-col items-center justify-center py-24 bg-white px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-6xl relative z-10">
          <div className="mb-16">
            <span className="text-[#648b37] text-sm font-bold tracking-widest uppercase mb-2 block">SERVICES —</span>
            <h2 className="text-4xl md:text-[48px] font-black tracking-tight text-[#2b3a1a] leading-tight mb-6 max-w-2xl">
              Smart Automation Solutions<br/> for a Smarter Tomorrow
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              We provide intelligent automation solutions that help industries improve efficiency, reduce costs, and ensure sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-[#f4f9ea] rounded-xl flex items-center justify-center mb-6 text-[#517b27]">
                <Activity size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-3 text-lg">Process Automation</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Streamline operations and minimize manual intervention with our advanced automation systems.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-[#f4f9ea] rounded-xl flex items-center justify-center mb-6 text-[#517b27]">
                <Settings size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-3 text-lg">Energy Management</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Optimize energy usage and reduce consumption with real-time monitoring and smart analytics.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-[#f4f9ea] rounded-xl flex items-center justify-center mb-6 text-[#517b27]">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-3 text-lg">Control Systems</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Reliable and scalable control solutions to ensure safety, accuracy, and performance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-[#f4f9ea] rounded-xl flex items-center justify-center mb-6 text-[#517b27]">
                <BarChart2 size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2b3a1a] mb-3 text-lg">Data & Analytics</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Harness the power of data to make informed decisions and drive continuous improvement.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="bg-[#32451f] hover:bg-[#253216] text-white px-10 py-4 rounded text-[13px] font-bold tracking-widest transition-all shadow-md">
              EXPLORE SERVICES
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-0">
          <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-40">
            <path d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,160C1120,160,1280,128,1360,112L1440,96L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z" fill="#d9f0a3"/>
          </svg>
        </div>
      </section>

      {/* --- SECTION 4: CONTACT US --- */}
      <section id="contact" className="min-h-screen relative flex flex-col lg:flex-row items-center py-24 bg-[#fafdf5]">
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="mb-12">
            <span className="text-[#648b37] text-sm font-bold tracking-widest uppercase mb-2 block">CONTACT US —</span>
            <h2 className="text-4xl md:text-[48px] font-black tracking-tight text-[#2b3a1a] leading-tight mb-6">
              Let's Connect
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              Have a question or need a solution?<br/> We're here to help. Reach out to us today.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#eaf4d9] rounded-full flex items-center justify-center shrink-0 text-[#517b27]">
                <Phone size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-[#2b3a1a] mb-1">Phone</h4>
                <p className="text-gray-500">+91 9876543210</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#eaf4d9] rounded-full flex items-center justify-center shrink-0 text-[#517b27]">
                <Mail size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-[#2b3a1a] mb-1">Email</h4>
                <p className="text-gray-500">info@passary.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#eaf4d9] rounded-full flex items-center justify-center shrink-0 text-[#517b27]">
                <MapPin size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-[#2b3a1a] mb-1">Address</h4>
                <p className="text-gray-500 max-w-[200px] leading-relaxed">
                  123, Industrial Area, Raipur,<br/>
                  Chhattisgarh, India - 492001
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] relative flex items-center justify-center z-20 px-8 mt-16 lg:mt-0">
          <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 relative">
            
            {/* Form Fields */}
            <form className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Your Name</label>
                <input type="text" placeholder="Enter your name" className="w-full bg-[#fafdf5] border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#648b37] focus:ring-1 focus:ring-[#648b37] transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" placeholder="Enter your email" className="w-full bg-[#fafdf5] border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#648b37] focus:ring-1 focus:ring-[#648b37] transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Subject</label>
                <input type="text" placeholder="Enter subject" className="w-full bg-[#fafdf5] border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#648b37] focus:ring-1 focus:ring-[#648b37] transition-all text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={4} placeholder="Type your message here..." className="w-full bg-[#fafdf5] border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#648b37] focus:ring-1 focus:ring-[#648b37] transition-all text-sm resize-none"></textarea>
              </div>
              
              <button type="button" className="w-full bg-[#32451f] hover:bg-[#253216] text-white py-4 rounded-lg text-[13px] font-bold tracking-widest transition-all shadow-md mt-2">
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
