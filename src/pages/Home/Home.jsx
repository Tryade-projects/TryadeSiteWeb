import React from 'react';
import Arguments from '../../components/Arguments/Arguments';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import RoundLogo from '../../components/RoundLogo/RoundLogo';

export default function Home() {
  return (
    <>
      <div className='homeBackground' />
      <main className='home'>
        <section className='homeSection'>
          <article className='titleArticle'>
            <Title
              mainTitle='Qu’attends-tu pour nous rejoindre ?'
              shadowTitle='DISCORD'
              big
            />

            <p className='discordText'>
              Rejoins notre discord afin de bénéficier de toutes les
              informations importantes et commence ton aventure dès maintenant !
            </p>
            <Button
              title='DISCORD'
              borderColorClass='secondaryColorBorder'
              src={'./assets/discord.svg'}
              alt='Discord'
            />
          </article>
          <article className='argumentsArticle'>
            <Title
              mainTitle='Pourquoi nous?'
              shadowTitle='TRYADE'
            />

            <div className='argumentContainer'>
              <Arguments
                iconPath='./assets/argumentStats.svg'
                iconAlt='Stats icon'
                title='Performances optimisées'
                description='Nous avons optimisé au maximum nos ressources pour les plus petites configurations.'
              />
              <Arguments
                iconPath='./assets/argumentTask.svg'
                iconAlt='Task icon'
                title='Mises à jour régulières'
                description='Nous réalisons des mises à jour fréquemment en tenant compte des envies de la communauté'
              />
              <Arguments
                iconPath='./assets/argumentCreativity.svg'
                iconAlt='Creativity icon'
                title='Déployez toute votre créativité'
                description='Le serveur à été conçu de manière à permettre totalement l’épanouissement de votre créativité.'
              />
            </div>
            <p>Comment jouer ?</p>
          </article>
        </section>

        <section className='streamerSection'>
          <Title
            mainTitle='Nos Streamers'
            shadowTitle='NETWORK'
          />
          <Button
            title='Voir tous nos streamers'
            borderColorClass='primaryColorBorder'
          />
        </section>

        <section className='updateSection'>
          <Title
            mainTitle='Mises à jour'
            shadowTitle='DEVBLOG'
          />
          <Button
            title='Voir toutes nos mises à jour'
            borderColorClass='primaryColorBorder'
          />
        </section>

        <section className='gameplaySection'>
          <Title
            mainTitle='Comment jouer ?'
            shadowTitle='GAMEPLAY'
          />
        </section>

        <section className='networkSection'>
          <Title
            mainTitle='Nos réseaux'
            shadowTitle='NETWORK'
          />
          <article className='lighterBackgroundColor'>
            <RoundLogo
              imageSrc={'./assets/twitter.svg'}
              backgroundColorClass='backgroundColorClassSecondaryColor'
              alt='Twitter'
            />
            <div>
              <h3>Twitter</h3>
              <h3>@TryadeRP</h3>
              <Button
                title='Visiter'
                borderColorClass='primaryColorBorder'
              />
            </div>
          </article>
          <article></article>
          <article></article>
          <article></article>
        </section>
      </main>
    </>
  );
}
