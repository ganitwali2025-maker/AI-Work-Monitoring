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

import { useThemeContext } from '../context/ThemeContext';

export const getPremiumTheme = (variant: string, themeMode: 'colorful' | 'dual') => {
  const isGreenTheme = ['marketing', 'procurement', 'inventory', 'production', 'hr', 'laboratory'].includes(variant);
  
  if (themeMode === 'dual') {
    if (isGreenTheme) {
      return {
        subtitle: 'Module Management System',
        headerGradient: 'from-[#8a9e59] to-[#6a7c41]',
        sidebarGradient: 'from-[#6a7c41] to-[#4c5c2d]',
        activeBg: 'bg-[#98af65] shadow-md border border-[#98af65]/50',
        accent: '#8a9e59',
        textMuted: 'text-[#e5edce]',
      };
    } else {
      return {
        subtitle: 'Module Management System',
        headerGradient: 'from-[#e09163] to-[#c2703f]',
        sidebarGradient: 'from-[#c2703f] to-[#9c5329]',
        activeBg: 'bg-[#ed9b6b] shadow-md border border-[#ed9b6b]/50',
        accent: '#e09163',
        textMuted: 'text-[#ffe8db]',
      };
    }
  }

  // Colorful Mode
  switch (variant) {
    case 'sales': return {
      subtitle: 'Sales & Revenue Management System',
      headerGradient: 'from-[#3B82F6] to-[#2563EB]',
      sidebarGradient: 'from-[#2563EB] to-[#1D4ED8]',
      activeBg: 'bg-[#3B82F6] shadow-md border border-[#3B82F6]/50',
      accent: '#3B82F6', textMuted: 'text-blue-100',
    };
    case 'procurement': return {
      subtitle: 'Purchase & Procurement Management System',
      headerGradient: 'from-[#F59E0B] to-[#D97706]',
      sidebarGradient: 'from-[#D97706] to-[#B45309]',
      activeBg: 'bg-[#F59E0B] shadow-md border border-[#F59E0B]/50',
      accent: '#F59E0B', textMuted: 'text-amber-100',
    };
    case 'vendor-master': return {
      subtitle: 'Vendor Management & Compliance System',
      headerGradient: 'from-[#5B6FFF] to-[#4055D8]',
      sidebarGradient: 'from-[#4055D8] to-[#2F3FBF]',
      activeBg: 'bg-[#5B6FFF] shadow-md border border-[#5B6FFF]/50',
      accent: '#5B6FFF', textMuted: 'text-blue-100',
    };
    case 'inventory': return {
      subtitle: 'Warehouse & Stock Control System',
      headerGradient: 'from-[#10B981] to-[#047857]',
      sidebarGradient: 'from-[#047857] to-[#065F46]',
      activeBg: 'bg-[#10B981] shadow-md border border-[#10B981]/50',
      accent: '#10B981', textMuted: 'text-emerald-100',
    };
    case 'logistics': return {
      subtitle: 'Logistics, Transport & Dispatch Tracking',
      headerGradient: 'from-[#6366F1] to-[#4338CA]',
      sidebarGradient: 'from-[#4338CA] to-[#3730A3]',
      activeBg: 'bg-[#6366F1] shadow-md border border-[#6366F1]/50',
      accent: '#6366F1', textMuted: 'text-indigo-100',
    };
    case 'production': return {
      subtitle: 'Manufacturing, Quality & Finished Goods Management',
      headerGradient: 'from-[#0EA5E9] to-[#0369A1]',
      sidebarGradient: 'from-[#0369A1] to-[#075985]',
      activeBg: 'bg-[#0EA5E9] shadow-md border border-[#0EA5E9]/50',
      accent: '#0EA5E9', textMuted: 'text-sky-100',
    };
    case 'finance': return {
      subtitle: 'Finance, Accounts, GST & Billing Management',
      headerGradient: 'from-[#14B8A6] to-[#0F766E]',
      sidebarGradient: 'from-[#0F766E] to-[#115E59]',
      activeBg: 'bg-[#14B8A6] shadow-md border border-[#14B8A6]/50',
      accent: '#14B8A6', textMuted: 'text-teal-100',
    };
    case 'hr': return {
      subtitle: 'HR, Payroll, Attendance & Employee Management',
      headerGradient: 'from-[#F43F5E] to-[#BE123C]',
      sidebarGradient: 'from-[#BE123C] to-[#9F1239]',
      activeBg: 'bg-[#F43F5E] shadow-md border border-[#F43F5E]/50',
      accent: '#F43F5E', textMuted: 'text-rose-100',
    };
    case 'director': return {
      subtitle: 'Director Control Center & Strategic Monitoring',
      headerGradient: 'from-[#D946EF] to-[#A21CAF]',
      sidebarGradient: 'from-[#A21CAF] to-[#86198F]',
      activeBg: 'bg-[#D946EF] shadow-md border border-[#D946EF]/50',
      accent: '#D946EF', textMuted: 'text-fuchsia-100',
    };
    case 'laboratory': return {
      subtitle: 'LIMS & Quality Control Management',
      headerGradient: 'from-[#06B6D4] to-[#0891B2]',
      sidebarGradient: 'from-[#0891B2] to-[#164E63]',
      activeBg: 'bg-[#22D3EE] shadow-md border border-[#22D3EE]/50',
      accent: '#22D3EE', textMuted: 'text-cyan-100',
    };
    case 'marketing': return {
      subtitle: 'Marketing Performance & Lead Generation Center',
      headerGradient: 'from-[#EF4444] to-[#B91C1C]',
      sidebarGradient: 'from-[#B91C1C] to-[#7F1D1D]',
      activeBg: 'bg-[#EF4444] shadow-md border border-[#EF4444]/50',
      accent: '#EF4444', textMuted: 'text-red-100',
    };
    case 'crm':
    default: return {
      subtitle: 'Customer Relationship & Sales System',
      headerGradient: 'from-[#8B5CF6] to-[#6D28D9]',
      sidebarGradient: 'from-[#6D28D9] to-[#4C1D95]',
      activeBg: 'bg-[#8B5CF6] shadow-md border border-[#8B5CF6]/50',
      accent: '#8B5CF6', textMuted: 'text-purple-100',
    };
  }
};

