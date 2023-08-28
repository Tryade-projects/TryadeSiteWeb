import React, { useState, useEffect } from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import useStreamersSectionQuery from '../../hooks/useStreamersSectionQuery';
import Streamer from '../../components/Streamer/Streamer';
import { replaceWidthAndHeigthInUrl } from '../../utils/replaceWidthAndHeigthInUrl';

const StreamersPage = () => {
  const [accessToken, setAccessToken] = useState('');
  const [streamersDataSections, setStreamersDataSections] = useState({
    pages: [],
  });

  // console.log({ streamersDataSections });

  const {
    data: mongoDBData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: mongoDBStatus,
  } = useStreamersSectionQuery();

  // console.log({ mongoDBData });

  // const { ref, inView } = useInView({
  //   threshold: 0,
  // });

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log('fetchAccessToken');
      try {
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: 'me7uty9lt3c4rxuw35in9bk6sbj0wk',
            client_secret: '1kw5m42db7kprxhkihnbta83hrzcch',
            grant_type: 'client_credentials',
          }).toString(),
        });

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching Twitch token:', error);
      }
    };
    fetchAccessToken();
  }, []);
  console.log(accessToken);

  /*Get the streamer*/
  useEffect(() => {
    const streamerNamesFromMongoDB =
      mongoDBStatus === 'success' && mongoDBData
        ? mongoDBData.pages
            .flatMap((page) => page)
            .map((streamer) => streamer.name.toLowerCase())
        : [];

    console.log({ streamerNamesFromMongoDB });

    const twitchAPIPart = streamerNamesFromMongoDB
      .map((name) => `login=${name}`)
      .join('&');

    const fetchStreamersData = async () => {
      console.log({ accessToken, twitchAPIPart });
      if (accessToken === '' || twitchAPIPart === '') {
        console.log('return');
        return;
      }

      try {
        const response = await fetch(
          `https://api.twitch.tv/helix/users?${twitchAPIPart}`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Client-Id': 'me7uty9lt3c4rxuw35in9bk6sbj0wk',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { data } = await response.json();
        console.log({ data });
        setStreamersDataSections((prevData) => {
          return {
            pages: [...prevData.pages, [...data]],
          };
        });
      } catch (error) {
        console.error('Error fetching Twitch user data:', error);
      }
    };

    fetchStreamersData();
    console.log('get the streamer');
  }, [accessToken]);

  //Get the number of followers for each streamer
  // useEffect(() => {
  //   const fetchAndGetFollower = async () => {
  //     if (!accessToken || !streamersId.length) {
  //       return;
  //     }

  //     const followersPromises = streamersId.map(async (streamer) => {
  //       try {
  //         const response = await fetch(
  //           `https://api.twitch.tv/helix/users/follows?to_id=${streamer.id}`,
  //           {
  //             method: 'GET',
  //             headers: {
  //               Authorization: 'Bearer ' + accessToken,
  //               'Client-Id': 'me7uty9lt3c4rxuw35in9bk6sbj0wk',
  //             },
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }

  //         const data = await response.json();
  //         const numberOfFollowers = data.total;

  //         return {
  //           id: streamer.id,
  //           numberOfFollowers: numberOfFollowers,
  //         };
  //       } catch (error) {
  //         console.error('Error fetching Twitch follower data:', error);
  //         return {
  //           id: streamer.id,
  //           numberOfFollowers: 0,
  //         };
  //       }
  //     });

  //     const followersData = await Promise.all(followersPromises);
  //     setStreamerFollowersData(followersData);
  //   };

  //   const fetchAndGetDetailsStreamer = async () => {
  //     if (!accessToken || !streamersId.length) {
  //       return;
  //     }

  //     const userIDs = streamersId
  //       .map((streamer) => streamer.id)
  //       .join('&user_id=');
  //     try {
  //       const response = await fetch(
  //         `https://api.twitch.tv/helix/streams?user_id=${userIDs}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: 'Bearer ' + accessToken,
  //             'Client-Id': 'me7uty9lt3c4rxuw35in9bk6sbj0wk',
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       const updatedStreamersData = streamersId.map((streamer) => {
  //         const detailsStreamer = data.data.find(
  //           (item) => item.user_id === streamer.id
  //         );
  //         const viewerCount = detailsStreamer
  //           ? detailsStreamer.viewer_count
  //           : 0;
  //         const onlineBackground = detailsStreamer
  //           ? replaceWidthAndHeigthInUrl(
  //               detailsStreamer.thumbnail_url,
  //               '700',
  //               '500'
  //             )
  //           : '';

  //         return {
  //           ...streamer,
  //           viewer_count: viewerCount,
  //           onlineBackground: onlineBackground,
  //         };
  //       });

  //       setStreamersViewerData(updatedStreamersData);
  //     } catch (error) {
  //       console.error('Error fetching Twitch user data:', error);
  //     }
  //   };

  //   fetchAndGetDetailsStreamer();

  //   fetchAndGetFollower();
  // }, [streamersId]);

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Nos Streamers'
          shadowTitle='NETWORK'
        />
        <Link to='/streamers'>
          <Button title='Devenir Streamer ?' />
        </Link>
      </div>
      {mongoDBStatus === 'loading' ? (
        <p>Chargement en cours...</p>
      ) : mongoDBStatus === 'error' ? (
        <p>Erreur : Impossible de récupérer les données.</p>
      ) : (
        <>
          {streamersDataSections?.pages.length > 0 &&
            streamersDataSections?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.map((streamer, streamerIndex) => (
                  <Streamer
                    key={streamer.id}
                    login={streamer.display_name}
                    thumbnail={streamer.profile_image_url}
                    // BackGround={
                    //   streamersViewerData.find((item) => item.id === streamer.id)
                    //     ?.onlineBackground || streamer.offline_image_url
                    // }
                    // viewerCount={
                    //   streamersViewerData.find((item) => item.id === streamer.id)
                    //     ?.viewer_count || 0
                    // }
                    // follower={
                    //   streamerFollowersData.find(
                    //     (item) => item.id === streamer.id
                    //   )?.numberOfFollowers || 0
                    // }
                    // link={streamer.display_name.toLowerCase()}
                  />
                ))}
              </React.Fragment>
            ))}
          {/* <div ref={ref}></div>
          {isFetchingNextPage && <div>Chargement...</div>} */}
        </>
      )}
    </main>
  );
};

export default StreamersPage;
