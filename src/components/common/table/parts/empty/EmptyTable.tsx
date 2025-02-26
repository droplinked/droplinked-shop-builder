import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import classes from './style.module.scss';
import AppIcons from 'assets/icon/Appicons';

interface IEmptyTable {
    add: {
        caption: string
        onClick: Function
    }
    list: Array<{
        icon: any
        label: string
    }>
}

function EmptyTable({ add, list }: IEmptyTable) {
    return (
        <VStack color="#fff" spacing={10} borderTop={"1px solid #2a2a2a"} padding={10}>
            <VStack
                bg="subLayer"
                borderRadius="8px"
                cursor="pointer"
                padding={"30px"}
                spacing={3}
                marginTop={7}
                onClick={() => add.onClick()}
            >
                <Box><AppIcons.PlusIcon width="48" height="48" /></Box>
                <Box><Text fontWeight="500" fontSize="18px">{add.caption}</Text></Box>
            </VStack>
            <VStack align={"stretch"} spacing={3}>
                {list.map((el, key) => (
                    <HStack key={key} alignItems={"center"} spacing={5} className={classes.item}>
                        {el.icon}
                        <AppTypography fontSize={14} fontWeight={400} color="#C2C2C2">{el.label}</AppTypography>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    )
}

export default EmptyTable