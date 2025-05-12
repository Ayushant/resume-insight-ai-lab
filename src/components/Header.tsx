
import React from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <Logo />
      <ThemeToggle />
    </header>
  );
};

export default Header;
