import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  useIsAuthenticated,
  useAuthUser /*, useSignOut*/,
} from 'react-auth-kit';
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
import { Navigate } from 'react-router';

const RULES_QUERY_KEY = 'rulesSections';
const UPDATES_QUERY_KEY = 'updatesSections';
const STREAMERS_QUERY_KEY = 'streamersSections';

const PanelPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  // const signOut = useSignOut();

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
      urlTwitch: 'urlTwitch',
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
      urlBanner: '/images/updateBanner.png',
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
      urlBanner: '/images/bannerDiscordRules.png',
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
  if (!isAuthenticated()) {
    return <Navigate to='/' />;
  }
  console.log(sectionsStatus);
  return (
    // <>
    <main className='page'>
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
            userName={authUser()?.username}
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
    </main>
    /* <button onClick={() => signOut()}>Sign Out</button>
    </> */
  );
};

export default PanelPage;
