import { Box, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useState } from 'react'
import SkuForm from '../form'
import { BlackBox } from 'pages/register-pages/RegisterPages-style'

function AddVariants() {
    const [AddMode, setAddMode] = useState(false)

    return (
        <VStack align={"stretch"}>
            {AddMode ? (
                <BlackBox>
                    <SkuForm close={() => setAddMode(false)} />
                </BlackBox>
            ) : (
                <Box onClick={() => setAddMode(true)}><BasicButton cancelType>Add Variants</BasicButton></Box>
            )}
        </VStack>
    )
}

export default AddVariants