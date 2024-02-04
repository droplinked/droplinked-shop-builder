import { Box, VStack } from '@chakra-ui/layout'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTags from 'components/common/tags/AppTags'
import React, { useState } from 'react'
import classes from './style.module.scss'

interface IProps {
    updateStates: any
    value: any
}
function ShopTag({ updateStates, value }: IProps) {

    return (
        <VStack align={"stretch"} className={classes.tags}>
            <Box><FieldLabel textProps={{ size: "18px", fontWeight: "bold" }} isRequired label='Store Tags' /></Box>
            <Box><AppTags value={value} onChange={(values) => updateStates("tags", values)} /></Box>
        </VStack>
    )
}

export default ShopTag