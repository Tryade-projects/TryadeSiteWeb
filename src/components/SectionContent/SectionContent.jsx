import React from 'react';
import Banner from '../../components/Banner/Banner';
import List from '../../components/List/List';

const SectionContent = ({ sectionData }) => {
  console.log({ sectionData });
  return (
    <div className='sectionContent'>
      <Banner url={sectionData.urlBanner} />
      <List
        rules={sectionData.rules}
        colorLine={sectionData.colorLine}
      />
    </div>
  );
};

export default SectionContent;
