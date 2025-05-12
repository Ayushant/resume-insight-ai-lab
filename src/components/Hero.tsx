
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-16 px-4 md:py-24 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
        <span className="text-gray-900 dark:text-white">Smart Resume </span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Analyzer</span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        AI-powered resume feedback in seconds. Optimize your resume, land more interviews.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={scrollToUpload}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-6 text-lg"
        >
          Analyze My Resume
        </Button>
        
        <Button 
          variant="outline" 
          className="rounded-xl border-gray-300 dark:border-gray-600 px-8 py-6 text-lg"
        >
          View Demo
        </Button>
      </div>
      
      <div className="mt-16 animate-bounce-sm">
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
