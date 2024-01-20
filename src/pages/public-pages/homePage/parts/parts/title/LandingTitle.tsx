import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Iprops {
    title: string
}

function LandingTitle({ title }: Iprops) {
    return <AppTypography textAlign="center" fontSize={{ base: "18px",md:"27px", lg: "34px" }} fontWeight='bold'>{title}</AppTypography>
}

export default LandingTitle