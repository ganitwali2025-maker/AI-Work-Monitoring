import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

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

const variantGradients: Record<Props['variant'], string> = {
  crm: 'from-purple-400 to-purple-600',
  procurement: 'from-amber-400 to-amber-600',
  inventory: 'from-emerald-400 to-emerald-600',
  logistics: 'from-indigo-400 to-indigo-600',
  production: 'from-sky-500 to-blue-600',
  finance: 'from-teal-400 to-teal-600',
  hr: 'from-rose-400 to-rose-600',
  director: 'from-violet-500 to-fuchsia-600',
  'vendor-master': 'from-[#2F3FBF] to-[#5B6FFF]',
  marketing: 'from-fuchsia-400 to-pink-600',
  dashboard: 'from-[#ff5a7d] to-[#ff8e53]',
  laboratory: 'from-[#06B6D4] to-[#0891B2]',
  sales: 'from-blue-500 to-blue-700',
};

const variantBgColors: Record<Props['variant'], string> = {
  crm: 'bg-purple-100',
  procurement: 'bg-amber-100',
  inventory: 'bg-emerald-100',
  logistics: 'bg-indigo-100',
  production: 'bg-sky-100',
  finance: 'bg-teal-100',
  hr: 'bg-rose-100',
  director: 'bg-violet-100',
  'vendor-master': 'bg-[#EAEDFF]',
  marketing: 'bg-fuchsia-100',
  dashboard: 'bg-rose-100',
  laboratory: 'bg-cyan-100',
  sales: 'bg-blue-100',
};

const variantIconColors: Record<Props['variant'], string> = {
  crm: 'text-purple-600',
  procurement: 'text-amber-700',
  inventory: 'text-emerald-600',
  logistics: 'text-indigo-600',
  production: 'text-sky-600',
  finance: 'text-teal-700',
  hr: 'text-rose-600',
  director: 'text-violet-600',
  'vendor-master': 'text-[#2F3FBF]',
  marketing: 'text-fuchsia-600',
  dashboard: 'text-rose-600',
  laboratory: 'text-cyan-600',
  sales: 'text-blue-600',
};

const innerIconBgs: Record<Props['variant'], string> = {
  crm: 'bg-purple-50/70 group-hover:bg-purple-100',
  procurement: 'bg-amber-50/70 group-hover:bg-amber-100',
  inventory: 'bg-emerald-50/70 group-hover:bg-emerald-100',
  logistics: 'bg-indigo-50/70 group-hover:bg-indigo-100',
  production: 'bg-sky-50/70 group-hover:bg-sky-100',
  finance: 'bg-teal-50/70 group-hover:bg-teal-100',
  hr: 'bg-rose-50/70 group-hover:bg-rose-100',
  director: 'bg-violet-50/70 group-hover:bg-violet-100',
  'vendor-master': 'bg-[#EAEDFF]/60 group-hover:bg-[#EAEDFF]',
  marketing: 'bg-fuchsia-50/70 group-hover:bg-fuchsia-100',
  dashboard: 'bg-rose-50/70 group-hover:bg-rose-100',
  laboratory: 'bg-cyan-50/70 group-hover:bg-cyan-100',
  sales: 'bg-blue-50/70 group-hover:bg-blue-100',
};

const innerIconColors: Record<Props['variant'], string> = {
  crm: 'text-purple-500 group-hover:text-purple-600',
  procurement: 'text-amber-600 group-hover:text-amber-700',
  inventory: 'text-emerald-500 group-hover:text-emerald-600',
  logistics: 'text-indigo-500 group-hover:text-indigo-600',
  production: 'text-sky-500 group-hover:text-sky-600',
  finance: 'text-teal-600 group-hover:text-teal-700',
  hr: 'text-rose-500 group-hover:text-rose-600',
  director: 'text-violet-500 group-hover:text-violet-600',
  'vendor-master': 'text-[#2F3FBF]/80 group-hover:text-[#2F3FBF]',
  marketing: 'text-fuchsia-500 group-hover:text-fuchsia-600',
  dashboard: 'text-rose-500 group-hover:text-rose-600',
  laboratory: 'text-cyan-500 group-hover:text-cyan-600',
  sales: 'text-blue-500 group-hover:text-blue-600',
};

