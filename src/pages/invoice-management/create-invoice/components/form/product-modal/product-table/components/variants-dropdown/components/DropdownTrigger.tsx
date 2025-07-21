import { Button, PopoverTrigger } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import React from 'react'
import SKUOptions from './SKUOptions'

interface Props {
    isOpen: boolean
    selectedSKU: any
}

function DropdownTrigger({ isOpen, selectedSKU }: Props) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    return (
        <PopoverTrigger>
            <Button
                width="160px"
                display="flex"
                alignItems="center"
                gap={selectedSKU ? 4 : 0}
                border={`1.5px solid ${isOpen ? 'neutral.gray.400' : '#292929'}`}
                borderRadius={8}
                px={4}
                py={3}
                background="none"
                color="text.subtext.placeholder.dark"
                _hover={{}}
                _focusVisible={{}}
                _active={{}}
            >
                {selectedSKU ?
                    <SKUOptions
                        options={selectedSKU.options}
                        circleProps={{ size: 4 }}
                        textProps={{ fontSize: 14 }}
                    />
                    :
                    <AppTypography flex={1} textAlign="left" fontSize={14}>{t('DropdownTrigger.placeholder')}</AppTypography>
                }
                <AppIcons.SelectChevronDown
                    style={{
                        flexShrink: 0,
                        transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
                        transition: '.2s',
                    }}
                />
            </Button>
        </PopoverTrigger>
    )
}

export default DropdownTrigger