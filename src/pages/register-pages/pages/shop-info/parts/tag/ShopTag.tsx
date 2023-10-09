import { Box, VStack } from '@chakra-ui/layout'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTags from 'components/common/tags/AppTags'
import React, { useState } from 'react'
import classes from './style.module.scss'

function ShopTag() {
    const [Tags, setTags] = useState([])

    return (
        <VStack align={"stretch"} className={classes.tags}>
            <Box><FieldLabel textProps={{ size: "18px", weight: "bolder" }} isRequired label='Store Tags' /></Box>
            <Box><AppTags value={Tags} onChange={(value) => setTags(value)} /></Box>
        </VStack>
    )
}

export default ShopTag