const variantCardBgs: Record<Props['variant'], string> = {
  crm: 'bg-white',
  procurement: 'bg-white',
  inventory: 'bg-white',
  logistics: 'bg-white',
  production: 'bg-white',
  finance: 'bg-white',
  hr: 'bg-white',
  director: 'bg-white',
  'vendor-master': 'bg-white',
  marketing: 'bg-white',
  dashboard: 'bg-white',
  laboratory: 'bg-white',
  sales: 'bg-white',
};

const innerCardBgs: Record<Props['variant'], string> = {
  crm: 'bg-white',
  procurement: 'bg-white',
  inventory: 'bg-white',
  logistics: 'bg-white',
  production: 'bg-white',
  finance: 'bg-white',
  hr: 'bg-white',
  director: 'bg-white',
  'vendor-master': 'bg-white',
  marketing: 'bg-white',
  dashboard: 'bg-white',
  laboratory: 'bg-white',
  sales: 'bg-white',
};

const variantHoverShadows: Record<Props['variant'], string> = {
  crm: 'group-hover:shadow-[0_8px_30px_rgba(168,85,247,0.3)]',
  procurement: 'group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.3)]',
  inventory: 'group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)]',
  logistics: 'group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.3)]',
  production: 'group-hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)]',
  finance: 'group-hover:shadow-[0_8px_30px_rgba(20,184,166,0.3)]',
  hr: 'group-hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)]',
  director: 'group-hover:shadow-[0_8px_30px_rgba(139,92,246,0.3)]',
  'vendor-master': 'group-hover:shadow-[0_8px_30px_rgba(47,63,191,0.3)]',
  marketing: 'group-hover:shadow-[0_8px_30px_rgba(217,70,239,0.3)]',
  dashboard: 'group-hover:shadow-[0_8px_30px_rgba(255,90,125,0.3)]',
  laboratory: 'group-hover:shadow-[0_8px_30px_rgba(6,182,212,0.3)]',
  sales: 'group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)]',
};

const variantHoverTextColors: Record<Props['variant'], string> = {
  crm: 'group-hover:text-purple-700',
  procurement: 'group-hover:text-amber-700',
  inventory: 'group-hover:text-emerald-700',
  logistics: 'group-hover:text-indigo-700',
  production: 'group-hover:text-sky-700',
  finance: 'group-hover:text-teal-700',
  hr: 'group-hover:text-rose-700',
  director: 'group-hover:text-violet-700',
  'vendor-master': 'group-hover:text-[#2F3FBF]',
  marketing: 'group-hover:text-fuchsia-700',
  dashboard: 'group-hover:text-rose-700',
  laboratory: 'group-hover:text-cyan-700',
  sales: 'group-hover:text-blue-700',
};

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
  const gradient = variantGradients[variant];
  const bgColor = isInner ? innerIconBgs[variant] : variantBgColors[variant];
  const iconColor = isInner ? innerIconColors[variant] : variantIconColors[variant];
  const cardBg = isInner ? innerCardBgs[variant] : variantCardBgs[variant];
  const hoverTextColor = variantHoverTextColors[variant];
  const hoverShadow = variantHoverShadows[variant];

  const iconContainerClass = `${bgColor} ${iconColor}`;

  return (
    <motion.div 
      initial={shouldAnimate ? { opacity: 0, rotateY: 90, scale: 0.8 } : false}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ 
        delay: index * 0.08,
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      }}
      className="group relative h-full rounded-2xl p-[1px] cursor-pointer"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Sharp Border Gradient Glow Layer */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      
      <div className={`relative z-10 h-full flex flex-col justify-between p-6 rounded-[15px] border-none transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${cardBg} ${hoverShadow}`}>
        <div className={`inline-block w-fit p-3 rounded-xl ${iconContainerClass} mb-4 transition-all duration-300 group-hover:scale-115 group-hover:rotate-3 shadow-sm`}>
          <Icon size={24} />
        </div>
        
        <div>
           <h3 className={`font-serif text-lg font-semibold text-gray-950 mb-2 transition-colors duration-300 ${hoverTextColor}`}>
             {name}
           </h3>
           <p className="text-sm text-gray-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
             {desc || `Access module functionalities for ${name}...`}
           </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          {badge ? (
            <span className={`text-[10px] font-bold tracking-wider rounded px-2.5 py-1 border shadow-xs ${badgeColorClass || 'bg-gray-50 text-gray-400 border-gray-150'}`}>
              {badge}
            </span>
          ) : (
            <span className="text-xs font-medium text-gray-400">MODULE</span>
          )}
          <button className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${hoverTextColor}`}>
             Access <span>→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
