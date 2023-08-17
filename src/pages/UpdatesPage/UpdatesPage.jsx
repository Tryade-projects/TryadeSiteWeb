import React, { useEffect } from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Update from '../../components/Update/Update';
import useUpdatesSectionQuery from '../../hooks/useUpdatesSectionQuery';
import { useInView } from 'react-intersection-observer';

const UpdatesPage = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useUpdatesSectionQuery();

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
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Mises à jour'
          shadowTitle='DEVBLOG'
        />
        <Button title='Voir toutes nos mise à jour' />
      </div>
      <section
        id='updates'
        className='sectionWrap'>
        {status === 'loading' ? (
          <p>Chargement en cours...</p>
        ) : status === 'error' ? (
          <p>Erreur : Impossible de récupérer les données.</p>
        ) : (
          <>
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.map((section, sectionIndex) => (
                  <Update
                    key={`${index}-${sectionIndex}`}
                    updateTitle={section.sectionTitle}
                    updateVersion={section.version}
                    updateText={section.details[0].content}
                    updateThumbnail={section.urlBanner}
                  />
                ))}
              </React.Fragment>
            ))}
          </>
        )}
      </section>
      <div ref={ref}></div>
      {isFetching && !isFetchingNextPage && <div>Chargement...</div>}
    </main>
  );
};

export default UpdatesPage;
