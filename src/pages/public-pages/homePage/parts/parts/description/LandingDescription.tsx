import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Iprops {
    text: any
}

function LandingDescription({ text }: Iprops) {
    return <AppTypography fontSize={{ base: "14px", sm: "16px", lg: "20px" }} textAlign="center" color="#888">{text}</AppTypography>
}

export default LandingDescription