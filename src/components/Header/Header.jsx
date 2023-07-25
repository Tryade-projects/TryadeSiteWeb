import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderBurger from '../HeaderBurger/HeaderBurger';

/**
 *
 * @param {object} props
 * @param {boolean} props.isBurgerOpen - state of the burger
 * @param {function} props.setIsBurgerOpen - function to set the state of the burger
 * @returns {JSX.Element}
 */
export default function Header({ isBurgerOpen, setIsBurgerOpen }) {
  const location = useLocation();
  console.log(location);

  return (
    <header
      className={
        location.pathname !== '/' ? 'header headerBackground' : 'header'
      }>
      <HeaderLogo />
      <nav>
        <NavLink to='/'>Accueil</NavLink>
        <NavLink to='/rules'>Règlements</NavLink>
      </nav>
      <div className='headerButtonsContainer'>
        <Button
          width={216}
          height={51}
          title='En ligne : 400/300'
          borderColorClass='primaryColorBorder'
        />
        <Button
          width={160}
          height={51}
          title='Jouer'
          borderColorClass='secondaryColorBorder'
          src='./assets/controller.svg'
        />
      </div>
      <HeaderBurger
        isBurgerOpen={isBurgerOpen}
        setIsBurgerOpen={setIsBurgerOpen}
      />
    </header>
  );
}
