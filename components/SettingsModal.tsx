import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, apiKey, setApiKey }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 relative">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-gray-200">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close settings"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="api-key" className="block mb-2 text-sm font-medium text-gray-400">
              Your Gemini API Key
            </label>
            <input
              type="password"
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API Key"
              className="w-full p-2.5 bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-2 text-xs text-gray-500">
              Your key is saved locally in your browser's storage and is not sent to our servers. By default, the application uses a built-in key for demonstration purposes.
            </p>
          </div>
        </div>
        <div className="flex justify-end p-6 bg-slate-800/50 border-t border-slate-700 rounded-b-2xl">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;