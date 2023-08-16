import React from 'react';
import Banner from '../../components/Banner/Banner';
import List from '../../components/List/List';

/**
 *
 * @param {object} props
 * @param {object} props.sectionData - Data of the section
 * @param {string} props.sectionData.urlBanner - Url of the banner
 * @param {string} props.sectionData.colorLine - Color of the line
 * @param {array} props.sectionData.rules - Rules of the section
 * @param {Date} props.sectionData.date - Date of the section
 * @returns  {JSX.Element} - Rendered SectionContent component
 */
const SectionContent = ({ sectionData }) => {
  return (
    <div className='sectionContent'>
      <Banner
        url={sectionData.urlBanner}
        date={sectionData.date}
      />
      <List
        rules={sectionData.rules}
        colorLine={sectionData.colorLine}
      />
    </div>
  );
};

export default SectionContent;
