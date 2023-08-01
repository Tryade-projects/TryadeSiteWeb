import React from 'react';

/**
 * ListTitle component
 * @param {object} props
 * @param {string} props.textBackground - Text to display in the background
 * @param {string} props.colorLine - Color of the line
 * @param {string} props.title - Text to display
 * @param {string} props.text - Text to display
 * @returns  {JSX.Element} - Rendered ListTitle component
 */
const ListTitle = ({ textBackground, colorLine, title, text }) => {
  return (
    <>
      <div className='listTitle'>
        <p className='listTitleTextBackground'>{textBackground}</p>
        <div
          className='listTitleLine'
          style={{
            backgroundColor: `${colorLine}`,
          }}
        />
        <h2 className='listTitleText'>{title}</h2>
      </div>
      <p className='listText'>{text}</p>
    </>
  );
};

export default ListTitle;
