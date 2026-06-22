import React, { useState } from 'react';
import { 
  Menu, 
  ArrowLeft, 
  Search, 
  Bell, 
  Settings,
  Palette
} from 'lucide-react';

interface SidebarLink {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface Props {
  departmentName: string;
  onBack: () => void;
  sidebarLinks: SidebarLink[];
  children: React.ReactNode;
  variant?: 'crm' | 'procurement' | 'inventory' | 'logistics' | 'production' | 'finance' | 'hr' | 'director' | 'vendor-master' | 'marketing' | 'laboratory';
  activeModule?: string | null;
}

const premiumThemes: Record<string, {
  subtitle: string;
  headerGradient: string;
  sidebarGradient: string;
  activeBg: string;
  accent: string;
  textMuted: string;
}> = {
  crm: {
    subtitle: 'Customer Relationship & Sales System',
    headerGradient: 'from-[#9333EA] to-[#7E22CE]',
    sidebarGradient: 'from-[#7E22CE] to-[#581C87]',
    activeBg: 'bg-[#9333EA] shadow-[0_0_15px_rgba(147,51,234,0.4)]',
    accent: '#9333EA',
    textMuted: 'text-purple-100',
  },
  sales: {
    subtitle: 'Sales Pipeline & Revenue Management',
    headerGradient: 'from-[#3B82F6] to-[#1D4ED8]',
    sidebarGradient: 'from-[#1D4ED8] to-[#1E3A8A]',
    activeBg: 'bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    accent: '#3B82F6',
    textMuted: 'text-blue-100',
  },
  procurement: {
    subtitle: 'Purchase & Procurement Management System',
    headerGradient: 'from-[#F59E0B] to-[#D97706]',
    sidebarGradient: 'from-[#D97706] to-[#B45309]',
    activeBg: 'bg-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    accent: '#F59E0B',
    textMuted: 'text-amber-100',
  },
  'vendor-master': {
    subtitle: 'Vendor Management & Compliance System',
    headerGradient: 'from-[#5B6FFF] to-[#4055D8]',
    sidebarGradient: 'from-[#4055D8] to-[#2F3FBF]',
    activeBg: 'bg-[#5B6FFF] shadow-[0_0_15px_rgba(91,111,255,0.4)]',
    accent: '#5B6FFF',
    textMuted: 'text-blue-100',
  },
  inventory: {
    subtitle: 'Warehouse & Stock Control System',
    headerGradient: 'from-[#10B981] to-[#047857]',
    sidebarGradient: 'from-[#047857] to-[#065F46]',
    activeBg: 'bg-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    accent: '#10B981',
    textMuted: 'text-emerald-100',
  },
  logistics: {
    subtitle: 'Logistics, Transport & Dispatch Tracking',
    headerGradient: 'from-[#6366F1] to-[#4338CA]',
    sidebarGradient: 'from-[#4338CA] to-[#3730A3]',
    activeBg: 'bg-[#6366F1] shadow-[0_0_15px_rgba(99,102,241,0.4)]',
    accent: '#6366F1',
    textMuted: 'text-indigo-100',
  },
  production: {
    subtitle: 'Manufacturing, Quality & Finished Goods Management',
    headerGradient: 'from-[#0EA5E9] to-[#0369A1]',
    sidebarGradient: 'from-[#0369A1] to-[#075985]',
    activeBg: 'bg-[#0EA5E9] shadow-[0_0_15px_rgba(14,165,233,0.4)]',
    accent: '#0EA5E9',
    textMuted: 'text-sky-100',
  },
  finance: {
    subtitle: 'Finance, Accounts, GST & Billing Management',
    headerGradient: 'from-[#14B8A6] to-[#0F766E]',
    sidebarGradient: 'from-[#0F766E] to-[#115E59]',
    activeBg: 'bg-[#14B8A6] shadow-[0_0_15px_rgba(20,184,166,0.4)]',
    accent: '#14B8A6',
    textMuted: 'text-teal-100',
  },
  hr: {
    subtitle: 'HR, Payroll, Attendance & Employee Management',
    headerGradient: 'from-[#F43F5E] to-[#BE123C]',
    sidebarGradient: 'from-[#BE123C] to-[#9F1239]',
    activeBg: 'bg-[#F43F5E] shadow-[0_0_15px_rgba(244,63,94,0.4)]',
    accent: '#F43F5E',
    textMuted: 'text-rose-100',
  },
  director: {
    subtitle: 'Director Control Center & Strategic Monitoring',
    headerGradient: 'from-[#D946EF] to-[#A21CAF]',
    sidebarGradient: 'from-[#A21CAF] to-[#86198F]',
    activeBg: 'bg-[#D946EF] shadow-[0_0_15px_rgba(217,70,239,0.4)]',
    accent: '#D946EF',
    textMuted: 'text-fuchsia-100',
  },
  marketing: {
    subtitle: 'Marketing Performance & Lead Generation Center',
    headerGradient: 'from-[#C026D3] to-[#86198F]',
    sidebarGradient: 'from-[#A21CAF] to-[#4A044E]',
    activeBg: 'bg-[#E879F9] shadow-[0_0_15px_rgba(232,121,249,0.4)]',
    accent: '#E879F9',
    textMuted: 'text-fuchsia-100',
  },
  laboratory: {
    subtitle: 'LIMS & Quality Control Management',
    headerGradient: 'from-[#06B6D4] to-[#0891B2]',
    sidebarGradient: 'from-[#0891B2] to-[#164E63]',
    activeBg: 'bg-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    accent: '#22D3EE',
    textMuted: 'text-cyan-100',
  }
};

import { useEffect as UseEffectAlias } from 'react';

export default function Layout({ departmentName, onBack, sidebarLinks, children, variant = 'inventory', activeModule }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuName, setActiveMenuName] = useState(sidebarLinks[0]?.name || '');
  const [appTheme, setAppTheme] = useState<'glass' | 'colorful'>(() => {
    return (localStorage.getItem('appTheme') as 'glass' | 'colorful') || 'glass';
  });

