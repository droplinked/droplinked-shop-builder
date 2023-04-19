import { Box, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import { BlackBox } from 'pages/register-pages/RegisterPages-style'
import React, { useState } from 'react'
import SkuForm from '../form'

function AddVariants() {
    const [AddMode, setAddMode] = useState(false)

    return (
        <VStack align={"stretch"}>
            {AddMode ? <SkuForm close={() => setAddMode(false)} /> : (
                <Box onClick={() => setAddMode(true)}><BasicButton cancelType>Add Variants</BasicButton></Box>
            )}
        </VStack>
    )
}

export default AddVariants