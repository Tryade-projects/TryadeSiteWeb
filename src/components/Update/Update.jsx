import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

/**
 * @param {object} props
 * @param {string} props.updateTitle - The title of the update
 * @param {number} props.updateVersion - The version of the update
 * @param {string} props.updateText - The presentation text of the update
 * @param {string} props.updateThumbnail - The name of the png image of the update
 * @param {number} props.updateId - The id of the update
 * @returns {JSX.Element} - Update
 */

const Update = ({
  updateTitle,
  updateVersion,
  updateText,
  updateThumbnail,
  updateId,
}) => {
  const isMobile = window.innerWidth < 992;

  return (
    <div className='update'>
      <div
        className='updateImg'
        style={{ backgroundImage: `url(${updateThumbnail})` }}></div>
      <div className='updateInfos'>
        <div className='titleUpdateContainer'>
          <h3 className='updateTitle'>{updateTitle}</h3>
          <h4 className='updateVersion'>
            {isMobile ? `V ${updateVersion}` : `Version ${updateVersion}`}
          </h4>
        </div>
        <p className='updateText'>{updateText}</p>
      </div>

      <Link to={`/updates/${updateId}`}>
        <Button
          title='Lire'
          onClick={() => true}
        />
      </Link>
    </div>
  );
};

export default Update;
