import React from 'react'
import multiplePoint from '../../../public/assets/multiplePoints.svg'

/**
 * 
 * @param {object} props
 * @param {string} props.mainTitle - The main title of the page
 * @param {string} props.shadowTitle - The decoration title behind the main title
 * @param {JSX.Element} - The Title
 * 
 * @returns 
 */

const Title = ({ mainTitle, shadowTitle }) => {
    return (
        <div className='title'>
            <h1>{mainTitle}</h1>
            <div className='shadowTitle'>
                <h2>{shadowTitle}</h2>
                <img src={multiplePoint} alt="Points de décoration" />
            </div>
        </div>
    )
}

export default Title