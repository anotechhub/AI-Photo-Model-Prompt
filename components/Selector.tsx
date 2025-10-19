
import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectorProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const Selector: React.FC<SelectorProps> = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-400">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="w-full p-2.5 bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
   