  React.useEffect(() => {
    localStorage.setItem('appTheme', appTheme);
  }, [appTheme]);

  React.useEffect(() => {
    if (activeModule !== undefined) {
      if (activeModule === null) {
        setActiveMenuName(sidebarLinks[0]?.name || '');
      } else {
        setActiveMenuName(activeModule);
      }
    }
  }, [activeModule, sidebarLinks]);

  // Resolve theme dynamically
  const theme = premiumThemes[variant] || premiumThemes.inventory;

  // Dynamically group links into standard enterprise sections
  const getLinkSection = (linkName: string): string => {
    const name = linkName.toLowerCase();
    
    if (name.includes('action center') || name.includes('engine') || name.includes('critic') || name.includes('intel') || name.includes('ceo command')) {
      return 'AI INTELLIGENCE';
    }
    if (name.includes('settings') || name.includes('setup') || name.includes('config')) {
      return 'SYSTEM';
    }
    if (name.includes('analytics') || name.includes('reports') || name.includes('performance') || name.includes('valuation') || name.includes('abc')) {
      return 'ANALYTICS';
    }
    if (name.includes('gst') || name.includes('tax') || name.includes('bank') || name.includes('document') || name.includes('compliance') || name.includes('approval') || name.includes('inspect') || name.includes('quality') || name.includes('verify') || name.includes('verification')) {
      return 'COMPLIANCE';
    }
    if (name.includes('dashboard') || name.includes('registration') || name.includes('profile') || name.includes('info') || name.includes('person') || name.includes('customer') || name.includes('item') || name.includes('onboard') || name.includes('master')) {
      return 'MASTER DATA';
    }
    return 'PROCUREMENT';
  };

  const sectionHeadings = ['MASTER DATA', 'COMPLIANCE', 'PROCUREMENT', 'AI INTELLIGENCE', 'ANALYTICS', 'SYSTEM'];
  
  const groupedSections = sectionHeadings.map(title => {
    const links = sidebarLinks.filter(link => getLinkSection(link.name) === title);
    return { title, links };
  }).filter(sec => sec.links.length > 0);

