import React from 'react';
import Button from '../Button/Button';

/**
 * @param {object} props
 * @param {string} props.updateTitle - The title of the update
 * @param {number} props.updateVersion - The version of the update
 * @param {string} props.updateText - The presentation text of the update
 * @param {string} props.updateThumbnail - The name of the png image of the update
 * @returns {JSX Element} - Update
 */

const Update = ({updateTitle, updateVersion, updateText, updateThumbnail}) => {
    return (
        <div className='update'>
            <div className='updateImg'>
                <img
                    src={`/images/${updateThumbnail}`}
                    alt={`${updateVersion} thumbnail image`}
                />
            </div>
            <div className='updateInfos'>
                <div className='titleUpdateContainer'>
                    <h3 className='updateTitle'>{updateTitle}</h3>
                    <h4 className='updateVersion'>{`Version ${updateVersion}`}</h4>
                </div>
                <p className='updateText'>
                    {updateText}
                </p>
            </div>
            <Button title='LIRE' />
        </div>
    );
};

export default Update;
