import React from 'react';

/**
 *
 * @param {object} props
 * @param {string} props.mainTitle - The main title of the page
 * @param {string} props.shadowTitle - The decoration title behind the main title
 * @param {boolean=} props.big - If the title is big or not - optional
 * @returns {JSX.Element} - Title
 */

const Title = ({ mainTitle, shadowTitle, big }) => {
  return (
    <div className={big ? 'title titleBig' : 'title'}>
      <h1>{mainTitle}</h1>
      <div className='shadowTitle'>
        <h2>{shadowTitle}</h2>
        <img
          src={'./assets/multiplePoints.svg'}
          alt='Points de décoration'
        />
      </div>
      <hr />
    </div>
  );
};

export default Title;
