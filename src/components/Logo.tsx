
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl transform rotate-6"></div>
        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">R</span>
        </div>
      </div>
      <div className="font-bold text-xl">
        <span className="text-gray-900 dark:text-white">Smart</span>
        <span className="text-blue-600 dark:text-blue-400">Resume</span>
      </div>
    </div>
  );
};

export default Logo;
