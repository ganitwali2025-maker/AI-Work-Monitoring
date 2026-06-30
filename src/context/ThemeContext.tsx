import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'colorful' | 'dual';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('colorful');

  useEffect(() => {
    // Check if user has a preference saved in localStorage
    const savedTheme = localStorage.getItem('app-theme-mode') as ThemeMode;
    if (savedTheme && (savedTheme === 'colorful' || savedTheme === 'dual')) {
      setThemeMode(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setThemeMode(prev => {
      const newMode = prev === 'dual' ? 'colorful' : 'dual';
      localStorage.setItem('app-theme-mode', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
