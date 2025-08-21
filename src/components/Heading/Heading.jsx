import React from 'react';

const Heading = ({ variant = 'default', size, children, weight = "default", className }) => {
  let headingStyle = '';
  let weightStyle = '';

  // Default styles based on heading variants
  switch (variant) {
    case 'thirtyTwo':
      headingStyle = 'text-black md:text-[32px] text-[24px]';
      break;
    case 'xxl':
      headingStyle = 'text-black text-xl md:text-2xl';
      break;
    case 'xl':
      headingStyle = 'text-black md:text-xl text-lg';
      break;
    case 'lg':
      headingStyle = 'text-black md:text-lg text-sm';
      break;
    case 'bs':
      headingStyle = 'text-black text-base';
      break;
    case 'sm':
      headingStyle = 'text-black text-sm';
      break;
    default:
      headingStyle = 'text-black text-[40px]';
      break;
  }

  switch (weight) {
    case 'medium':
      weightStyle = 'font-medium';
      break;
    case 'normal':
      weightStyle = 'font-normal';
      break;
    case 'semibold':
      weightStyle = 'font-semibold';
      break;
    default:
      weightStyle = 'font-semibold';
      break;
  }

  // Override default styles if size and weight props are provided
  if (size) {
    headingStyle += ` text-${size}`;
  }
  if (weight) {
    weightStyle += ` font-${weight}`;
  }

  // Ensure the Tag is always a valid HTML tag
  const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'];
  const Tag = validTags.includes(variant) ? variant : 'h3'; // Fallback to 'h1' if variant is invalid

  return <Tag className={`${headingStyle} ${weightStyle} ${className}`}>{children || 'Heading'}</Tag>;
};

export default Heading;