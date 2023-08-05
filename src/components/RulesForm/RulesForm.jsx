import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ControlledAccordion from '../ControlledAccordion/ControlledAccordion';
import useRulesSectionQuery from '../../hooks/useRulesSectionQuery';

const RulesForm = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useRulesSectionQuery();
  console.log({ data });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='rulesForm'>
      {status === 'loading' ? (
        <p>Chargement en cours...</p>
      ) : status === 'error' ? (
        <p>Erreur : Impossible de récupérer les données.</p>
      ) : (
        <>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((section, sectionIndex) => (
                <ControlledAccordion
                  key={`${index}-${sectionIndex}`}
                  expanded={expanded}
                  handleChange={handleChange}
                  rulesSectionData={section}
                />
              ))}
            </React.Fragment>
          ))}
          <div ref={ref}></div>
          {isFetching && !isFetchingNextPage && <div>Chargement...</div>}
        </>
      )}
    </div>
  );
};

export default RulesForm;
