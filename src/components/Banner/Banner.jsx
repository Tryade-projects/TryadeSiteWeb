import React from 'react';

/**
 *
 * @param {object} props
 * @param {string} props.url - Url of the banner
 * @param {Date=} props.date - Date of the section
 * @param {string=} props.version - Version of the section (only for updates)
 * @param {string=} props.updateTitle - Title of the section (only for updates)
 * @returns  {JSX.Element} - Rendered Banner component
 */
const Banner = ({ url, date, version, updateTitle }) => {
  return (
    <div className='banner'>
      <div
        className='imageBackground'
        style={{
          backgroundImage: `url(${url})`,
        }}>
        <div className='bannerTextContainer'>
          {(version && <h3 className='bannerVersion'>{version}</h3>) ||
            (date && (
              <h3 className='bannerDate'>
                {new Date(date).toLocaleDateString()}
              </h3>
            ))}
        </div>
        {version && (
          <div className='bannerTextContainer'>
            {updateTitle && <h2 className='bannerTitle'>{updateTitle}</h2>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
