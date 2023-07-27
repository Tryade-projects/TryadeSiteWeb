import React from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

/**
 *
 * @param {object} props
 * @param {function} props.setModalIsOpen - function to set the modal state
 * @returns {JSX.Element}
 */
const ModalNav = ({ setModalIsOpen }) => {
  return (
    <div className='modal'>
      <Navigation
        setModalIsOpen={setModalIsOpen}
        mobile
      />
      <Footer ifMobile />
    </div>
  );
};

export default ModalNav;
