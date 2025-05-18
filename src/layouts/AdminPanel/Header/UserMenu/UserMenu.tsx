import { Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import { UserMd } from 'assets/icons/System/User/UserMd'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'

export const UserMenu = () => {
    const disclosure = useDisclosure()

    const menuItems = [
        { label: 'Profile', action: () => console.log('Profile clicked') },
        { label: 'Logout', action: () => console.log('Logout clicked') },
    ]

    return (
        <Menu variant="unstyled" {...disclosure}>
            <MenuButton>
                <IconWrapper width={10} height={10} bgColor="transparent" icon={<UserMd color='#fff' />} />
            </MenuButton>

            <MenuList
                width="352px"
                border="none"
                borderRadius={16}
                padding={0}
                backgroundColor="neutral.gray.900"
                overflow="hidden"
                sx={{ ".menuItem": { padding: 4 } }}
            >
                <RuledGrid columns={1} borderColor="neutral.gray.750" nested>
                    {menuItems.map((item) => (
                        <MenuItem key={item.label} onClick={item.action}>{item.label}</MenuItem>
                    ))}
                </RuledGrid>
            </MenuList>
        </Menu>
    )
}