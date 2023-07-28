import React from 'react';

/**
 *
 * @param {object} props

 * @param {string} props.title - The title of the button
 * @param {string} props.borderColorClass - The border color class of the button
 * @param {string=} props.src - The src of the button logo - optional
 * @param {string=} props.alt - The alt of the button logo - optional
 * @param {string=} props.imgClassName - The class of the button logo - optional
 * @returns  {JSX.Element} - The button
 */
const Button = ({ title, borderColorClass, src, alt, imgClassName }) => {
  return (
    <button
      type='button'
      className={`button ${borderColorClass}`}>
      {src && (
        <img
          src={src}
          alt={alt}
          className={imgClassName}
        />
      )}
      <p className='buttonTitle'>{title}</p>
    </button>
  );
};

export default Button;
