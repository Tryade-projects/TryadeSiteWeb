import React, { useState, useEffect } from 'react';
import { replaceWidthAndHeigthInUrl } from '../../utils/replaceWidthAndHeigthInUrl';
import Streamer from '../../components/Streamer/Streamer';
import useStreamersSectionQuery from '../../hooks/useStreamersSectionQuery';

const StreamerContainer = () => {

  const { data: mongoDBData, status: mongoDBStatus } = useStreamersSectionQuery();
  const streamerNamesFromMongoDB =
    mongoDBStatus === 'success' && mongoDBData
      ? mongoDBData.pages.flatMap(page => page).map(streamer => streamer.name.toLowerCase())
      : [];

  const twitchAPIPart = streamerNamesFromMongoDB.map(name => `login=${name}`).join('&');

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

  /*Get the streamer*/
  useEffect(() => {
    const fetchStreamersData = async () => {
      if (!accessToken) {
        return '';
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
        const data = await response.json();
        setStreamerData(data);
      } catch (error) {
        console.error('Error fetching Twitch user data:', error);
      }
    };
    fetchStreamersData();
  }, [accessToken]);

  //Create a array streamerValidData with the id and login
  useEffect(() => {
    if (streamerData) {
      const streamersId = streamerData.data.map((streamer) => ({
        id: streamer.id,
      }));
      setStreamersId(streamersId);
    }
  }, [streamerData]);

  //Get the number of followers for each streamer
  useEffect(() => {
    const fetchAndGetFollower = async () => {
      if (!accessToken || !streamersId.length) {
        return;
      }

      const followersPromises = streamersId.map(async (streamer) => {
        try {
          const response = await fetch(
            `https://api.twitch.tv/helix/users/follows?to_id=${streamer.id}`,
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

          const data = await response.json();
          const numberOfFollowers = data.total;

          return {
            id: streamer.id,
            numberOfFollowers: numberOfFollowers,
          };
        } catch (error) {
          console.error('Error fetching Twitch follower data:', error);
          return {
            id: streamer.id,
            numberOfFollowers: 0,
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
      if (!accessToken || !streamersId.length) {
        return;
      }

      const userIDs = streamersId
        .map((streamer) => streamer.id)
        .join('&user_id=');
      try {
        const response = await fetch(
          `https://api.twitch.tv/helix/streams?user_id=${userIDs}`,
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

        const data = await response.json();
        const updatedStreamersData = streamersId.map((streamer) => {
          const detailsStreamer = data.data.find(
            (item) => item.user_id === streamer.id
          );
          const viewerCount = detailsStreamer
            ? detailsStreamer.viewer_count
            : 0;
          const onlineBackground = detailsStreamer
            ? replaceWidthAndHeigthInUrl(
              detailsStreamer.thumbnail_url,
              '700',
              '500'
            )
            : '';

          return {
            ...streamer,
            viewer_count: viewerCount,
            onlineBackground: onlineBackground,
          };
        });

        setStreamersViewerData(updatedStreamersData);
      } catch (error) {
        console.error('Error fetching Twitch user data:', error);
      }
    };

    fetchAndGetDetailsStreamer();
  }, [accessToken, streamersId]);

  /*******************/


  return (
    <div className='streamerContainer'>

      {streamerData &&
        streamerData.data.map((streamer) => (
          <Streamer
            key={streamer.id}
            login={streamer.display_name}
            thumbnail={streamer.profile_image_url}
            BackGround={
              streamersViewerData.find((item) => item.id === streamer.id)
                ?.onlineBackground || streamer.offline_image_url
            }
            viewerCount={
              streamersViewerData.find((item) => item.id === streamer.id)
                ?.viewer_count || 0
            }
            follower={
              streamerFollowersData.find(
                (item) => item.id === streamer.id
              )?.numberOfFollowers || 0
            }
            link={streamer.display_name.toLowerCase()}
          />
        ))}
    </div>
  );
};

export default StreamerContainer;
