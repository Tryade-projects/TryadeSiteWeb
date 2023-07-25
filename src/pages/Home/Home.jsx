import React from 'react';
import Arguments from '../../components/Arguments/Arguments';

export default function Home() {
  return (
    <>
      <div className='homeBackground' />
      <main className='home'>
        <h1>Home</h1>
        <Arguments
          iconPath='./assets/argumentStats.svg'
          iconAlt='Stats icon'
          title='Performances optimisées'
          description='Nous avons optimisé au maximum nos ressources pour les plus petites configurations.'
        />
      </main>
    </>
  );
}
