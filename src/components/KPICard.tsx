import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface KPICardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  colorTheme?: 'blue' | 'pink' | 'purple' | 'green' | 'emerald' | 'indigo' | 'cyan' | 'red' | 'orange' | 'violet' | 'teal' | 'amber' | 'rose' | 'sky';
  status?: 'Pending' | 'Active' | 'In Progress' | 'Completed' | 'Attention' | 'Top Performer' | 'Excellent' | 'Running';
  trendDirection?: 'up' | 'down' | 'neutral';
  progress?: number; // 0 to 100 for the bottom border
}

export default function KPICard({
  title,
  value,
  trend,
  icon: Icon,
  colorTheme = 'blue',
  status = 'Active',
  trendDirection = 'up',
  progress = 50
}: KPICardProps) {
  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', gradient: 'from-blue-500 to-blue-400' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-600', gradient: 'from-pink-500 to-pink-400' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', gradient: 'from-purple-500 to-purple-400' },
    green: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600', gradient: 'from-green-500 to-green-400' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', gradient: 'from-emerald-500 to-emerald-400' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600', gradient: 'from-indigo-500 to-indigo-400' },
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-600', gradient: 'from-cyan-500 to-cyan-400' },
    red: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', gradient: 'from-red-500 to-red-400' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600', gradient: 'from-orange-500 to-orange-400' },
    violet: { bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-600', gradient: 'from-violet-500 to-violet-400' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-100', text: 'text-teal-600', gradient: 'from-teal-500 to-teal-400' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', gradient: 'from-amber-500 to-amber-400' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-600', gradient: 'from-rose-500 to-rose-400' },
    sky: { bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-600', gradient: 'from-sky-500 to-sky-400' },
  };

  const statusMap = {
    'Pending': 'bg-purple-50/80 text-purple-600 border-purple-200/50',
    'Active': 'bg-emerald-50/80 text-emerald-600 border-emerald-200/50',
    'In Progress': 'bg-orange-50/80 text-orange-600 border-orange-200/50',
    'Completed': 'bg-blue-50/80 text-blue-600 border-blue-200/50',
    'Attention': 'bg-red-50/80 text-red-600 border-red-200/50',
    'Top Performer': 'bg-pink-50/80 text-pink-600 border-pink-200/50',
    'Excellent': 'bg-purple-50/80 text-purple-600 border-purple-200/50',
    'Running': 'bg-emerald-50/80 text-emerald-600 border-emerald-200/50',
  };

  const theme = colorMap[colorTheme] || colorMap.blue;
  const statusStyle = statusMap[status] || statusMap.Active;

  return (
    <div className="relative overflow-hidden bg-white rounded-[22px] p-4 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 active:scale-95 group h-[160px] sm:h-[180px] font-sans">
      
      {/* Background Accent Graphic */}
      <div className={`absolute -bottom-4 -right-4 opacity-[0.07] pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${theme.text}`}>
        <Icon size={100} strokeWidth={1.5} />
      </div>

      <div className="flex justify-between items-start w-full relative z-10">
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-110 ${theme.bg} ${theme.border} ${theme.text}`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <div className={`px-2.5 py-1 rounded-full border text-[10px] font-bold shadow-sm backdrop-blur-md transition-all duration-300 ${statusStyle}`}>
          {status}
        </div>
      </div>

      <div className="mt-3 space-y-1 relative z-10 flex-grow flex flex-col justify-end pb-1">
        <h4 className="text-[10px] sm:text-[11px] font-extrabold text-gray-500 uppercase tracking-widest line-clamp-1">{title}</h4>
        <div className={`text-3xl sm:text-4xl font-black tracking-tighter ${theme.text}`}>
          {value}
        </div>
        <div className={`flex items-center gap-1 text-[11px] sm:text-xs font-bold pt-1 ${trendDirection === 'down' ? 'text-red-500' : 'text-emerald-500'}`}>
          {trendDirection === 'up' && <span>↑</span>}
          {trendDirection === 'down' && <span>↓</span>}
          <span>{trend}</span>
        </div>
      </div>

      {/* Bottom Accent Progress Line */}
      <div 
        className={`absolute bottom-0 left-0 h-[4px] bg-gradient-to-r ${theme.gradient} transition-all duration-1000 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
