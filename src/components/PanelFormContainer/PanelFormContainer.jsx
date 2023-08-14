import React from 'react';
import ControlledAccordion from '../ControlledAccordion/ControlledAccordion';

/**
 *
 * @param {object} props
 * @param {array} props.dataSections- The data of the sections
 * @param {string} props.expanded - The state of the accordion
 * @param {Function} props.handleChange - The function to set the state of the accordion
 * @param {number} props.category - The category of the panel
 * @returns {JSX.Element}
 */
const PanelFormContainer = ({
  dataSections,
  expanded,
  handleChange,
  category,
}) => {
  return (
    <div
      className={
        category === 3
          ? 'sectionWrap streamersFormContainer'
          : 'panelFormContainer'
      }>
      {dataSections.map((dataSection) => (
        <ControlledAccordion
          key={dataSection.id}
          expanded={expanded}
          handleChange={handleChange}
          dataSection={dataSection}
          category={category}
        />
      ))}
    </div>
  );
};

export default PanelFormContainer;
