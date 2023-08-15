import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import ButtonAside from '../../components/ButtonAside/ButtonAside';
import PanelFormContainer from '../../components/PanelFormContainer/PanelFormContainer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchRulesSections,
  fetchUpdatesSections,
  fetchStreamersSections,
} from '../../queries/fetchAPI';

const RULES_QUERY_KEY = 'rulesSections';
const UPDATES_QUERY_KEY = 'updatesSections';
const STREAMERS_QUERY_KEY = 'streamersSections';

const PanelPage = () => {
  const queryClient = useQueryClient();

  const [activeCategory, setActiveCategory] = useState(1);
  const [expanded, setExpanded] = useState('');

  let queryConfig;
  if (activeCategory === 1) {
    queryConfig = {
      queryKey: [RULES_QUERY_KEY],
      queryFn: fetchRulesSections,
      staleTime: 1000 * 60 * 5, // 5 minutes
    };
  } else if (activeCategory === 2) {
    queryConfig = {
      queryKey: [UPDATES_QUERY_KEY],
      queryFn: fetchUpdatesSections,
      staleTime: 1000 * 60 * 5, // 5 minutes
    };
  } else {
    queryConfig = {
      queryKey: [STREAMERS_QUERY_KEY],
      queryFn: fetchStreamersSections,
      staleTime: 1000 * 60 * 5, // 5 minutes
    };
  }

  const { data: sections, status: sectionsStatus } = useQuery(queryConfig);

  // /**
  //  * The handleChange function is used to toggle the expansion state of a panel in a React component.
  //  * @param {string} panel - The panel to expand
  //  * @returns {function} - The function to set the state of the expanded panel
  //  */
  // const handleChange =
  //   (panel) =>
  //   (/** @type { MouseEvent } */ _event, /** @type {boolean} */ isExpanded) => {
  //     console.log(panel, isExpanded);
  //     setExpanded(isExpanded ? panel : '');
  //   };
  const CATEGORIES = [
    { id: 1, name: 'Règlement' },
    { id: 2, name: 'Updates' },
    { id: 3, name: 'Streamers' },
  ];

  const selectTextButtonToDisplay =
    activeCategory === 1
      ? 'Ajouter une section'
      : activeCategory === 2
      ? 'Ajouter un patchnote'
      : 'Ajouter un streameur';

  function selectFunctionToUse() {
    if (activeCategory === 1) {
      addRulesSection();
    } else if (activeCategory === 2) {
      addUpdate();
    } else if (activeCategory === 3) {
      addStreamer();
    }
  }

  function addStreamer() {
    const newSection = {
      id: uuidv4(),
      urlImageAvatar: '/images/avatar.png',
      name: 'Cristiano_CR7',
      nbOfFollowers: 257,
      nbOfViewers: 257,
      date: new Date().toLocaleDateString(),
      urlTwitch: 'urlTwitch',
      urlBackground: '/images/streamer.jpg',
      channelLink: 'channelLink',
      newSection: true,
    };
    queryClient.setQueryData([STREAMERS_QUERY_KEY], (oldData) => [
      ...oldData,
      newSection,
    ]);

    setExpanded(newSection.id);
  }

  function addUpdate() {
    const newSection = {
      id: uuidv4(),
      sectionTitle: 'Nouvelle section',
      version: '1.0.0',
      urlBanner: 'test',
      colorLine: '#000000',
      details: [
        {
          id: uuidv4(),
          title: 'Description',
          content: 'Description de la mise à jour',
        },
        {
          id: uuidv4(),
          title: 'Ajouts',
          content: 'Ajouts de la mise à jour',
        },
        {
          id: uuidv4(),
          title: 'Retraits',
          content: 'Retraits de la mise à jour',
        },
        {
          id: uuidv4(),
          title: 'Modifications',
          content: 'Modifications de la mise à jour',
        },
      ],
      newSection: true,
    };
    queryClient.setQueryData([UPDATES_QUERY_KEY], (oldData) => [
      ...oldData,
      newSection,
    ]);

    setExpanded(newSection.id);
  }

  function addRulesSection() {
    const newSection = {
      id: uuidv4(),
      sectionTitle: 'Nouvelle section',
      urlBanner: 'test',
      colorLine: '#000000',
      rules: [
        {
          id: uuidv4(),
          textBackground: 'Description de la règle',
          title: 'Nouvelle règle',
          text: 'Description de la règle',
        },
      ],
      newSection: true,
    };
    queryClient.setQueryData([RULES_QUERY_KEY], (oldData) => [
      ...oldData,
      newSection,
    ]);

    setExpanded(newSection.id);
  }
  console.log(sectionsStatus);
  return (
    <main className='page'>
      <>
        <div className='titleButtonContainer'>
          <Title
            mainTitle='Panel Gestion'
            shadowTitle='ADMINISTRATION'
          />
          <Button
            title={selectTextButtonToDisplay}
            onClick={selectFunctionToUse}
          />
        </div>
        <div className='panelPageContent'>
          <aside className='panelPageContentAside'>
            <ButtonAside
              text='Vous êtes connectés: '
              userName='Zoral'
            />

            <nav className='panelPageContentAsideNav'>
              {CATEGORIES.map((categorie) => (
                <ButtonAside
                  key={categorie.id}
                  text={categorie.name}
                  activeCategory={activeCategory === categorie.id}
                  setActiveCategory={() => {
                    setExpanded('');
                    setActiveCategory(categorie.id);
                  }}
                />
              ))}
            </nav>
          </aside>
          {sectionsStatus === 'loading' ? (
            <p>Chargement en cours...</p>
          ) : sectionsStatus === 'error' ? (
            <p>Erreur : Impossible de récupérer les données.</p>
          ) : (
            <section className='panelPageContentSection'>
              <PanelFormContainer
                dataSections={sections}
                expanded={expanded}
                setExpanded={setExpanded}
                category={activeCategory}
              />
            </section>
          )}
        </div>
      </>
    </main>
  );
};

export default PanelPage;
