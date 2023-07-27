import React from 'react'


/**
 * 
 * @param {object} props
 * @param {string} props.mainTitle - The main title of the page
 * @param {string} props.shadowTitle - The decoration title behind the main title
 * @returns {JSX.Element} - Title
 */

const Title = ({ mainTitle, shadowTitle }) => {
    return (
        <div className='title'>
            <h1>{mainTitle}</h1>
            <div className='shadowTitle'>
                <h2>{shadowTitle}</h2>
                <img src={"./assets/multiplePoints.svg"} alt="Points de décoration" />
            </div>
        </div>
    )
}

export default Title