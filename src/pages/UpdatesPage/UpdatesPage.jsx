import React from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Update from '../../components/Update/Update';

const UpdatesPage = () => {
  return (
    <div className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Mises à jour'
          shadowTitle='DEVBLOG'
        />
        <Button
          title='Voir tous nos mise à jour'
          borderColorClass='primaryColorBorder'
        />
      </div>
      <section
        id='updates'
        className='sectionWrap'>
        <Update />
        <Update />
        <Update />
        <Update />
        <Update />
        <Update />
        <Update />
      </section>
    </div>
  );
};

export default UpdatesPage;
