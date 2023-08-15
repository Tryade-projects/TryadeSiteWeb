/**
 * Fonction qui récupère les données de l'API
 * @param   {string}  url  - url de l'API
 * @return  {Promise} - Retourne une promesse avec les données de l'API
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error.message);
    throw error; // Rejette la promesse avec l'erreur
  }
};

export default fetchData;
