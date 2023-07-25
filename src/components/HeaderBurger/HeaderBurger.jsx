import React from 'react';

/**
 *
 * @param {object} props
 * @param {boolean} props.isBurgerOpen - state of the burger
 * @param {function} props.setIsBurgerOpen - function to set the state of the burger
 * @returns {JSX.Element}
 */
const HeaderBurger = ({ isBurgerOpen, setIsBurgerOpen }) => {
  return (
    <button
      className='headerBurger'
      onClick={() => {
        setIsBurgerOpen(!isBurgerOpen);
      }}>
      <div
        className={
          isBurgerOpen
            ? 'headerBurgerLine headerBurgerLineOpenOne'
            : 'headerBurgerLine'
        }
      />
      <div
        className={
          isBurgerOpen
            ? 'headerBurgerLine headerBurgerLineOpenTwo'
            : 'headerBurgerLine'
        }
      />
      <div
        className={
          isBurgerOpen
            ? 'headerBurgerLine headerBurgerLineOpenThree'
            : 'headerBurgerLine'
        }
      />
    </button>
  );
};

export default HeaderBurger;
