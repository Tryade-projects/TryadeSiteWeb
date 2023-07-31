import React from 'react';
import Title from '../../components/Title/Title';
import Streamer from '../../components/Streamer/Streamer';
import Button from '../../components/Button/Button';

const StreamersPage = () => {
  return (
    <main className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Nos Streamers'
          shadowTitle='NETWORK'
        />
        <Button
          title='Devenir Streamer ?'
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
    </main>
  );
};

export default StreamersPage;
