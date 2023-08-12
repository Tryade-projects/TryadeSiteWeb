import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import ButtonAside from '../../components/ButtonAside/ButtonAside';
import PanelFormContainer from '../../components/PanelFormContainer/PanelFormContainer';
import StreamersForm from '../../components/StreamersForm/StreamersForm';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchRulesSections,
  fetchUpdatesSections,
} from '../../queries/fetchAPI';

const RULES_QUERY_KEY = 'rulesSections';
const UPDATES_QUERY_KEY = 'updatesSections';

const PanelPage = () => {
  const { data: rulesSections, status: rulesStatus } = useQuery({
    queryKey: [RULES_QUERY_KEY],
    queryFn: fetchRulesSections,

    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: updatesSections, status: updatesSectionsStatus } = useQuery({
    queryKey: [UPDATES_QUERY_KEY],
    queryFn: fetchUpdatesSections,

    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const queryClient = useQueryClient();

  const [activeCategories, setActiveCategories] = useState(1);
  const [expanded, setExpanded] = useState('');

  /**
   * The handleChange function is used to toggle the expansion state of a panel in a React component.
   * @param {string} panel - The panel to expand
   * @returns {function} - The function to set the state of the expanded panel
   */
  const handleChange =
    (panel) =>
    (/** @type { MouseEvent } */ _event, /** @type {boolean} */ isExpanded) => {
      setExpanded(isExpanded ? panel : '');
    };
  const CATEGORIES = [
    { id: 1, name: 'Règlement' },
    { id: 2, name: 'Updates' },
    { id: 3, name: 'Streamers' },
  ];

  function selectDataToDisplay() {
    if (activeCategories === 1) {
      return 'rules_section';
    } else if (activeCategories === 2) {
      return 'updates_section';
    } else if (activeCategories === 3) {
      return 'Streamers_section';
    }
  }

  const selectSectionToDisplay =
    activeCategories === 1 ? (
      <PanelFormContainer
        dataSections={rulesSections}
        expanded={expanded}
        handleChange={handleChange}
        category={activeCategories}
      />
    ) : activeCategories === 2 ? (
      <PanelFormContainer
        dataSections={updatesSections}
        expanded={expanded}
        handleChange={handleChange}
        category={activeCategories}
      />
    ) : (
      <StreamersForm />
    );

  const selectTextButtonToDisplay =
    activeCategories === 1
      ? 'Ajouter une section'
      : activeCategories === 2
      ? 'Ajouter un patchnote'
      : 'Ajouter un streameur';

  function selectFunctionToUse() {
    if (activeCategories === 1) {
      addRulesSection();
    } else if (activeCategories === 2) {
      addUpdate();
    } else if (activeCategories === 3) {
      addStreameur();
    }
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

  return (
    <main className='page'>
      {(rulesStatus || updatesSectionsStatus) === 'loading' ? (
        <p>Chargement en cours...</p>
      ) : (rulesStatus || updatesSectionsStatus) === 'error' ? (
        <p>Erreur : Impossible de récupérer les données.</p>
      ) : (
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
                    activeCategories={activeCategories === categorie.id}
                    setActiveCategories={() =>
                      setActiveCategories(categorie.id)
                    }
                  />
                ))}
              </nav>
            </aside>
            <section className='panelPageContentSection'>
              {selectSectionToDisplay}
            </section>
          </div>
        </>
      )}
    </main>
  );
};

export default PanelPage;
