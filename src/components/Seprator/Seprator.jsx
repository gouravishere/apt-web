import React from 'react';

const Seprator = ({ variant, className }) => {
  let separatorClass;

  switch (variant) {
    case 'line':
      separatorClass = 'border-t-2 border-black my-4'; // Horizontal line with black border
      break;
    case 'text':
      separatorClass = 'text-center font-bold text-lg text-gray-700'; // Centered text with bold and large font
      break;
    case 'dotted':
      separatorClass = 'border-dashed border-b border-neutral-300 my-4'; // Dotted line
      break;
    case 'yellow':
      separatorClass = 'border border-b border-primary-500 my-4'; // Dotted line
      break;
    case 'yellow-dotted':
      separatorClass = 'border-dashed border-b-2 border-primary-500 my-4'; // Dotted line
      break;
    default:
      separatorClass = 'w-full h-[0px] border border-neutral-400'; // Default text
      break;
  }

  return <div className={`${separatorClass} ${className} w-full`}>{variant === 'text' ? 'Separator' : ''}</div>;
};

export default Seprator;
