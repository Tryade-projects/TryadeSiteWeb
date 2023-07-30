import { useState, useEffect } from 'react';
import cfx from 'cfx-api';

const useServerInfo = () => {
  const [serverInfo, setServerInfo] = useState(null);

  useEffect(() => {
    const fetchServerInfo = async () => {
      const serverId = import.meta.env.VITE_SERVER_ID;

      try {
        const server = await cfx.fetchServer(serverId);
        setServerInfo(server);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des informations du serveur:',
          error
        );
      }
    };

    fetchServerInfo();
  }, []);

  return serverInfo;
};

export default useServerInfo;
