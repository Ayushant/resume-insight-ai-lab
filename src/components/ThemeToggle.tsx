
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      className="rounded-full w-10 h-10 transition-all duration-300 ease-in-out"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
};

export default ThemeToggle;
