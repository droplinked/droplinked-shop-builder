import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function EmptyBox() {
    const imageSrc = "assets/images/active-shops-empty-view.png"

    return (
        <Flex direction="column" alignItems="center" gap={2}>
            <Image width={264} height={204} src={imageSrc} />
            <AppTypography width="80%" textAlign="center" fontSize={16} color="#808080">
                Oops! It looks like you have no shops.
            </AppTypography>
        </Flex>
    )
}

export default EmptyBox