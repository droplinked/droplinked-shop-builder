import { Box, VStack } from '@chakra-ui/react'
import BasicButton from 'common/BasicButton/BasicButton'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import SkuForm from '../form'
import { BlackBox } from 'pages/register-pages/RegisterPages-style'
import { productContext } from 'pages/product/single/context'
import { toast } from 'react-toastify'

function AddVariants() {
    const { state: { properties, sku } } = useContext(productContext)
    const [AddMode, setAddMode] = useState(false)

    return (
        <VStack align={"stretch"}>
            {AddMode ? (
                <BlackBox>
                    <SkuForm close={() => setAddMode(false)} />
                </BlackBox>
            ) : (
                <Box onClick={() => setAddMode(true)}><BasicButton isDisabled={!properties.length && sku.length} width="100%" variant="outline">Add Variant</BasicButton></Box>
            )}
        </VStack>
    )
}

export default AddVariants