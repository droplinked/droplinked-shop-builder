import { Box, Flex } from '@chakra-ui/react'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { SidebarcollapseMd } from 'assets/icons/Action/SidebarCollapse/SidebarcollapseMd'
import { SidebarexpandMd } from 'assets/icons/Action/SidebarExpand/SidebarexpandMd'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { HeaderContainer } from './HeaderContainer'
import { UserMenu } from './UserMenu/UserMenu'

const MobileHeader = () => {
    const { isSidebarOpen, toggleSidebar } = useProducerLayout()

    const sidebarIcon = isSidebarOpen
        ? <SidebarcollapseMd color="white" />
        : <SidebarexpandMd color="white" />

    return (
        <HeaderContainer flexDirection="column">
            <Flex
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor="neutral.gray.800"
                padding={4}
            >
                <IconWrapper
                    width={10}
                    height={10}
                    bg="transparent"
                    icon={sidebarIcon}
                    onClick={toggleSidebar}
                    aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                />
                <DroplinkedTypography color="white" width="127px" />
                <UserMenu />
            </Flex>
            <Box padding="12px 16px">
                <Breadcrumbs />
            </Box>
        </HeaderContainer>
    )
}

export default MobileHeader