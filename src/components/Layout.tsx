import React, { useState } from 'react';
import { 
  Menu, 
  ArrowLeft, 
  Search, 
  Bell, 
  Settings
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
  noPadding?: boolean;
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
    headerGradient: 'from-[#A855F7] to-[#7E22CE]',
    sidebarGradient: 'from-[#7E22CE] to-[#6B21A8]',
    activeBg: 'bg-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    accent: '#A855F7',
    textMuted: 'text-purple-100',
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

export default function Layout({ departmentName, onBack, sidebarLinks, children, variant = 'inventory', activeModule, noPadding = false }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuName, setActiveMenuName] = useState(sidebarLinks[0]?.name || '');

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
    <div className="flex flex-col h-screen bg-[#F5F7FC] text-gray-950 font-sans overflow-hidden">
      {/* Header */}
      <div className={`shrink-0 h-[80px] bg-gradient-to-r ${theme.headerGradient} text-white border-b border-white/10 shadow-lg shadow-indigo-900/5 z-50 flex items-center justify-between px-6 transition-all duration-300`}>
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col select-none">
            <h1 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white leading-none uppercase">
              {departmentName}
            </h1>
            <span className={`text-[10px] ${theme.textMuted} font-sans mt-1`}>
              {theme.subtitle}
            </span>
          </div>
        </div>

        {/* Center section removed */}

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search bar removed */}

          {/* Notification bell */}
          <div className="relative p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center font-sans">8</span>
          </div>

          {/* Settings icon */}
          <div className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition cursor-pointer">
            <Settings size={18} />
          </div>

          {/* User profile removed */}

          {/* Back to Dashboard */}
          <button 
            onClick={onBack} 
            className="border border-white/50 text-white bg-white/20 rounded-lg px-4 py-2 hover:bg-white/30 font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] shrink-0 transition-all duration-300 cursor-pointer hover:border-white"
          >
            <ArrowLeft size={14} /> Back To Dashboard
          </button>
        </div>
      </div>

      {/* Sidebar & Main */}
      <div className="flex flex-1 min-h-0 w-full">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-[280px]' : 'w-22'} bg-gradient-to-b ${theme.sidebarGradient} border-r border-white/10 shadow-lg shadow-indigo-900/5 transition-all duration-300 h-full flex flex-col justify-between py-5 overflow-hidden z-20 shrink-0`}>
          {/* Scrollable menu part */}
          <div className="flex-1 overflow-y-auto px-4 space-y-5 select-none scrollbar-none pb-4">
            {groupedSections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                {isSidebarOpen && (
                  <h4 className={`px-3 text-xs uppercase tracking-wider font-extrabold ${theme.textMuted} font-sans opacity-80`}>
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
                        className={`flex items-center h-[38px] w-full px-3 py-2 transition-all duration-200 text-sm whitespace-nowrap rounded-lg relative z-10 group cursor-pointer ${
                          isActive 
                            ? `${theme.activeBg} text-white font-bold` 
                            : 'text-white/75 hover:text-white hover:bg-white/5 font-medium'
                        }`}
                        title={isSidebarOpen ? undefined : link.name}
                      >
                        {/* Left White Accent Line */}
                        {isActive && (
                          <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-white rounded-r-md" />
                        )}

                        <div className="flex items-center gap-3 w-full">
                          <span className={`transition-all duration-200 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'} shrink-0`}>
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
          <div className="px-4 pt-3 border-t border-white/10 flex flex-col gap-3 relative select-none">
            {/* Quick Help Card Removed */}

            {/* Floating Action Button + Collapse button */}
            <div className="flex items-center justify-between select-none">
              {/* Collapse button */}
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition duration-205 text-sm font-semibold cursor-pointer"
                title="Collapse Sidebar"
              >
                <span className="transform transition-transform duration-300 shrink-0">
                  {isSidebarOpen ? '◀' : '▶'}
                </span>
                {isSidebarOpen && <span className="font-sans">Collapse Sidebar</span>}
              </button>

              {/* Floating Action Button removed */}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className={`flex-1 bg-[#F5F7FC] min-w-0 overflow-y-auto scroll-smooth ${noPadding ? '' : 'p-8'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
