import { Menu, MenuButton, MenuList, useDisclosure } from '@chakra-ui/react'
import { UserMd } from 'assets/icons/System/User/UserMd'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import MenuItemActions from './MenuItemActions'
import MenuItemAppVersion from './MenuItemAppVersion'
import MenuItemShopInfo from './MenuItemShopInfo'
import MenuItemShopSubscription from './MenuItemShopSubscription'

interface Props {
    trigger?: React.ReactNode
}

export const UserMenu = ({ trigger }: Props) => {
    const disclosure = useDisclosure()

    const defaultTrigger = (
        <IconWrapper
            width={10}
            height={10}
            bgColor="transparent"
            icon={<UserMd color='#fff' />}
        />
    )

    return (
        <Menu variant="unstyled" {...disclosure}>
            <MenuButton>
                {trigger || defaultTrigger}
            </MenuButton>

            <MenuList
                width="352px"
                border="none"
                borderRadius={16}
                padding={0}
                overflow="hidden"
                bgColor="neutral.gray.900"
                sx={{ ".menuItem": { padding: 4 } }}
            >
                <RuledGrid columns={1} borderColor="neutral.gray.750" nested>
                    <MenuItemShopInfo />
                    <MenuItemShopSubscription />
                    <MenuItemActions isMenuOpen={disclosure.isOpen} />
                    <MenuItemAppVersion />
                </RuledGrid>
            </MenuList>
        </Menu>
    )
}