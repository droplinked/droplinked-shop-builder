import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function EmptyBox() {
    const { t } = useLocaleResources('shop');
    // const isActiveShopsTab = tab === "active"
    // const imageSrc = isActiveShopsTab ?
    //     "assets/images/active-shops-empty-view.png" :
    //     "assets/images/inactive-shops-empty-view.png"
    const imageSrc = "assets/images/active-shops-empty-view.png"

    return (
        <Flex direction="column" alignItems="center" gap={2}>
            <Image width={264} height={204} src={imageSrc} />
            <AppTypography width={"80%"} textAlign={"center"} fontSize={16} color={"#808080"}>
                {/* Oops! It looks like you have no {isActiveShopsTab ? "active" : "deactivated"} shops. */}
                {t('emptyBox.message')}
                {/* Check the <Box as='span' fontWeight={700} color={"primary"}>{isActiveShopsTab ? "deactivated" : "active"} tab</Box> to view all your inactive shops. */}
            </AppTypography>
        </Flex>
    )
}

export default EmptyBox