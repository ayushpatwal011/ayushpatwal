import React from 'react';
import Icon from './Icon';

const Footer = ({ title, location, locationIcon = "MapPin" }) => {
  return (
    <footer className='flex flex-wrap justify-between items-center px-4 border-t border-t-gray-200 pt-4 pb-6 mt-8 text-gray-600 gap-2'>
      <p className='text-sm font-medium'>{title}</p>
      {location && (
        <p className='text-sm font-medium flex items-center gap-1.5 text-gray-500'>
          <Icon name={locationIcon} className="w-3.5 h-3.5 text-gray-400" />
          <span>{location}</span>
        </p>
      )}
    </footer>
  );
};

export default Footer;