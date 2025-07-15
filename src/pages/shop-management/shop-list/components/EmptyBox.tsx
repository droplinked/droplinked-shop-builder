import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function EmptyBox() {
    const { t } = useLocaleResources('shopManagement')

    const imageSrc = "assets/images/active-shops-empty-view.png"

    return (
        <Flex direction="column" alignItems="center" gap={2}>
            <Image width={264} height={204} src={imageSrc} />
            <AppTypography width="80%" textAlign="center" fontSize={16} color="#808080">
                {t('EmptyBox.noShopsMessage')}
            </AppTypography>
        </Flex>
    )
}

export default EmptyBox