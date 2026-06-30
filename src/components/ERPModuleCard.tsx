import { LucideIcon, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { useThemeContext } from '../context/ThemeContext';

interface Props {
  key?: any;
  name: string;
  icon: LucideIcon;
  desc?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant: 'crm' | 'procurement' | 'inventory' | 'logistics' | 'production' | 'finance' | 'hr' | 'director' | 'vendor-master' | 'marketing' | 'dashboard' | 'laboratory' | 'sales';
  isInner?: boolean;
  badge?: string;
  badgeColorClass?: string;
}

export default function ERPModuleCard({ 
  name, 
  icon: Icon, 
  desc, 
  onClick, 
  onMouseEnter, 
  onMouseLeave, 
  variant, 
  isInner = true, 
  badge, 
  badgeColorClass,
  index = 0,
  shouldAnimate = true
}: Props & { index?: number, shouldAnimate?: boolean }) {
  
  const { themeMode } = useThemeContext();

  const getTheme = (v: string) => {
    if (themeMode === 'dual') {
      const isGreenTheme = ['marketing', 'procurement', 'inventory', 'production', 'hr', 'laboratory'].includes(v);
      if (isGreenTheme) {
        return {
          gradient: 'from-[#e0e8cf]', iconBg: 'bg-[#eef2e6]', iconColor: 'text-[#6a7c41]',
          borderColor: 'border-[#d3e0b8]', badgeBg: 'bg-[#e0e8cf]', badgeText: 'text-[#5a6a35]',
          glow: 'hover:shadow-[0_0_20px_rgba(106,124,65,0.4)]'
        };
      } else {
        return {
          gradient: 'from-[#fce6d7]', iconBg: 'bg-[#fdf3ec]', iconColor: 'text-[#b8673b]',
          borderColor: 'border-[#f7d6c1]', badgeBg: 'bg-[#fce6d7]', badgeText: 'text-[#9c5329]',
          glow: 'hover:shadow-[0_0_20px_rgba(184,103,59,0.4)]'
        };
      }
    }

    // Colorful mode
    switch (v) {
      case 'crm': return {
        gradient: 'from-purple-100', iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
        borderColor: 'border-purple-300', badgeBg: 'bg-purple-100', badgeText: 'text-purple-700',
        glow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]'
      };
      case 'marketing': return {
        gradient: 'from-red-100', iconBg: 'bg-red-50', iconColor: 'text-red-600',
        borderColor: 'border-red-300', badgeBg: 'bg-red-100', badgeText: 'text-red-700',
        glow: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.45)]'
      };
      case 'sales': return {
        gradient: 'from-blue-100', iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
        borderColor: 'border-blue-300', badgeBg: 'bg-blue-100', badgeText: 'text-blue-700',
        glow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.45)]'
      };
      case 'procurement': return {
        gradient: 'from-amber-100', iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
        borderColor: 'border-amber-300', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700',
        glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.45)]'
      };
      case 'inventory': return {
        gradient: 'from-emerald-100', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
        borderColor: 'border-emerald-300', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700',
        glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.45)]'
      };
      case 'logistics': return {
        gradient: 'from-indigo-100', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
        borderColor: 'border-indigo-300', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700',
        glow: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]'
      };
      case 'production': return {
        gradient: 'from-sky-100', iconBg: 'bg-sky-50', iconColor: 'text-sky-600',
        borderColor: 'border-sky-300', badgeBg: 'bg-sky-100', badgeText: 'text-sky-700',
        glow: 'hover:shadow-[0_0_25px_rgba(14,165,233,0.45)]'
      };
      case 'finance': return {
        gradient: 'from-teal-100', iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
        borderColor: 'border-teal-300', badgeBg: 'bg-teal-100', badgeText: 'text-teal-700',
        glow: 'hover:shadow-[0_0_25px_rgba(20,184,166,0.45)]'
      };
      case 'hr': return {
        gradient: 'from-rose-100', iconBg: 'bg-rose-50', iconColor: 'text-rose-600',
        borderColor: 'border-rose-300', badgeBg: 'bg-rose-100', badgeText: 'text-rose-700',
        glow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.45)]'
      };
      case 'director': return {
        gradient: 'from-fuchsia-100', iconBg: 'bg-fuchsia-50', iconColor: 'text-fuchsia-600',
        borderColor: 'border-fuchsia-300', badgeBg: 'bg-fuchsia-100', badgeText: 'text-fuchsia-700',
        glow: 'hover:shadow-[0_0_25px_rgba(217,70,239,0.45)]'
      };
      case 'vendor-master': return {
        gradient: 'from-violet-100', iconBg: 'bg-violet-50', iconColor: 'text-violet-600',
        borderColor: 'border-violet-300', badgeBg: 'bg-violet-100', badgeText: 'text-violet-700',
        glow: 'hover:shadow-[0_0_25px_rgba(139,92,246,0.45)]'
      };
      case 'laboratory': return {
        gradient: 'from-cyan-100', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600',
        borderColor: 'border-cyan-300', badgeBg: 'bg-cyan-100', badgeText: 'text-cyan-700',
        glow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.45)]'
      };
      default: return {
        gradient: 'from-gray-100', iconBg: 'bg-gray-50', iconColor: 'text-gray-600',
        borderColor: 'border-gray-300', badgeBg: 'bg-gray-100', badgeText: 'text-gray-700',
        glow: 'hover:shadow-[0_0_25px_rgba(156,163,175,0.45)]'
      };
    }
  };

  const theme = getTheme(variant);

  return (
    <motion.div 
      initial={shouldAnimate ? { opacity: 0, rotateY: 90, scale: 0.8 } : false}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ 
        delay: index * 0.08,
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      }}
      className="group relative h-full cursor-pointer font-serif"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Desktop/Tablet View */}
      <div className={`relative z-10 h-full min-h-[220px] hidden md:flex flex-col justify-between p-6 rounded-[16px] border ${theme.borderColor} bg-white shadow-sm ${theme.glow} transition-all duration-300 overflow-hidden`}>
        {/* Top Right Curved Background Swoosh */}
        <div className={`absolute top-0 right-0 w-[55%] h-[60%] bg-gradient-to-bl ${theme.gradient} to-transparent opacity-60 rounded-bl-[100%] pointer-events-none transition-all duration-500 group-hover:opacity-80 group-hover:scale-105 origin-top-right`} />

        <div className="relative z-10">
          {/* Top Icon Container */}
          <div className={`inline-flex items-center justify-center shrink-0 w-[52px] h-[52px] mb-4 rounded-full ${theme.iconBg} ${theme.iconColor} transition-transform duration-500 group-hover:scale-110`}>
            <Icon size={24} strokeWidth={2} className="transition-transform duration-700 group-hover:rotate-[360deg]" />
          </div>

          {/* Text Content */}
          <div>
             <h3 className="text-[17px] leading-snug font-bold mb-1.5 text-[#113a1a]">
               {name}
             </h3>
             <p className="text-[13px] text-gray-500 leading-relaxed pr-2 font-medium">
               {desc || `Access module functionalities for ${name}...`}
             </p>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-5 flex items-end justify-between relative z-10 w-full">
          {/* Badge */}
          {badge ? (
            <div className={`flex items-center text-[11px] font-bold tracking-wide rounded-[4px] px-2.5 py-1 ${theme.badgeBg} ${theme.badgeText}`}>
              {badge}
            </div>
          ) : (
            <div className="text-[11px] font-medium text-gray-400">MODULE</div>
          )}
          
          {/* Access Link */}
          <button className={`flex items-center gap-1.5 text-[13px] font-bold transition-all duration-300 ${theme.iconColor} group-hover:translate-x-1`}>
             Access <span>→</span>
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className={`relative z-10 h-[120px] flex md:hidden flex-col justify-between items-start p-3 sm:p-4 rounded-[20px] border ${theme.borderColor} shadow-sm ${theme.glow} transition-all active:scale-95 bg-white overflow-hidden`}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-2 ${theme.iconBg} ${theme.iconColor}`}>
          <Icon size={16} />
        </div>
        
        <div className="w-full">
          <div className="flex items-start gap-1">
            <h4 className="text-[11px] font-bold text-[#113a1a] leading-tight line-clamp-3 w-full pr-2 break-words text-left">{name}</h4>
          </div>
          {badge && (
            <span className={`inline-block mt-1 text-[9px] font-bold tracking-wider rounded px-1.5 py-0.5 ${theme.badgeBg} ${theme.badgeText}`}>
              {badge}
            </span>
          )}
        </div>

        <div className={`absolute bottom-2.5 right-2.5 ${theme.iconColor}`}>
           <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
           </svg>
        </div>
      </div>
    </motion.div>
  );
}
