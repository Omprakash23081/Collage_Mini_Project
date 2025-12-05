import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = true, text = "Loading..." }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-b-purple-500 rounded-full animate-spin-reverse"></div>
            </div>
          </div>
          <p className="text-white font-medium animate-pulse">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
};

export default Loader;
