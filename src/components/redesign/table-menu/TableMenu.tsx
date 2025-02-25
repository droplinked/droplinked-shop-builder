import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import React, { ReactElement } from 'react';

interface Props {
    items: {
        icon: ReactElement,
        title: string,
        color?: string,
        onClick: () => void
    }[]
}

export default function TableMenu({ items }: Props) {
    return (
        <>
            <Menu isLazy>
                <MenuButton as="button" type="button">
                    <AppIcons.Dots />
                </MenuButton>
                <MenuList
                    border="1px solid #292929"
                    borderRadius={8}
                    padding={0}
                    overflow="hidden"
                    bgColor="#1C1C1C"
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
                        !!Object.keys(item).length && <MenuItem key={index} {...item}>{item.title}</MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}