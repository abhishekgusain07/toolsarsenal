import type React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          isOn ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
        type="button"
      >
        <span className="sr-only">Toggle switch</span>
        <span
          className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
    </div>
  );
};

export default ToggleSwitch;