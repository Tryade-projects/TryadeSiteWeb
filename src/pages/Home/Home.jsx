import React, { useRef } from 'react';
import Arguments from '../../components/Arguments/Arguments';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import NetworkContainer from '../../components/NetworkContainer/NetworkContainer';
import Update from '../../components/Update/Update';
import Gameplay from '../../components/Gameplay/Gameplay';
import { Link } from 'react-router-dom';
import useStreamersSectionQuery from '../../hooks/useStreamersSectionQuery';
import useUpdatesSectionQuery from '../../hooks/useUpdatesSectionQuery';
import Streamer from '../../components/Streamer/Streamer';

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

  const {
    data: streamersData,
    status: streamersStatus,
    error: streamersError,
  } = useStreamersSectionQuery();

  const {
    data: updatesData,
    status: updatesStatus,
    error: updatesError,
  } = useUpdatesSectionQuery();

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
          <article className='article titleArticle'>
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
          <article className='article argumentsArticle'>
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
          className='streamerSection screenHeightWithoutHeader  page'>
          <div className='headerSection'>
            <Title
              mainTitle='Nos Streamers'
              shadowTitle='NETWORK'
            />
            <Link to='/streamers'>
              <Button title='Voir tous nos streamers' />
            </Link>
          </div>
          <div className='sectionWrap'>
            {streamersStatus === 'loading' ? (
              <p>Chargement en cours...</p>
            ) : streamersStatus === 'error' ? (
              <p>
                Erreur : Impossible de récupérer les données:{' '}
                {streamersError.message}
              </p>
            ) : (
              <>
                {streamersData?.pages[0].map((section) => (
                  <Streamer
                    key={section.id}
                    sectionData={section}
                  />
                ))}
              </>
            )}
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
          <div className='sectionWrap'>
            {updatesStatus === 'loading' ? (
              <p>Chargement en cours...</p>
            ) : updatesStatus === 'error' ? (
              <p>
                Erreur : Impossible de récupérer les données:{' '}
                {updatesError.message}
              </p>
            ) : (
              <>
                {updatesData?.pages[0].map((update) => (
                  <Update
                    key={update.id}
                    updateTitle={update.sectionTitle}
                    updateVersion={update.version}
                    updateText={update.details[0].content}
                    updateThumbnail={update.urlBanner}
                    updateId={update.id}
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
          <Gameplay
            gameplayImage='images/howToPlayNecessary.png'
            numberShadow='01'
            title='Nécéssités'
            text='Afin de jouer sur Tryade, vous devrez posséder une copie légale du jeu GTA V (Steam, Rockstar, Epic), ainsi qu’un ordinateur obligatoirement.'
            shortText='Achetez le jeu GTA V
            sur PC (Obligatoire)'
            buttonIcon='assets/buy.svg'
            buttonTitle='acheter'
            iconAlt="Icone d'un caddie d'achat"
          />
          <Gameplay
            gameplayImage='images/howToPlayInstallation.png'
            numberShadow='02'
            title='Installation'
            text='Une fois GTA V installé, vous devrez procéder à l’installation de FiveM qui est la plateforme permettant d’accéder à notre serveur.'
            shortText='Installez FiveM pour accéder au serveur.'
            buttonIcon='assets/download.svg'
            buttonTitle='télécharger'
            iconAlt="Icone d'un nuage avec une flèche"
          />
          <Gameplay
            gameplayImage='images/howToPlayConnexion.png'
            numberShadow='03'
            title='Connexion'
            text='Une fois FiveM installé, ouvrez le et appuyez sur jouer puis recherchez Tryade. En cas de problème contactez nous sur Discord'
            shortText='Ouvrez FiveM et recherchez “Tryade”'
            buttonIcon='assets/controller.svg'
            buttonTitle='jouer'
            iconAlt="Icone d'une manette de jeu"
          />
        </section>

        <section className='networkSection page'>
          <Title
            mainTitle='Nos réseaux'
            shadowTitle='NETWORK'
          />
          <div className='sectionWrap'>
            <NetworkContainer
              src='assets/twitter.svg'
              backgroundColorClass='backgroundColorClassSecondaryColor'
              alternatifText='Icone de Twitter'
              networkTitle='Twitter'
              networkLink='@TryadeRP'
            />
            <NetworkContainer
              src='assets/tiktok.svg'
              backgroundColorClass='backgroundColorClassSecondaryColor'
              alternatifText='Icone de Tiktok'
              networkTitle='Tiktok'
              networkLink='@tryaderp'
            />
            <NetworkContainer
              src='assets/youtube.svg'
              backgroundColorClass='backgroundColorClassSecondaryColor'
              alternatifText='Icone de Youtube'
              networkTitle='Youtube'
              networkLink='@TryadeRP'
            />
            <NetworkContainer
              src='assets/discordBlack.svg'
              backgroundColorClass='backgroundColorClassSecondaryColor'
              alternatifText='Icone de Discord'
              networkTitle='Discord'
              networkLink='Tryade - RolePlay'
            />
          </div>
        </section>
      </main>
    </>
  );
}
