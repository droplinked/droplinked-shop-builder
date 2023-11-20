import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Iprops {
    value: string
    limit: number
}

function AppLimitCharacter({ limit, value }: Iprops) {
    return (
        <AppTypography fontSize='14px' position={"absolute"} bottom="10px" right="20px" zIndex={"1"} color="#808080">{value.length}/{limit}</AppTypography>
    )
}

export default AppLimitCharacter