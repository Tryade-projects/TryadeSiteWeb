import React from 'react';
import Title from '../../components/Title/Title';
import Streamer from '../../components/Streamer/Streamer';
import Button from '../../components/Button/Button';

const StreamersPage = () => {
  return (
    <div className='streamersPage page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Nos Streamers'
          shadowTitle='NETWORK'
        />
        <Button
          title='Voir tous nos streamers'
          borderColorClass='primaryColorBorder'
        />
      </div>
      <section
        id='streamers'
        className='sectionWrap'>
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
        <Streamer />
      </section>
    </div>
  );
};

export default StreamersPage;
