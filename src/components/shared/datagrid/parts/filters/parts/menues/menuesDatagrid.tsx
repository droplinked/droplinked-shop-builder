import { Box, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

export interface IIMenuesDatagridItems {
    title: string
    list: Array<{
        title: string
        onClick: Function
    }>
}
export interface IMenuesDatagrid {
    item: Array<IIMenuesDatagridItems>
}

function MenuesDatagrid({ item }: IMenuesDatagrid) {
    return (
        <HStack spacing={8}>
            {item.map((el: IIMenuesDatagridItems, key) => (
                <Box key={key}>
                    <Menu isLazy>
                        <MenuButton fontSize={"sm"}>{el.title}</MenuButton>
                        <MenuList backgroundColor={"#1a1a1a"} borderColor="#2f2f2f" fontSize={"sm"}>
                            {el.list.map((item, key) => (
                                <MenuItem key={key} background={"none !important"}>{item.title}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </Box>
            ))}
        </HStack>
    )
}

export default MenuesDatagrid