import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Arguments from '../../components/Arguments/Arguments';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import NetworkContainer from '../../components/NetworkContainer/NetworkContainer';
import Update from '../../components/Update/Update';
import Gameplay from '../../components/Gameplay/Gameplay';
import Streamer from '../../components/Streamer/Streamer';
import { Link } from 'react-router-dom';
import { fetchUpdatesSections } from '../../queries/fetchAPI';
import { replaceWidthAndHeigthInUrl } from '../../utils/replaceWidthAndHeigthInUrl';

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
    queryFn: fetchUpdatesSections,
  });
  const handleButtonClick = (goTo) => {
    if (goTo.current) {
      const goToRect = goTo.current.getBoundingClientRect();
      const offset = goToRect.top + window.scrollY - headerHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  //Const for Twitch
  const [accessToken, setAccessToken] = useState('');
  const [streamerData, setStreamerData] = useState(null);
  const [streamersId, setStreamersId] = useState([]);
  const [streamersViewerData, setStreamersViewerData] = useState([]);
  const [streamerFollowersData, setStreamerFollowersData] = useState([]);




  /****************** */

  /*Get the token*/
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: 'me7uty9lt3c4rxuw35in9bk6sbj0wk',
            client_secret: '1kw5m42db7kprxhkihnbta83hrzcch',
            grant_type: 'client_credentials'
          }).toString()
        });

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching Twitch token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  /*Get the streamer*/
  useEffect(() => {
    const fetchStreamersData = async () => {

      if (!accessToken) {
        return '';
      }

      try {
        const response = await fetch('https://api.twitch.tv/helix/users?login=sebjdg&login=gobgg&login=avamind&login=otplol_&login=sixentv&login=thecamstutz', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Client-Id': 'me7uty9lt3c4rxuw35in9bk6sbj0wk'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStreamerData(data);
      } catch (error) {
        console.error('Error fetching Twitch user data:', error);
      }
    };
    fetchStreamersData();
  }, [accessToken])

  //Create a array streamerValidData with the id and login
  useEffect(() => {
    if (streamerData) {
      const streamersId = streamerData.data.map(streamer => ({ id: streamer.id }));
      setStreamersId(streamersId);
    }
  }, [streamerData]);

  //Get the number of followers for each streamer
  useEffect(() => {
    const fetchAndGetFollower = async () => {
      if (!accessToken || !streamersId.length) {
        return;
      }
  
      const followersPromises = streamersId.map(async streamer => {
        try {
          const response = await fetch(`https://api.twitch.tv/helix/users/follows?to_id=${streamer.id}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Client-Id': 'me7uty9lt3c4rxuw35in9bk6sbj0wk'
            }
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          const numberOfFollowers = data.total;
  
          return {
            id: streamer.id,
            numberOfFollowers: numberOfFollowers
          };
        } catch (error) {
          console.error('Error fetching Twitch follower data:', error);
          return {
            id: streamer.id,
            numberOfFollowers: 0
          };
        }
      });
  
      const followersData = await Promise.all(followersPromises);
      setStreamerFollowersData(followersData);
    };
  
    fetchAndGetFollower();
  }, [accessToken, streamersId]);

  //Get more informations about each streamer (viewer watching)
  useEffect(() => {
    const fetchAndGetDetailsStreamer = async () => {
      if (!accessToken) {
        return;
      }

      const userIDs = streamersId.map(streamer => streamer.id).join('&user_id=');
      try {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userIDs}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Client-Id': 'me7uty9lt3c4rxuw35in9bk6sbj0wk'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const updatedStreamersData = streamersId.map(streamer => {
          const detailsStreamer = data.data.find(item => item.user_id === streamer.id);
          const viewerCount = detailsStreamer ? detailsStreamer.viewer_count : 0;
          const onlineBackground = detailsStreamer ? replaceWidthAndHeigthInUrl(detailsStreamer.thumbnail_url, '700', '500') : '';


          return {
            ...streamer,
            viewer_count: viewerCount,
            onlineBackground: onlineBackground
          };
        });

        setStreamersViewerData(updatedStreamersData);
      } catch (error) {
        console.error('Error fetching Twitch user data:', error);
      }
    };

    fetchAndGetDetailsStreamer();
  }, [accessToken, streamersId]);


  /****************** */






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
          <div className='streamercontainer'>
            {streamerData && streamerData.data.map(streamer => (
              <Streamer
                key={streamer.id}
                login={streamer.display_name}
                thumbnail={streamer.profile_image_url}
                BackGround={streamersViewerData.find(item => item.id === streamer.id)?.onlineBackground || streamer.offline_image_url}
                viewerCount={streamersViewerData.find(item => item.id === streamer.id)?.viewer_count || 0}
                follower={streamerFollowersData.find(item => item.id === streamer.id)?.numberOfFollowers || 0}
              />
            ))}
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
            buttonTitle='joeur'
            iconAlt="Icone d'une manette de jeu"
          />
        </section>

        <section className='networkSection page'>
          <Title
            mainTitle='Nos réseaux'
            shadowTitle='NETWORK'
          />
          <div className='articleContainer'>
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
