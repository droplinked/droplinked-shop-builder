import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function LandingTitle({ title }: { title: string }) {
    return <AppTypography
        textAlign="center"
        fontSize={{ base: "18px", md: "27px", lg: "34px" }}
        fontWeight='bold'
        color={"#fff"}
    >
        {title}
    </AppTypography>
}

export default LandingTitle