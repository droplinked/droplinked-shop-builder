import { Menu, MenuButton, MenuButtonProps, MenuItem, MenuList, PlacementWithLogical } from "@chakra-ui/react"
import { DotsLg } from "assets/icons/Navigation/Dots/DotsLg"
import React, { ReactElement } from 'react'

interface Props {
    placement?: PlacementWithLogical
    menuButtonProps?: MenuButtonProps
    items: {
        icon: ReactElement,
        title: string,
        color?: string,
        onClick: () => void,
        isDisabled?: boolean
    }[]
}

export default function TableMenu({ placement, menuButtonProps, items }: Props) {
    return (
        <>
            <Menu isLazy placement={placement}>
                <MenuButton type="button" {...menuButtonProps}>
                    <DotsLg color="#fff" />
                </MenuButton>
                <MenuList
                    borderColor="neutral.gray.800"
                    borderRadius={8}
                    padding={0}
                    overflow="hidden"
                    bgColor="neutral.gray.1000"
                    zIndex={10}
                >
                    {items.map((item, index) => (
                        !!Object.keys(item).length && (
                            <MenuItem
                                key={index}
                                display="flex"
                                alignItems="center"
                                gap={2}
                                borderBottom="inherit"
                                padding="12px 16px"
                                fontSize={16}
                                fontWeight={500}
                                color="text.white"
                                bgColor="inherit"
                                _last={{ borderBottom: "none" }}
                                sx={{ ".chakra-menu__icon-wrapper": { margin: 0 } }}
                                {...item}
                            >
                                {item.title}
                            </MenuItem>
                        )
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}