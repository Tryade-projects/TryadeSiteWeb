import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { useInView } from 'react-intersection-observer';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import SectionContent from '../../components/SectionContent/SectionContent';
import useRulesSectionQuery from '../../hooks/useRulesSectionQuery';

const RulesPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useRulesSectionQuery();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className='page'>
      <Helmet>
        <title>TRYADE - Règlements</title>
        <meta
          name='description'
          content="Consultez nos règlements détaillés pour profiter pleinement de l'expérience de jeu. Assurez-vous de respecter nos directives pour un environnement de jeu agréable et respectueux."
        />
        <meta
          name='keywords'
          content='règlements, guidelines, règles du jeu, respect, expérience de jeu'
        />
        <meta
          name='author'
          content='Tryade'
        />
      </Helmet>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Règlement'
          shadowTitle='GAMEPLAY'
        />
        <Button title='Rejoindre l’équipe de modération' />
      </div>
      {status === 'loading' ? (
        <p>Chargement en cours...</p>
      ) : status === 'error' ? (
        <p>Erreur : Impossible de récupérer les données.</p>
      ) : (
        <>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((section, sectionIndex) => (
                <SectionContent
                  key={`${index}-${sectionIndex}`}
                  sectionData={section}
                />
              ))}
            </React.Fragment>
          ))}
          <div ref={ref}></div>
          {isFetchingNextPage && <div>Chargement...</div>}
        </>
      )}
    </main>
  );
};

export default RulesPage;
