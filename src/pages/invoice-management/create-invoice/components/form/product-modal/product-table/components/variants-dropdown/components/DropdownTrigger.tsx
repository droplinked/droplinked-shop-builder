import { Button, PopoverTrigger } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import SKUOptions from './SKUOptions'

interface Props {
    isOpen: boolean
    selectedSKU: any
}

function DropdownTrigger({ isOpen, selectedSKU }: Props) {
    return (
        <PopoverTrigger>
            <Button
                width="160px"
                display="flex"
                alignItems="center"
                gap={selectedSKU ? 4 : 0}
                border={`1.5px solid ${isOpen ? '#878787' : '#292929'}`}
                borderRadius={8}
                px={4}
                py={3}
                background="none"
                color="#7B7B7B"
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
                    <AppTypography flex={1} textAlign="left" fontSize={14}>Size / Color</AppTypography>
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