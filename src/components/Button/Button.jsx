import React from 'react';

/**
 *
 * @param {object} props
 * @param {number} props.width - The width of the button
 * @param {number} props.height - The height of the button
 * @param {string} props.title - The title of the button
 * @param {string} props.borderColorClass - The border color class of the button
 * @param {string=} props.src - The src of the button logo - optional
 * @returns  {JSX.Element} - The button
 */
const Button = ({ width, height, title, borderColorClass, src }) => {
  return (
    <button
      type='button'
      className={`button ${borderColorClass}`}
      style={{
        width: `clamp(160px, ${width}px, 216px)`,
        height: `${height}px`,
      }}>
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
