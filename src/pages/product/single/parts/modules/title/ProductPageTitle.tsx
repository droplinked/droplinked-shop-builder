import { Box, HStack, VStack } from '@chakra-ui/react'
import { CardTitle } from 'components/shared/card/component-style'
import FieldLabel from 'components/shared/form/fieldLabel/FieldLabel'
import FieldLabelReuired from 'components/shared/form/fieldLabel/parts/required/FieldLabelReuired'
import { ProductSingleStyles } from 'pages/product/single/style-component'
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
                    {head ? <CardTitle width={"100%"}>{title}</CardTitle> : <FieldLabel isRequired label={title} />}
                    {isReuired && <FieldLabelReuired fontSize={"larger"} fontFamily="aven" fontWeight={"bold"} />}
                </HStack>
            </Box>
            <ProductSingleStyles.descript>{description}</ProductSingleStyles.descript>
        </VStack>
    )
}

export default ProductPageTitle