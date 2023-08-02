import React from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';

const PanelPage = () => {
  return (
    <main className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Panel Gestion'
          shadowTitle='ADMINISTRATION'
        />
        <Button title='Ajoutez une section' />
      </div>
    </main>
  );
};

export default PanelPage;
