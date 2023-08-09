import React, { useEffect, useState, useRef } from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import ButtonAside from '../../components/ButtonAside/ButtonAside';
import RulesForm from '../../components/RulesForm/RulesForm';
import PatchnotesForm from '../../components/PatchnotesForm/PatchnotesForm';
import StreameursForm from '../../components/StreameursForm/StreameursForm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRules } from '../../queries/fetchAPI';

const RULES_QUERY_KEY = 'rulesSections';

const PanelPage = () => {
  const { data: rulesSections, status } = useQuery({
    queryKey: [RULES_QUERY_KEY],
    queryFn: fetchRules,

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const queryClient = useQueryClient();

  const [activeCategories, setActiveCategories] = useState(1);
  const [expanded, setExpanded] = useState(false);

  /**
   * The handleChange function is used to toggle the expansion state of a panel in a React component.
   * @param {boolean} panel - The panel to expand
   * @returns {function} - The function to set the state of the expanded panel
   */
  const handleChange =
    (panel) =>
    (/** @type { MouseEvent } */ _event, /** @type {boolean} */ isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  const CATEGORIES = [
    { id: 1, name: 'Règlement' },
    { id: 2, name: 'Patchnotes' },
    { id: 3, name: 'Streameurs' },
  ];

  function selectDataToDisplay() {
    if (activeCategories === 1) {
      return 'rules_section';
    } else if (activeCategories === 2) {
      return 'patchnotes_section';
    } else if (activeCategories === 3) {
      return 'streameurs_section';
    }
  }

  const selectSectionToDisplay =
    activeCategories === 1 ? (
      <RulesForm
        rulesSections={rulesSections}
        expanded={expanded}
        handleChange={handleChange}
      />
    ) : activeCategories === 2 ? (
      <PatchnotesForm />
    ) : (
      <StreameursForm />
    );

  const selectTextButtonToDisplay =
    activeCategories === 1
      ? 'Ajouter une section'
      : activeCategories === 2
      ? 'Ajouter un patchnote'
      : 'Ajouter un streameur';

  function selectFunctionToUse() {
    if (activeCategories === 1) {
      addRules();
    } else if (activeCategories === 2) {
      addPatchnote();
    } else if (activeCategories === 3) {
      addStreameur();
    }
  }

  function addRules() {
    const newSection = {
      _id: rulesSections.length + 1,
      sectionTitle: 'Nouvelle section',
      colorLine: '#000000',
      rules: [],
    };
    queryClient.setQueryData([RULES_QUERY_KEY], (oldData) => [
      ...oldData,
      newSection,
    ]);

    setExpanded(newSection._id);
  }

  return (
    <main className='page'>
      {status === 'loading' ? (
        <p>Chargement en cours...</p>
      ) : status === 'error' ? (
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
