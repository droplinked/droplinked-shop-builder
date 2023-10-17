import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import React, { useState } from 'react'

function OptionUploadLogo() {
    const [Image, setImage] = useState('')    
    return <AppUploadImage onChange={(value) => setImage(value)} size="original" values={Image} mode="horizontal" />
}

export default OptionUploadLogo