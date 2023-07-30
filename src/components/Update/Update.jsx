import React from 'react'
import Button from '../Button/Button'

const Update = () => {
    return (
        <div className='update'>
            <div className="updateImg"><img src="./images/updateThumbnail.png" alt="" /></div>
            <div className='updateUInfos'>
                <h3 className='updateTitle'>Brothers & Hood</h3>
                <h4 className='updateVersion'>V 1.6.15</h4>
                <p className='updateText'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, dignissimos. Officiis tenetur aspernatur repellendus perspiciatis iure aliquam quaerat sunt provident repudiandae, laboriosam beatae velit consequatur asperiores numquam veritatis quis saepe.</p>
            </div>
            <Button 
            title="LIRE"/>
        </div>
    )
}

export default Update