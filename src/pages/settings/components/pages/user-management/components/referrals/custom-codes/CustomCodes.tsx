import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import CustomCodesGenerator from './CustomCodesGenerator'

export default function CustomCodes() {
    return (
        <SectionContent
            title='Custom Codes'
            description={"Create a custom referral code to share with others."}
            rightContent={<CustomCodesGenerator />}
        />
    )
}
