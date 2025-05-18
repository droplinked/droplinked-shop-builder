import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'

export const Dropdown = () => {
    const menuItems = [
        { label: 'Profile', action: () => console.log('Profile clicked') },
        { label: 'Logout', action: () => console.log('Logout clicked') },
    ]

    return (
        <Menu>
            <MenuButton as={Button}>Actions</MenuButton>
            <MenuList>
                {menuItems.map((item) => (
                    <MenuItem key={item.label} onClick={item.action}>{item.label}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}