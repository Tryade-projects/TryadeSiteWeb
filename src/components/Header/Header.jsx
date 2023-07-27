import React from 'react';
import Button from '../Button/Button';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import Navigation from '../Navigation/Navigation';

/**
 *
 * @param {object} props
 * @param {boolean} props.modalIsOpen - state of the burger
 * @param {function} props.setModalIsOpen - function to set the state of the burger
 * @returns {JSX.Element}
 */
export default function Header({ modalIsOpen, setModalIsOpen }) {
  return (
    <div className='headerContainer'>
      <header className='header'>
        <HeaderLogo />
        <Navigation />
        <div className='headerButtonsContainer'>
          <Button
            title='En ligne : 400/300'
            borderColorClass='primaryColorBorder'
          />
          <Button
            title='Jouer'
            borderColorClass='secondaryColorBorder'
            src='./assets/controller.svg'
          />
        </div>
        <HeaderBurger
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </header>
    </div>
  );
}
