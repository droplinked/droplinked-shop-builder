import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import plusIcon from "assest/icon/plus-icon.svg";
import classes from './style.module.scss'

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
                <Box><Image src={plusIcon} h="48px" w="48px" /></Box>
                <Box><Text fontWeight="500" fontSize="18px">{add.caption}</Text></Box>
            </VStack>
            <VStack width={"100%"} maxWidth={"400px"} align={"stretch"} spacing={3}>
                {list.map((el, key) => (
                    <HStack key={key} className={classes.item}>
                        {el.icon}
                        <Text fontFamily="Avenir Next" fontWeight="400" fontSize="14px" color="#C2C2C2">{el.label}</Text>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    )
}

export default EmptyTable