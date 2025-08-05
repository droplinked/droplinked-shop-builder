import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { DotsLg } from "assets/icons/Navigation/Dots/DotsLg";
import React, { ReactElement } from 'react';
import RuledGrid from "../ruled-grid/RuledGrid";

/**
 * TableMenu Component - Dropdown menu for table row actions
 * 
 * Displays a three-dot menu button that reveals a list of action items
 * when clicked. Each item can have an icon, title, and action handler.
 * 
 * @param {object} props - Component props
 * @param {Array<object>} props.items - Array of menu items
 * @param {ReactElement} props.items[].icon - Icon element for the menu item
 * @param {string} props.items[].title - Text label for the menu item
 * @param {string} [props.items[].color] - Optional custom text color for the item
 * @param {function} props.items[].onClick - Click handler for the menu item
 * @param {boolean} [props.items[].isDisabled] - Whether the item is disabled
 */
interface Props {
    items: {
        icon: ReactElement,
        title: string,
        color?: string,
        isDisabled?: boolean,
        onClick: () => void
    }[]
}

export default function TableMenu({ items }: Props) {
    return (
        <Menu isLazy>
            <MenuButton as="button" type="button">
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
                <RuledGrid columns={1} nested>
                    {items.map((item, index) => {
                        if (!Object.keys(item).length) return null

                        return (
                            <MenuItem
                                key={index}
                                display="flex"
                                alignItems="center"
                                gap={2}
                                padding="12px 16px"
                                backgroundColor="inherit"
                                fontSize={14}
                                fontWeight={500}
                                cursor={item.isDisabled ? "not-allowed" : "pointer"}
                                {...item}
                                sx={{
                                    ".chakra-menu__icon-wrapper ": { margin: 0 }
                                }}
                            >
                                {item.title}
                            </MenuItem>
                        )
                    })}
                </RuledGrid>
            </MenuList>
        </Menu>
    )
}