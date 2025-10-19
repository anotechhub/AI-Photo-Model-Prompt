import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-center">
          AI Photo Model Prompt Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;