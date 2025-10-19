import React, { useState, useCallback } from 'react';
import { POSE_STYLES, LIGHTING_STYLES, ASPECT_RATIOS } from './constants';
import { generatePrompt } from './services/geminiService';
import Header from './components/Header';
import Selector from './components/Selector';
import PromptDisplay from './components/PromptDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [pose, setPose] = useState<string>(POSE_STYLES[0].value);
  const [lighting, setLighting] = useState<string>(LIGHTING_STYLES[0].value);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0].value);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGeneratePrompt = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      // Tidak lagi melewatkan API key, service akan menggunakan environment variable
      const prompt = await generatePrompt(pose, lighting, aspectRatio);
      setGeneratedPrompt(prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [pose, lighting, aspectRatio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-500/10 p-6 md:p-10 border border-slate-700">
          <p className="text-lg text-gray-400 mb-8 text-center">
            Select your desired options below to generate a unique and detailed prompt for your next AI photo model.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Selector
              label="Pose Style"
              value={pose}
              onChange={(e) => setPose(e.target.value)}
              options={POSE_STYLES}
            />
            <Selector
              label="Lighting Style"
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              options={LIGHTING_STYLES}
            />
            <Selector
              label="Aspect Ratio"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              options={ASPECT_RATIOS}
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleGeneratePrompt}
              disabled={isLoading}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner />
                  <span className="ml-2">Generating...</span>
                </div>
              ) : (
                'Generate Prompt'
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {generatedPrompt && (
          <div className="mt-8">
            <PromptDisplay prompt={generatedPrompt} />
          </div>
        )}
      </main>
      
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;