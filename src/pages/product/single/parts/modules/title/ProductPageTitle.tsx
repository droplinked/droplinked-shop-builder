import { Box, HStack, VStack } from '@chakra-ui/react'
import { CardTitle } from 'common/card/component-style'
import FieldLabel from 'common/form/fieldLabel/FieldLabel'
import FieldLabelReuired from 'common/form/fieldLabel/parts/required/FieldLabelReuired'
import AppTypography from 'common/typography/AppTypography'
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
                    <AppTypography size='18px' weight={head ? 'bolder' : "bold"}>{title}</AppTypography>
                    {isReuired && <FieldLabelReuired fontSize={"larger"} fontFamily="aven" fontWeight={"bold"} />}
                </HStack>
            </Box>
            <AppTypography size='14px'>{description}</AppTypography>
        </VStack>
    )
}

export default ProductPageTitle