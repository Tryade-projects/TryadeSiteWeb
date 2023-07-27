import React from 'react';
import Arguments from '../../components/Arguments/Arguments';
import Title from '../../components/Title/Title';
import RoundLogo from '../../components/RoundLogo/RoundLogo';

export default function Home() {
  return (
    <>
      <div className='homeBackground' />
      <main className='home'>
        <Title
          mainTitle='Qu’attends-tu pour nous rejoindre ?'
          shadowTitle='DISCORD'
        />
        <Arguments
          iconPath='./assets/argumentStats.svg'
          iconAlt='Stats icon'
          title='Performances optimisées'
          description='Nous avons optimisé au maximum nos ressources pour les plus petites configurations.'
        />
        <RoundLogo
          imageSrc={'/assets/twitter.svg'}
          alt='Twitter'
          backgroundColorClass='backgroundColorClassSecondaryColor'
        />
      </main>
    </>
  );
}
