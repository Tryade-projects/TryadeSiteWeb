import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

export default function Header() {
  const location = useLocation();
  console.log(location);
  return (
    <header
      className={
        location.pathname !== '/' ? 'header headerBackground' : 'header'
      }>
      <div>LOGO</div>
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
    </header>
  );
}
