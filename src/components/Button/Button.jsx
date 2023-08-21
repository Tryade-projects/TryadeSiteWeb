import React from 'react';

/**
 *
 * @param {object} props
 * @param {string=} props.type - The type of the button
 * @param {string} props.title - The title of the button
 * @param {string=} props.src - The src of the button logo - optional
 * @param {string=} props.alt - The alt of the button logo - optional
 * @param {string=} props.imgClassName - The class of the button logo - optional
 * @param {function=} props.onClick - The function to execute when the button is clicked - optional
 * @returns  {JSX.Element} - The button
 */
const Button = ({
  type = 'button',
  title,
  src,
  alt,
  imgClassName,
  onClick,
}) => {
  return (
    <button
      type={type}
      className='button'
      onClick={
        onClick ? () => onClick() : () => console.log('No function to execute')
      }>
      {src && (
        <img
          src={src}
          alt={alt}
          className={imgClassName}
        />
      )}
      <p>{title}</p>
    </button>
  );
};

export default Button;
