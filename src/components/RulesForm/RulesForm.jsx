import React, { useState } from 'react';
import ControlledAccordion from '../ControlledAccordion/ControlledAccordion';

/**
 *
 * @param {object} props
 * @param {array} props.rulesSections- The data of the rules sections
 * @returns {JSX.Element}
 */
const RulesForm = ({ rulesSections }) => {
  const [expanded, setExpanded] = useState(false);
  /**
   * The handleChange function is used to toggle the expansion state of a panel in a React component.
   * @param {boolean} panel - The panel to expand
   * @returns {function} - The function to set the state of the expanded panel
   */
  const handleChange =
    (panel) =>
    (/** @type { MouseEvent } */ _event, /** @type {boolean} */ isExpanded) => {
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
