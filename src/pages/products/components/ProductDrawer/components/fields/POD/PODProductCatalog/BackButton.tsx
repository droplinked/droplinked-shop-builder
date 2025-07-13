import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function BackButton({ onBackClick }: { onBackClick: () => void }) {
    const { t } = useLocaleResources('products');
    
    return (
        <Flex
            as="button"
            type='button'
            alignItems="center"
            gap="6px"
            fontSize={14}
            fontWeight={500}
            color="#FFF"
            onClick={onBackClick}
        >
            <AppIcons.BackArrow />
            {t('fields.pod.backButton')}
        </Flex>
    )
}

export default BackButton