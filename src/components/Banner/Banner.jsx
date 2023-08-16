import React from 'react';

/**
 *
 * @param {object} props
 * @param {string} props.url - Url of the banner
 * @param {Date} props.date - Date of the section
 * @returns  {JSX.Element} - Rendered Banner component
 */
const Banner = ({ url, date }) => {
  return (
    <div className='banner'>
      <div
        className='imageBackground'
        style={{
          backgroundImage: `url(${url})`,
        }}>
        <div className='bannerTextContainer'>
          {new Date(date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Banner;
