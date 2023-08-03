import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Arguments from '../../components/Arguments/Arguments';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import RoundLogo from '../../components/RoundLogo/RoundLogo';
import Update from '../../components/Update/Update';
import { Link } from 'react-router-dom';
import { fetchUpdates } from '../../queries/fetchAPI';

const QUERY_KEY_UPDATE = ['update'];

/**
 * @typedef {React.RefObject<HTMLDivElement>} RefType
 */

/**
 * @typedef {object} Props
 * @property {boolean} ifMobile - If the screen is mobile or not
 * @returns {JSX.Element} - Home page
 */
export default function Home({ ifMobile }) {
  const headerHeight = ifMobile ? 123 : 107;
  /** @type {RefType} */
  const nextSectionRef = useRef(null);
  const howToPlaySectionRef = useRef(null);

  const { data, status } = useQuery({
    queryKey: QUERY_KEY_UPDATE,
    queryFn: fetchUpdates,
  });

  const handleButtonClick = (goTo) => {
    if (goTo.current) {
      const goToRect = goTo.current.getBoundingClientRect();
      const offset = goToRect.top + window.scrollY - headerHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };
  return (
    <>
      <div className='imageBackground homeBackground' />
      <main className='home'>
        <section className='homeSection screenHeightWithoutHeader page'>
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

            <button
              className='howToPlayButton'
              onClick={() => handleButtonClick(howToPlaySectionRef)}>
              Comment jouer ?
            </button>
          </article>
          <button
            className='goToTheNextSectionButton'
            onClick={() => handleButtonClick(nextSectionRef)}>
            <img
              src='./assets/crossBottom.svg'
              alt='cross bottom'
            />
            Faites défiler
          </button>
        </section>

        <section
          ref={nextSectionRef}
          className='streamerSection screenHeightWithoutHeader sectionWrap page'>
          <div className='headerSection'>
            <Title
              mainTitle='Nos Streamers'
              shadowTitle='NETWORK'
            />
            <Link to='/home/streamers'>
              <Button title='Voir tous nos streamers' />
            </Link>
          </div>
        </section>

        <section className='updateSection page'>
          <div className='headerSection'>
            <Title
              mainTitle='Mises à jour'
              shadowTitle='DEVBLOG'
            />
            <Link to='/home/updates'>
              <Button title='Voir toutes nos mises à jour' />
            </Link>
          </div>
          <div className='articleContainer'>
            {status === 'loading' ? (
              <p>Chargement en cours...</p>
            ) : status === 'error' ? (
              <p>Erreur : Impossible de récupérer les données.</p>
            ) : (
              <>
                {data
                  .sort((a, b) => b.id - a.id)
                  .slice(0, 3)
                  .map((update) => (
                    <Update
                      key={update.id}
                      updateTitle={update.sectionTitle}
                      updateVersion={update.version}
                      updateText={update.details[0].content}
                      updateThumbnail={update.urlBanner}
                    />
                  ))}
              </>
            )}
          </div>

        </section>

        <section
          ref={howToPlaySectionRef}
          className='gameplaySection page'>
          <Title
            mainTitle='Comment jouer ?'
            shadowTitle='GAMEPLAY'
          />
        </section>

        <section className='networkSection page'>
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
              <Button title='Visiter' />
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
