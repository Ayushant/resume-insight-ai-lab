
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Analysis from '@/components/Analysis';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/hooks/useTheme';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Analysis />
          <Features />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
