import React from 'react';
import Button from '../Button/Button';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import Navigation from '../Navigation/Navigation';
import { useScroll } from '../../utils/scrollUtils';


/**
 *
 * @param {object} props
 * @param {boolean} props.modalIsOpen - state of the burger
 * @param {function} props.setModalIsOpen - function to set the state of the burger
 * @returns {JSX.Element}
 */



export default function Header({ modalIsOpen, setModalIsOpen }) {
  const scrolled = useScroll();
  return (
    <div className='headerContainer'>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <HeaderLogo />
        <Navigation />
        <div className='headerButtonsContainer'>
          <Button title='En ligne : 400/300' />
          <Button
            title='Jouer'
            src='/assets/controller.svg'
            alt='Controller'
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
