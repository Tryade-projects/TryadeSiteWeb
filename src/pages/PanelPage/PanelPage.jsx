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

  const selectSectionToDisplay =
    active === 1 ? (
      <h1>Reglement</h1>
    ) : active === 2 ? (
      <h1>Patchnotes</h1>
    ) : (
      <h1>Streameurs</h1>
    );

  const selectTextButtonToDisplay =
    active === 1
      ? 'Ajouter une section'
      : active === 2
      ? 'Ajouter un patchnote'
      : 'Ajouter un streameur';
  return (
    <main className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Panel Gestion'
          shadowTitle='ADMINISTRATION'
        />
        <Button title={selectTextButtonToDisplay} />
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
        <section className='panelPageContentSection'>
          {selectSectionToDisplay}
        </section>
      </div>
    </main>
  );
};

export default PanelPage;
