'use client';

import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('orange');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'orange';
    setTheme(savedTheme);
    if (savedTheme === 'copper') {
      document.documentElement.setAttribute('data-theme', 'copper');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'orange' ? 'copper' : 'orange';
    setTheme(newTheme);

    if (newTheme === 'copper') {
      document.documentElement.setAttribute('data-theme', 'copper');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    localStorage.setItem('theme', newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="p-2 text-white opacity-50">
        <Palette className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
      title={`Switch to ${theme === 'orange' ? 'Copper' : 'Orange'} Theme`}
    >
      <Palette className="h-5 w-5" />
      <span className="text-xs font-semibold hidden xl:inline">
        {theme === 'orange' ? 'Try Copper' : 'Orange'}
      </span>
    </button>
  );
}
