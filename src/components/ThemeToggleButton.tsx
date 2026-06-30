import React from 'react';
import { Palette } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';
import { motion } from 'motion/react';

export default function ThemeToggleButton({ className, iconSize = 16 }: { className?: string, iconSize?: number }) {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={className || "p-2 bg-white hover:bg-[#f5f8f0] border border-gray-100 rounded-full text-slate-500 hover:text-[#4a6b22] transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(74,107,34,0.15)] relative"}
      title={`Switch to ${themeMode === 'dual' ? 'Colorful' : 'Dual'} Theme`}
    >
      <Palette size={iconSize} strokeWidth={2.2} />
      
      {/* Small indicator dot */}
      <div className={`absolute top-0 right-0 w-1.5 h-1.5 rounded-full ${themeMode === 'colorful' ? 'bg-fuchsia-500' : 'bg-green-500'}`} />
    </button>
  );
}
