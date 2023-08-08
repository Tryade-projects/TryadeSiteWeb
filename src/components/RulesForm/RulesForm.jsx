import React, { useState } from 'react';
import ControlledAccordion from '../ControlledAccordion/ControlledAccordion';

/**
 *
 * @param {object} props
 * @param {array} props.rulesSections- The data of the rules sections
 * @returns {JSX.Element}
 */
const RulesForm = ({ rulesSections }) => {
  const [expanded, setExpanded] = useState(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='rulesForm'>
      {rulesSections.map((rulesSection, index) => (
        <ControlledAccordion
          key={`${index} ${rulesSection.id}`}
          expanded={expanded}
          handleChange={handleChange}
          rulesSectionData={rulesSection}
        />
      ))}
    </div>
  );
};

export default RulesForm;
