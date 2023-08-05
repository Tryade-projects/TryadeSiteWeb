import React, { useEffect, useState } from 'react';
import { fetchRules } from '../../queries/fetchAPI';
import { useQuery } from '@tanstack/react-query';
import ControlledAccordion from '../ControlledAccordion/ControlledAccordion';

const QUERY_KEY_RULES = ['rules'];

const RulesForm = () => {
  const { data, status } = useQuery({
    queryKey: QUERY_KEY_RULES,
    queryFn: fetchRules,
  });
  console.log({ data });

  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='rulesForm'>
      {status === 'loading' ? (
        <p>Chargement en cours...</p>
      ) : status === 'error' ? (
        <p>Erreur : Impossible de récupérer les données.</p>
      ) : (
        <>
          {data.map((rulesSectionData) => (
            <ControlledAccordion
              key={rulesSectionData.id}
              expanded={expanded}
              handleChange={handleChange}
              rulesSectionData={rulesSectionData}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RulesForm;
