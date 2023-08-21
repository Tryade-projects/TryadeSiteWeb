import React, { useEffect } from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { useInView } from 'react-intersection-observer';
import StreamerContainer from '../../components/StreamerContainer/StreamerContainer';
import { Link } from 'react-router-dom';


const StreamersPage = () => {
  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useStreamersSectionQuery();
  // console.log({
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className='streamersPage'>
      <section
        // ref={nextSectionRef}
        className='streamerSection screenHeightWithoutHeader page'>
        <div className='headerSection'>
          <Title
            mainTitle='Nos Streamers'
            shadowTitle='NETWORK'
          />
          <Link to='/streamers'>
            <Button title='Devenir Streamer ?' />
          </Link>
        </div>
        <StreamerContainer />
      </section>
      
      
      {/* <section
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
      </section> */}
      {/* <div ref={ref}></div>
      {isFetching && !isFetchingNextPage && <div>Chargement...</div>} */}
    </main>
  );
};

export default StreamersPage;
