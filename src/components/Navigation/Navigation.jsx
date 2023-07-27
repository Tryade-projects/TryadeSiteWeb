import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 *
 * @param {object} props
 * @param {boolean=} props.mobile - if true, the component will be displayed in mobile mode - optional
 * @returns {JSX.Element}
 */
const Navigation = ({ mobile }) => {
  return mobile ? (
    <nav className='navigationMobile'>
      <NavLink to='/'>
        <div className='line'></div>
        <div className='logoLink homeIcon'></div>
        Accueil
      </NavLink>
      <NavLink to='/rules'>
        <div className='line'></div>
        <div className='logoLink rulesIcon'></div>
        Règlement
      </NavLink>
      <NavLink to='/wiki'>
        <div className='line'></div>
        <div className='logoLink wikiIcon'></div>
        Wiki
      </NavLink>
      <NavLink to='/shop'>
        <div className='line'></div>
        <div className='logoLink storeIcon'></div>
        Boutique
      </NavLink>
      <NavLink to='/discord'>
        <div className='line'></div>
        <div className='logoLink discordIcon'></div>
        Discord
      </NavLink>
    </nav>
  ) : (
    <nav className='navigation'>
      <NavLink to='/'>Accueil</NavLink>
      <NavLink to='/rules'>Règlement</NavLink>
      <NavLink to='/wiki'>Wiki</NavLink>
      <NavLink to='/shop'>Boutique</NavLink>
      <NavLink to='/discord'>Discord</NavLink>
    </nav>
  );
};

export default Navigation;
