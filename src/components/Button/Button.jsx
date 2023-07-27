import React from 'react';

/**
 *
 * @param {object} props

 * @param {string} props.title - The title of the button
 * @param {string} props.borderColorClass - The border color class of the button
 * @param {string=} props.src - The src of the button logo - optional
 * @returns  {JSX.Element} - The button
 */
const Button = ({ title, borderColorClass, src }) => {
  return (
    <button
      type='button'
      className={`button ${borderColorClass}`}>
      {src && (
        <img
          src={src}
          alt='button logo'
          className='buttonLogo'
        />
      )}
      <p className='buttonTitle'>{title}</p>
    </button>
  );
};

export default Button;
