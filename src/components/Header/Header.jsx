import React from 'react';
import useServerInfo from '../../utils/useServerInfo';
import Button from '../Button/Button';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderBurger from '../HeaderBurger/HeaderBurger';
import Navigation from '../Navigation/Navigation';

/**
 * @param {object} props
 * @param {boolean} props.modalIsOpen - state of the burger
 * @param {function} props.setModalIsOpen - function to set the state of the burger
 * @returns {JSX.Element}
 */
export default function Header({ modalIsOpen, setModalIsOpen }) {
  const serverInfo = useServerInfo();
  console.log({ serverInfo });

  return (
    <div className='headerContainer'>
      <header className='header'>
        <HeaderLogo />
        <Navigation />
        <div className='headerButtonsContainer'>
          {serverInfo ? (
            <div className='button primaryColorBorder'>
              <p className='buttonTitle'>{serverInfo.players.length}</p>
            </div>
          ) : (
            <p>Loading server info...</p>
          )}

          <Button
            title='Jouer'
            borderColorClass='secondaryColorBorder'
            src='./assets/controller.svg'
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
