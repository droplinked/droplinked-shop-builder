import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { DotsLg } from "assets/icons/Navigation/Dots/DotsLg";
import React, { ReactElement } from 'react';

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
        onClick: () => void,
        isDisabled?: boolean,
    }[]
}

export default function TableMenu({ items }: Props) {
    return (
        <>
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
                    sx={{
                        "button": {
                            display: "flex",
                            alignItems: "center",
                            px: 4,
                            py: 3,
                            fontSize: 16,
                            fontWeight: 500,
                            bgColor: "inherit",
                            borderBottom: "inherit",
                            _last: { borderBottom: "none" }
                        }
                    }}
                >
                    {items.map((item, index) => (
                        !!Object.keys(item).length && <MenuItem isDisabled={item.isDisabled} key={index} {...item}>{item.title}</MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}