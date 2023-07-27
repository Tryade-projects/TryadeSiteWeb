import React from 'react'

/**
 * 
 * @param {object} props
 * @param {string} props.imageSrc - The link of the logo
 * @param {string} props.backgroundColorClass - The backgroundColor class of the element
 * @param {string} props.alt - The alternative text of the logo
 * @returns {JSX.Element} - The RoundLogo
 */

const RoundLogo = ({ imageSrc, backgroundColorClass, alt }) => {
    return (
        <div
            className={`roundLogo ${backgroundColorClass}`}
        >
            <img
                src={imageSrc}
                alt={`${alt} logo`}
            />
        </div>
    )
}

export default RoundLogo
