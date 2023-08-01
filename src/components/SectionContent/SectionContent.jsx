import React from 'react';
import Banner from '../../components/Banner/Banner';
import List from '../../components/List/List';

const SectionContent = ({ sectionData }) => {
  console.log({ sectionData });
  return (
    <div className='sectionContent'>
      <Banner url={sectionData.urlBanner} />
      <h2>{sectionData.sectionTitle}</h2>
      <List rules={sectionData.rules} />
    </div>
  );
};

export default SectionContent;
