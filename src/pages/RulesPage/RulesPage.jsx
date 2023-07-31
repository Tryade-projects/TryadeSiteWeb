import React from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Banner from '../../components/Banner/Banner';

export default function RulesPage() {
  return (
    <main className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Règlement'
          shadowTitle='GAMEPLAY'
        />
        <Button
          title='Rejoindre l’équipe de modération'
          borderColorClass='primaryColorBorder'
        />
      </div>
      <section
        id='rules'
        className='sectionWrap'>
        <Banner imgBackground='/images/bannerDiscordRulesMobile.png' />
        <div className='sectionContent'>
          <h2 className='sectionTitle'>Règles du serveur</h2>
          <p className='sectionText'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nisl quis ultricies aliquet, nunc ipsum aliquam nunc, vitae
            aliquam nunc nisl quis nunc. Sed euismod,
          </p>
        </div>
      </section>
    </main>
  );
}
