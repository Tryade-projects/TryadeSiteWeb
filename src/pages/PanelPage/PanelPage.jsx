import React, { useState } from 'react';
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
  console.log({ rulesSections });

  const [active, setActive] = useState(1);
  const CATEGORIES = [
    { id: 1, name: 'Règlement' },
    { id: 2, name: 'Patchnotes' },
    { id: 3, name: 'Streameurs' },
  ];

  function selectDataToDisplay() {
    if (active === 1) {
      return 'rules_section';
    } else if (active === 2) {
      return 'patchnotes_section';
    } else if (active === 3) {
      return 'streameurs_section';
    }
  }

  const selectSectionToDisplay =
    active === 1 ? (
      <RulesForm rulesSections={rulesSections} />
    ) : active === 2 ? (
      <PatchnotesForm />
    ) : (
      <StreameursForm />
    );

  const selectTextButtonToDisplay =
    active === 1
      ? 'Ajouter une section'
      : active === 2
      ? 'Ajouter un patchnote'
      : 'Ajouter un streameur';

  function selectFunctionToUse() {
    if (active === 1) {
      addRules();
    } else if (active === 2) {
      addPatchnote();
    } else if (active === 3) {
      addStreameur();
    }
  }

  function addRules() {
    queryClient.setQueryData([RULES_QUERY_KEY], (oldData) => [
      ...oldData,
      {
        id: oldData.length + 1,
        sectionTitle: 'Nouvelle section',
        colorLine: '#000000',
        rules: [],
      },
    ]);
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
                    active={active === categorie.id}
                    setActive={() => setActive(categorie.id)}
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
