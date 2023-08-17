import React from 'react';

/**
 *
 * @param {object} props
 * @param {object} props.sectionData - Data of the section
 * @returns  {JSX.Element} - Streamer component
 */
const Streamer = ({ sectionData }) => {
  return (
    <article className='streamer'>
      <div
        className='imageBackground streamerImageBackground'
        style={{ backgroundImage: `url(${sectionData.urlBackground})` }}></div>
      <div className='streamerInfo'>
        <img
          className='streamerAvatar'
          src={sectionData.urlImageAvatar}
          alt='streamer avatar'
        />

        <div className='streamerDetails'>
          <div className='streamerName'>{sectionData.name}</div>
          <div className='streamerFollowers'>
            {sectionData.nbOfFollowers} followers
          </div>
        </div>
      </div>
      <div className='spectators'>
        <div className='spectatorsContent'>
          <div className='point'></div>
          <p className='spectatorsContentText'>
            {sectionData.nbOfViewers} spectateurs
          </p>
        </div>
      </div>
    </article>
  );
};

export default Streamer;
