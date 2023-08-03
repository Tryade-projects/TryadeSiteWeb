import React from 'react';
import RoundLogo from '../RoundLogo/RoundLogo'
import Button from '../Button/Button';

/**
 * 
 * @param {object} props
 * 
 * @param {string} props.src - The src of the svg for the RoundLogo component
 * @param {string} props.backgroundColorClass - The class to choose the background-color for RoundLogo component - The class is in _roundLogo.scss
 * @param {string} props.alternatifText - The "alt" of the SVg
 * @param {string} networkTitle - The title of the container
 * @param {string} networkLink - The text under the title
 * 
 * @returns {JSX:Element} - NetworkContainer
 */

const NetworkContainer = ({ src, backgroundColorClass,alternatifText, networkTitle, networkLink }) => {
  return (
    <article className='networkContainer'>
      <RoundLogo
        imageSrc={src}
        backgroundColorClass={backgroundColorClass}
        alt={alternatifText}
      />
      <div className='networkInfos'>
        <h3 className='networkTitle'>{networkTitle}</h3>
        <h3 className='networkLink'>{networkLink}</h3>
        <Button title='Visiter' />
      </div>
    </article>
  );
};

export default NetworkContainer;
