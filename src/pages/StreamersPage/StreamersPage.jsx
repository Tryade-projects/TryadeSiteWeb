import React, { useEffect } from 'react';
import Title from '../../components/Title/Title';
import Streamer from '../../components/Streamer/Streamer';
import Button from '../../components/Button/Button';
import useStreamersSectionQuery from '../../hooks/useStreamersSectionQuery';
import { useInView } from 'react-intersection-observer';

const StreamersPage = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useStreamersSectionQuery();
  console.log({
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  });

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
          mainTitle='Nos Streamers'
          shadowTitle='NETWORK'
        />
        <Button title='Devenir Streamer ?' />
      </div>
      <section
        id='streamers'
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
                  <Streamer
                    key={`${index}-${sectionIndex}`}
                    sectionData={section}
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

export default StreamersPage;
