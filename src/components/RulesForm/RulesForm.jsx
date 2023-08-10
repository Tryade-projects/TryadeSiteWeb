import React from 'react';
import ControlledAccordion from '../ControlledAccordion/ControlledAccordion';

/**
 *
 * @param {object} props
 * @param {array} props.rulesSections- The data of the rules sections
 * @param {string} props.expanded - The state of the accordion
 * @param {function} props.handleChange - The function to set the state of the accordion
 * @returns {JSX.Element}
 */
const RulesForm = ({ rulesSections, expanded, handleChange }) => {
  return (
    <div className='rulesForm'>
      {rulesSections.map((rulesSection, index) => (
        <ControlledAccordion
          key={`${index} ${rulesSection._id}`}
          expanded={expanded}
          handleChange={handleChange}
          rulesSectionData={rulesSection}
        />
      ))}
    </div>
  );
};

export default RulesForm;
