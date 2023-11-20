import { Box, HStack, VStack } from '@chakra-ui/react'
import FieldLabelReuired from 'components/common/form/fieldLabel/parts/required/FieldLabelReuired'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface IProps {
    title: string
    description: string
    head?: boolean
    isReuired?: boolean
}

function ProductPageTitle({ description, title, head, isReuired }: IProps) {
    return (
        <VStack align={"stretch"}>
            <Box>
                <HStack width={"fit-content"}>
                    <AppTypography size='18px' fontWeight={head ? 'bold' : "normal"}>{title}</AppTypography>
                    {isReuired && <FieldLabelReuired fontSize={"larger"} fontFamily="aven" fontWeight={"bold"} />}
                </HStack>
            </Box>
            <AppTypography size='14px' color={"#C2C2C2"}>{description}</AppTypography>
        </VStack>
    )
}

export default ProductPageTitle