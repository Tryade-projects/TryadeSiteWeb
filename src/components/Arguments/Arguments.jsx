import React from 'react';

/**
 *
 * @param {object} props
 * @param {string} props.iconPath - Path to the icon image
 * @param {string} props.iconAlt - Alt text for the icon image
 * @param {string} props.title - Title of the argument
 * @param {string=} props.description - Description of the argument optional
 * @returns {JSX.Element}
 */
export default function Arguments({ iconPath, iconAlt, title, description }) {
  return (
    <div className='arguments'>
      <img
        src={iconPath}
        alt={iconAlt}
        className='argumentsIcon'
      />
      <div className='argumentsTextContainer'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
