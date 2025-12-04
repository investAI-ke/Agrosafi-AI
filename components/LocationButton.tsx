
import React from 'react';
import { LocationStatus } from '../types';
import LocationIcon from './icons/LocationIcon';
import SpinnerIcon from './icons/SpinnerIcon';
import WarningIcon from './icons/WarningIcon';

interface LocationButtonProps {
  status: LocationStatus;
  onClick: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ status, onClick }) => {
  const isDisabled = status === 'fetching' || status === 'success';

  const content = {
    idle: {
      text: 'Get My Location',
      icon: <LocationIcon />,
      style: 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-blue-500',
    },
    fetching: {
      text: 'Fetching...',
      icon: <SpinnerIcon />,
      style: 'bg-gray-700 border-gray-600 cursor-wait',
    },
    success: {
      text: 'Location Set',
      icon: <LocationIcon />,
      style: 'bg-green-800 border-green-600 text-green-300 cursor-not-allowed',
    },
    error: {
      text: 'Retry Location',
      icon: <WarningIcon />,
      style: 'bg-red-800 border-red-600 text-red-300 hover:bg-red-700',
    },
  };

  const current = content[status];

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-4 py-2 border rounded-full text-sm flex items-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600 ${current.style}`}
    >
      {current.icon}
      <span>{current.text}</span>
    </button>
  );
};

export default LocationButton;