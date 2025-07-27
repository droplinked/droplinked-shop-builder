import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { AISm } from 'assets/icons/AI'
import { SidebarexpandSm } from 'assets/icons/Action/SidebarExpand/SidebarexpandSm'
import { NotificationtrueSm } from 'assets/icons/System/NotificationTrue/NotificationtrueSm'
import { UserSm } from 'assets/icons/System/User/UserSm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

export default function PanelTitle() {
    const droplinkedTypographyDisplay = useBreakpointValue({ base: "block", xl: "none" })
    const { t } = useLocaleResources('public-pages/landings/social-quests')

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            paddingBlock={3}
            paddingInline={6}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="neutral.gray.1000"
        >
            <Text
                display={{ base: 'none', xl: 'block' }}
                fontSize={14}
                fontWeight={700}
                color="text.white"
            >
                {t('QuestsHeroBrowser.panelTitle.quest')}
            </Text>
            <Box
                display={{ base: 'block', xl: 'none' }}
                border="1px solid"
                borderColor="neutral.gray.1000"
                borderRadius="8px"
                padding={2}
            >
                <SidebarexpandSm color="#fff" />
            </Box>
            <DroplinkedTypography
                style={{ display: droplinkedTypographyDisplay, color: "#fff", width: "106px" }}
            />
            <Flex alignItems="center" gap={2}>
                <Flex
                    display={{ base: 'none', xl: 'flex' }}
                    alignItems="start"
                    gap={1}
                    paddingInline={3}
                    paddingBlock={2}
                    marginRight={2}
                    border="1px solid"
                    borderColor="neutral.gray.1000"
                    borderRadius="8px"
                    userSelect="none"
                >
                    <AISm color='#2BCFA1' />
                    <Text fontSize={12} fontWeight={500} color="text.primary">{t('QuestsHeroBrowser.panelTitle.aiAssistant')}</Text>
                </Flex>
                <Box
                    display={{ base: 'none', xl: 'block' }}
                    border="1px solid"
                    borderColor="neutral.gray.1000"
                    borderRadius="8px"
                    padding={2}
                >
                    <NotificationtrueSm color="#fff" />
                </Box>
                <Box
                    border="1px solid"
                    borderColor="neutral.gray.1000"
                    borderRadius="8px"
                    padding={2}
                >
                    <UserSm color="#fff" />
                </Box>
            </Flex>
        </Flex>
    )
}
