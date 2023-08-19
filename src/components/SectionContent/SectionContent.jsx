import React from 'react';
import Banner from '../../components/Banner/Banner';
import List from '../../components/List/List';

/**
 *
 * @param {object} props
 * @param {object} props.sectionData - Data of the section
 * @param {string} props.sectionData.urlBanner - Url of the banner
 * @param {string} props.sectionData.colorLine - Color of the line
 * @param {array=} props.sectionData.rules - Rules of the section (only for rules)
 * @param {array=} props.sectionData.details - Details of the section (only for updates)
 * @param {Date=} props.sectionData.date - Date of the section (only for updates)
 * @param {string=} props.sectionData.version - Version of the section (only for updates)
 * @param {string=} props.sectionData.sectionTitle - Title of the section (only for updates)
 * @returns  {JSX.Element} - Rendered SectionContent component
 */
const SectionContent = ({ sectionData }) => {
  return (
    <div className='sectionContent'>
      <Banner
        url={sectionData.urlBanner}
        date={sectionData.date}
        version={sectionData.version}
        updateTitle={sectionData.sectionTitle}
      />
      <List
        datas={sectionData.rules || sectionData.details}
        colorLine={sectionData.colorLine}
      />
    </div>
  );
};

export default SectionContent;
