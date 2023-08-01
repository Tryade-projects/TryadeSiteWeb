import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import SectionContent from '../../components/SectionContent/SectionContent';

const fetchRulesSections = async ({ pageParam = 0 }) => {
  // Simulez la récupération des données depuis votre API ou fichier JSON
  const response = await fetch('/mockedData/rules.json');
  const data = await response.json();
  return data.slice(pageParam, pageParam + 1); // Renvoie une section à la fois
};

export default function RulesPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['sectionsDeRegles'],
    queryFn: fetchRulesSections,
    getNextPageParam: (lastPage, pages) => {
      // Si la dernière page est vide, il n'y a plus de pages à récupérer
      if (lastPage.length === 0) {
        return false;
      }
      // Sinon, renvoie le numéro de la prochaine page à récupérer
      return pages.length;
    },
  });

  // Utilisez le hook useInView pour détecter lorsque l'élément est dans la vue (visible)
  const { ref, inView } = useInView({
    threshold: 0, // 0 signifie que l'élément est considéré comme visible dès qu'une partie apparaît dans la vue
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className='page'>
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
          {data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((section, sectionIndex) => (
                <SectionContent
                  key={`${index}-${sectionIndex}`}
                  sectionData={section}
                />
              ))}
            </React.Fragment>
          ))}
          <div ref={ref}></div> {/* L'élément de chargement */}
          <div>
            {isFetching && !isFetchingNextPage ? 'Chargement...' : null}
          </div>
        </>
      )}
    </main>
  );
}
