import React from 'react';

const Banner = ({ url }) => {
  return (
    <div className='banner'>
      <div
        className='imageBackground'
        style={{
          backgroundImage: `url(${url})`,
        }}></div>
    </div>
  );
};

export default Banner;
