import React from 'react';
import SettingsIcon from './icons/SettingsIcon';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="py-6 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex-1"></div> {/* Spacer */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-center flex-1">
          AI Photo Model Prompt Generator
        </h1>
        <div className="flex-1 flex justify-end">
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Open settings"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;