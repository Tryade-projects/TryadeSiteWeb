import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Update from '../../components/Update/Update';
import useUpdatesSectionQuery from '../../hooks/useUpdatesSectionQuery';
import { useInView } from 'react-intersection-observer';

const UpdatesPage = () => {
  const {
    data,
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
      <Helmet>
        <title>TRYADE - Mise à jours</title>
        <meta
          name='description'
          content="Restez informés des dernières mises à jour sur le serveur Tryade. Découvrez les nouvelles fonctionnalités, améliorations et événements passionnants pour une expérience de jeu exceptionnelle."
        />
        <meta
          name='keywords'
          content='mises à jour, nouveautés, fonctionnalités, améliorations, événements, Tryade'
        />
        <meta
          name='author'
          content='Tryade'
        />
      </Helmet>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Mises à jour'
          shadowTitle='DEVBLOG'
        />
        <Button title='Proposez vos idées' />
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
                    updateId={section.id}
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
