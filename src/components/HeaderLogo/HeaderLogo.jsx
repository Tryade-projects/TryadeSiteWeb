import React from 'react';

const HeaderLogo = () => {
  return (
    <div className='headerLogo'>
      <img
        src='/assets/tryadeLogo.svg'
        alt='tryadeLogo'
        className='tryadeLogo'
      />
      <div className='headerLogoTextContainer'>
        <img
          src='/assets/tryadeText.svg'
          alt='tryadeText'
          className='tryadeText'
        />
        <img
          src='/assets/roleplayText.svg'
          alt='roleplayText'
          className='roleplayText'
        />
      </div>
    </div>
  );
};

export default HeaderLogo;
