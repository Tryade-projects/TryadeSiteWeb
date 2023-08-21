import React from 'react';

const Streamer = ({ login, thumbnail, BackGround, viewerCount, follower, link }) => {
  return (
    <article className='streamer'>
      <a href={`https://www.twitch.tv/${link}`}>
        <div
          className='imageBackground streamerImageBackground'
          style={{ backgroundImage: `url(${BackGround})` }}
        >
          <div className="opacityDiv"></div>
        </div>
        <div className='streamerInfo'>
          <img
            className='streamerAvatar'
            src={thumbnail}
            alt='streamer avatar'
          />
          <div className='streamerDetails'>
            <div className='streamerName'>{login}</div>
            <div className='streamerFollowers'>{follower} Followers</div>
          </div>
        </div>
        <div className='spectators'>
          <div className='spectatorsContent'>
            <div className='point'></div>
            <p className='spectatorsContentText'>{viewerCount} Spectateurs</p>
          </div>
        </div>
      </a>
    </article>
  );
};

export default Streamer;
