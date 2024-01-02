import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppDatepicker from 'components/common/datepicker/AppDatepicker'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import dashboardDatepickerModel from './model'
import classes from './style.module.scss'

function DashboardDatepicker() {
    const { ranges } = dashboardDatepickerModel

    return (
        <VStack align="stretch" backgroundColor="#222" padding="24px" position="absolute" width="450px" right="0" top="35px" borderRadius="8px">
            <Flex gap="20px">
                <VStack align="stretch" width="30%">
                    {ranges.map((el, key) => (
                        <Box key={key} backgroundColor={key === 0 ? '#FFF' : ''} borderRadius="8px" padding="7px 15px"><AppTypography fontSize="12px" color={key === 0 ? '#333' : '#FFF'} fontWeight={key === 0 ? '600' : ''}>{el.caption}</AppTypography></Box>
                    ))}
                </VStack>
                <VStack align="stretch" width="70%">
                    <Box><AppDatepicker selectsRange endDate={new Date()} inline className={classes.datepicker} onChange={() => { }} /></Box>
                    <Flex gap="8px">
                        <BasicButton width="40%" minWidth='auto' variant='outline'>Today</BasicButton>
                        <BasicButton width="60%" minWidth='auto'>Apply</BasicButton>
                    </Flex>
                </VStack>
            </Flex>
        </VStack>
    )
}

export default DashboardDatepicker