import { useEffect as UseEffectAlias } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

export default function Layout({ departmentName, onBack, sidebarLinks, children, variant = 'inventory', activeModule, noPadding = false }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [activeMenuName, setActiveMenuName] = useState(sidebarLinks[0]?.name || '');
  const { themeMode } = useThemeContext();

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
  const theme = getPremiumTheme(variant, themeMode);

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
    <div className="flex flex-col h-screen bg-white text-gray-950 font-sans overflow-hidden antialiased">
      {/* Header */}
      <div className={`shrink-0 h-[80px] bg-gradient-to-r ${theme.headerGradient} text-white border-b border-white/10 shadow-lg shadow-indigo-900/5 z-50 flex items-center justify-between px-4 sm:px-6 transition-all duration-300`}>
        {/* Left section */}
        <div className="flex items-center gap-2 sm:gap-4 max-w-[70%]">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col select-none overflow-hidden">
            <h1 className="font-serif text-sm sm:text-2xl font-bold tracking-tight text-white leading-none uppercase truncate">
              {departmentName}
            </h1>
            <span className={`text-[9px] sm:text-[10px] ${theme.textMuted} font-sans mt-1 truncate`}>
              {theme.subtitle}
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification bell */}
          <div className="relative p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center font-sans">8</span>
          </div>

          {/* Settings icon */}
          <div className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition cursor-pointer flex items-center">
            <Settings size={18} />
          </div>

          <ThemeToggleButton className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition cursor-pointer relative" iconSize={18} />

          {/* Back to Dashboard */}
          <button 
            onClick={onBack} 
            className="border border-white/50 text-white bg-white/20 rounded-lg px-3 py-2 sm:px-4 hover:bg-white/30 font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] shrink-0 transition-all duration-300 cursor-pointer hover:border-white"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back To Dashboard</span>
          </button>
        </div>
      </div>

      {/* Sidebar & Main */}
      <div className="flex flex-1 min-h-0 w-full relative">
        {/* Mobile backdrop overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed md:static inset-y-0 left-0 z-50 md:z-20 ${isSidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full md:translate-x-0 md:w-22'} bg-gradient-to-b ${theme.sidebarGradient} border-r border-white/10 shadow-lg shadow-indigo-900/5 transition-all duration-300 h-full flex flex-col justify-between py-5 overflow-hidden shrink-0`}>
          {/* Mobile Close Button */}
          <div className="flex justify-end px-4 mb-2 md:hidden">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="px-2.5 py-1 text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 rounded-md transition cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          {/* Scrollable menu part */}
          <div className="flex-1 overflow-y-auto px-4 space-y-5 select-none scrollbar-none pb-4">
            {groupedSections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                {(isSidebarOpen || window.innerWidth < 768) && (
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
                          if (window.innerWidth < 768) {
                            setIsSidebarOpen(false);
                          }
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
                          {(isSidebarOpen || window.innerWidth < 768) && (
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
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className={`flex-1 bg-[#F5F7FC] min-w-0 overflow-y-auto scroll-smooth ${noPadding ? 'pb-24 md:pb-0' : 'p-4 sm:p-8 pb-24 md:pb-8'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