  return (
    <div className="flex flex-col h-screen bg-[#f8f9f8] text-gray-950 font-sans overflow-hidden relative">
      {/* Background Animated VFX */}
      {appTheme === 'glass' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-[#d4f0b3]/40 to-[#e6f0d5]/20 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-gradient-to-tl from-[#e6f0d5]/50 to-[#d4f0b3]/20 rounded-full blur-[120px] animate-[pulse_12s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute top-[20%] left-[60%] w-[30%] h-[30%] bg-gradient-to-tr from-[#d4f0b3]/30 to-[#f2f7ec]/20 rounded-full blur-[90px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        </div>
      )}
      
      {/* Header */}
      <div className={`shrink-0 h-[80px] ${appTheme === 'colorful' ? `bg-gradient-to-r ${theme.headerGradient} text-white border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.1)]` : 'bg-gradient-to-r from-[#eaf4d9] to-[#f4f8ee] text-[#1e3314] border-b border-[#dbebc0] shadow-sm'} z-50 flex items-center justify-between px-6 transition-all duration-300 relative overflow-hidden`}>
        {appTheme === 'glass' && (
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#dbebc0] via-[#eaf4d9] to-[#dbebc0] bg-[length:200%_auto] animate-[pulse_6s_ease-in-out_infinite] opacity-40 pointer-events-none"></div>
        )}
        
        {/* Left section */}
        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className={`p-2 rounded-lg transition-colors cursor-pointer ${appTheme === 'colorful' ? 'hover:bg-white/20 text-white' : 'hover:bg-[#e6f0d5] text-[#2d4a22]'}`}
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col select-none">
            <h1 className={`font-serif text-lg sm:text-2xl font-bold tracking-tight leading-none uppercase ${appTheme === 'colorful' ? 'text-white' : 'text-[#2d4a22]'}`}>
              {departmentName}
            </h1>
            <span className={`text-[10px] font-medium font-sans mt-1 ${appTheme === 'colorful' ? theme.textMuted : 'text-[#4a6b22]'}`}>
              {theme.subtitle}
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <div className={`relative p-2 rounded-lg transition-colors cursor-pointer ${appTheme === 'colorful' ? 'text-white hover:bg-white/20' : 'text-[#4a6b22] hover:text-[#2d4a22] hover:bg-[#e6f0d5]'}`}>
            <Bell size={18} />
            <span className={`absolute top-1 right-1 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center font-sans ${appTheme === 'colorful' ? 'bg-white text-black' : 'bg-[#2d4a22] text-white'}`}>8</span>
          </div>

          <div className={`p-2 rounded-lg transition-colors cursor-pointer ${appTheme === 'colorful' ? 'text-white hover:bg-white/20' : 'text-[#4a6b22] hover:text-[#2d4a22] hover:bg-[#e6f0d5]'}`}>
            <Settings size={18} />
          </div>

          <button 
            onClick={onBack} 
            className={`px-7 py-2.5 font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 shrink-0 transition-all duration-300 cursor-pointer rounded-full ${appTheme === 'colorful' ? 'bg-white/20 text-white hover:bg-white/30 shadow-md hover:shadow-lg border border-white/20' : 'bg-[#6e8a42] hover:bg-[#5a7333] text-white shadow-sm'}`}
          >
            <ArrowLeft size={16} /> Back To Dashboard
          </button>
        </div>
      </div>

      {/* Sidebar & Main */}
      <div className="flex flex-1 min-h-0 w-full relative z-10">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-[280px]' : 'w-22'} ${appTheme === 'colorful' ? `bg-gradient-to-b ${theme.sidebarGradient} text-white border-r border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.1)]` : 'bg-gradient-to-b from-[#eaf4d9] to-[#f4f8ee] border-r border-[#dbebc0] shadow-[4px_0_24px_rgba(45,74,34,0.05)]'} transition-all duration-300 h-full flex flex-col justify-between py-5 overflow-hidden z-20 shrink-0`}>
          {/* Scrollable menu part */}
          <div className="flex-1 overflow-y-auto px-4 space-y-5 select-none scrollbar-none pb-4">
            {groupedSections.map((section, secIndex) => (
              <div 
                key={section.title} 
                className="space-y-1.5 animate-in fade-in slide-in-from-left-4" 
                style={{ animationFillMode: 'both', animationDelay: `${secIndex * 100}ms` }}
              >
                {isSidebarOpen && (
                  <h4 className={`px-3 text-xs uppercase tracking-wider font-extrabold font-sans opacity-80 ${appTheme === 'colorful' ? theme.textMuted : 'text-[#4a6b22]'}`}>
                    {section.title}
                  </h4>
                )}
                <div className="space-y-0.5">
                  {section.links.map((link) => {
                    const isActive = link.name === activeMenuName;
                    return (
                      <button 
                        key={link.name} 
                        onClick={() => {
                          setActiveMenuName(link.name);
                          link.onClick();
                        }}
                        className={`flex items-center h-[38px] w-full px-3 py-2 transition-all duration-300 text-sm whitespace-nowrap rounded-xl relative z-10 group cursor-pointer ${
                          isActive 
                            ? (appTheme === 'colorful' ? `${theme.activeBg} text-white font-extrabold translate-x-1` : 'bg-gradient-to-r from-[#e6f0d5] to-transparent border border-white/60 text-[#2d4a22] font-extrabold shadow-[0_2px_10px_rgba(0,0,0,0.03)] translate-x-1')
                            : (appTheme === 'colorful' ? 'text-white/70 hover:text-white hover:bg-white/10 font-semibold hover:translate-x-1 hover:shadow-sm' : 'text-[#4a6b22] hover:text-[#2d4a22] hover:bg-white/60 font-semibold hover:translate-x-1 hover:shadow-sm')
                        }`}
                        title={isSidebarOpen ? undefined : link.name}
                      >
                        {/* Left Green Accent Line */}
                        {isActive && (
                          <div className={`absolute left-0 top-1.5 bottom-1.5 w-[4px] rounded-r-md ${appTheme === 'colorful' ? 'bg-white shadow-[2px_0_8px_rgba(255,255,255,0.5)]' : 'bg-gradient-to-b from-[#4a6b22] to-[#2d4a22] shadow-[2px_0_8px_rgba(45,74,34,0.3)]'}`} />
                        )}

                        <div className="flex items-center gap-3 w-full">
                          <span className={`transition-all duration-200 ${isActive ? (appTheme === 'colorful' ? 'text-white scale-110' : 'text-[#2d4a22] scale-110') : (appTheme === 'colorful' ? 'text-white/70 group-hover:text-white group-hover:scale-110' : 'text-[#4a6b22] group-hover:text-[#2d4a22] group-hover:scale-110')} shrink-0`}>
                            {link.icon || <div className="w-5 h-5 flex items-center justify-center">●</div>}
                          </span>
                          {isSidebarOpen && (
                            <span className="font-sans pl-0.5 tracking-wide text-sm">
                              {link.name}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM SIDEBAR AREA */}
          <div className={`px-4 pt-3 border-t flex flex-col gap-3 relative select-none ${appTheme === 'colorful' ? 'border-white/10' : 'border-[#e6f0d5]'}`}>
            <div className="flex items-center justify-between select-none">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-semibold cursor-pointer group ${appTheme === 'colorful' ? 'text-white/70 hover:text-white hover:bg-white/10' : 'hover:bg-[#e6f0d5] text-[#4a6b22] hover:text-[#2d4a22]'}`}
                title="Collapse Sidebar"
              >
                <span className="transform transition-transform duration-300 shrink-0 group-hover:-translate-x-1">
                  {isSidebarOpen ? '◀' : '▶'}
                </span>
                {isSidebarOpen && <span className="font-sans">Collapse Sidebar</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className={`flex-1 p-8 ${appTheme === 'colorful' ? 'bg-[#f8f9f8]' : 'bg-white'} min-w-0 overflow-y-auto scroll-smooth animate-in fade-in slide-in-from-bottom-4 duration-500`}>
          {children}
        </main>
      </div>
    </div>
  );
}
