import React from 'react';

/**
 *
 * @param {object} props
 * @param {boolean} props.ifMobile - if width < 992px props.ifMobile = true
 * @returns {JSX.Element}
 */
export default function Footer({ ifMobile }) {
  return ifMobile ? (
    <footer className='footer footerMobile'>
      <p>TRYADE 2023</p>
      <p>Tous droits réservés</p>
    </footer>
  ) : (
    <footer className='footer footerDesktop'>
      <div className='footerDesktopTryadeWithLogo'>
        <img
          src='/assets/tryadeLogo.svg'
          alt='Tryade logo'
        />
        <p>
          Réalisé par l’équipe de <span>Tryade</span>
          <br /> 2023 - Tous droits réservés
        </p>
      </div>
      <p className='footerTryadeText'>TRYADE</p>
    </footer>
  );
}
