import React, { useState } from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import ButtonAside from '../../components/ButtonAside/ButtonAside';

const PanelPage = () => {
  const [active, setActive] = useState(1);
  const CATEGORIES = [
    { id: 1, name: 'Règlement' },
    { id: 2, name: 'Patchnotes' },
    { id: 3, name: 'Streameurs' },
  ];

  return (
    <main className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Panel Gestion'
          shadowTitle='ADMINISTRATION'
        />
        <Button title='Ajoutez une section' />
      </div>
      <div className='panelPageContent'>
        <aside className='panelPageContentAside'>
          <ButtonAside
            text='Vous êtes connectés: '
            userName='Zoral'
          />

          <nav className='panelPageContentAsideNav'>
            {CATEGORIES.map((categorie) => (
              <ButtonAside
                key={categorie.id}
                text={categorie.name}
                active={active === categorie.id}
                setActive={() => setActive(categorie.id)}
              />
            ))}
          </nav>
        </aside>
        <section className='panelPageContentSection'></section>
      </div>
    </main>
  );
};

export default PanelPage;
