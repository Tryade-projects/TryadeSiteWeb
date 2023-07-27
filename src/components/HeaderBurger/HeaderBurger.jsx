import React from 'react';

/**
 *
 * @param {object} props
 * @param {boolean} props.modalIsOpen - state of the burger
 * @param {function} props.setModalIsOpen - function to set the state of the burger
 * @returns {JSX.Element}
 */
const HeaderBurger = ({ modalIsOpen, setModalIsOpen }) => {
  return (
    <button
      className='headerBurger'
      onClick={() => {
        setModalIsOpen(!modalIsOpen);
      }}>
      <div
        className={
          modalIsOpen
            ? 'headerBurgerLine headerBurgerLineOpenOne'
            : 'headerBurgerLine'
        }
      />
      <div
        className={
          modalIsOpen
            ? 'headerBurgerLine headerBurgerLineOpenTwo'
            : 'headerBurgerLine'
        }
      />
      <div
        className={
          modalIsOpen
            ? 'headerBurgerLine headerBurgerLineOpenThree'
            : 'headerBurgerLine'
        }
      />
    </button>
  );
};

export default HeaderBurger;
