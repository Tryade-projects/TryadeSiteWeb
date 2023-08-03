import React from 'react';

/**
 *
 * @param {object} props
 * @param {string} props.text - text of the button
 * @param {boolean=} props.active - if the button is active or not
 * @param {import('react').MouseEventHandler<HTMLButtonElement>=} props.setActive - function to set the button active
 * @param {string=} props.userName - name of the user - optional
 * @returns {JSX.Element}
 */
const ButtonAside = ({ text, active = false, setActive, userName }) => {
  /**
   *  Return the path of the image corresponding to the text and the active state
   * @param {string} text - text of the button
   * @param {boolean} active - if the button is active or not
   * @returns {string} - path of the image
   */
  const displayIcon = (text, active) => {
    // Mapping des chemins d'images pour chaque état (active ou non)
    const imagePaths = {
      Règlement: active ? '/assets/shieldWhite.svg' : '/assets/shieldGrey.svg',
      Patchnotes: active ? '/assets/rulesActive.svg' : '/assets/rulesGrey.svg',
      Streameurs: active ? '/assets/photoWhite.svg' : '/assets/photo.svg',
    };

    // Retourne le chemin d'image correspondant au texte et à l'état actif
    return imagePaths[text] || null;
  };

  return (
    <button
      className={
        (userName ? 'buttonAside buttonAsideConnected' : 'buttonAside') +
        (active ? ' buttonAsideActive' : '')
      }
      type='button'
      onClick={setActive}>
      {userName ? (
        <>
          <div className='buttonAsideConnectedCircle '>
            <div className='buttonAsideConnectedCircleIcon ' />
          </div>
          <p>
            {text}
            <br />
            <span>{userName}</span>
          </p>
        </>
      ) : (
        <>
          <div className='buttonAsideNavIcon'>
            <img
              src={displayIcon(text, active)}
              alt={text}
            />
          </div>
          <p>{text}</p>
        </>
      )}
    </button>
  );
};

export default ButtonAside;
