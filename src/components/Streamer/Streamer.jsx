import React from 'react';

const Streamer = () => {
  return (
    <article className='streamer'>
      <div
        className='streamerImageBackground'
        style={{ backgroundImage: `url(/images/streamer.jpg)` }}></div>
      <div className='streamerInfo'>
        <img
          className='streamerAvatar'
          src='/images/avatar.png'
          alt='streamer avatar'
        />

        <div className='streamerDetails'>
          <div className='streamerName'>Cristiano_CR7</div>
          <div className='streamerFollowers'>257 Followers</div>
        </div>
      </div>
      <div className='spectators'>
        <div className='spectatorsContent'>
          <div className='point'></div>
          <p className='spectatorsContentText'>46 Spectateurs</p>
        </div>
      </div>
    </article>
  );
};

export default Streamer;
