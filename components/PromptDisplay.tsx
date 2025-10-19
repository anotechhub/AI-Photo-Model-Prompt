import React, { useState, useRef, useEffect } from 'react';

interface PromptDisplayProps {
  prompt: string;
}

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Mengubah ukuran tinggi textarea secara otomatis berdasarkan konten
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleCopy = () => {
    if (textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 p-6 relative">
      <h3 className="text-xl font-semibold mb-4 text-indigo-400">Generated Prompt</h3>
      <textarea
        ref={textAreaRef}
        readOnly
        value={prompt}
        className="w-full bg-slate-700/50 p-4 rounded-lg text-gray-300 leading-relaxed resize-none border-none focus:ring-0"
        rows={3}
      />
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Copy prompt"
      >
        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default PromptDisplay;