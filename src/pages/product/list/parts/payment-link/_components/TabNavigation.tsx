import { Box, Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { motion } from 'framer-motion'
import React from 'react'
import { TabOption } from '../PaymentLinkModal'

interface Props {
    currentTab: string
    onTabChange: (tab: TabOption) => void
}

const tabs: TabOption[] = ["Share", "Customize"]

function TabNavigation({ currentTab, onTabChange }: Props) {
    return (
        <Flex gap={6} mb={6} pb={2} borderBottom="1px solid #3C3C3C">
            {tabs.map((tab) => (
                <Box
                    key={tab}
                    position="relative"
                    cursor="pointer"
                    onClick={() => onTabChange(tab)}
                >
                    <AppTypography
                        fontSize={16}
                        fontWeight={tab === currentTab ? 500 : 400}
                        color={tab === currentTab ? '#FFFFFF' : '#7B7B7B'}
                        transition="all 0.2s"
                    >
                        {tab}
                    </AppTypography>
                    {tab === currentTab && (
                        <motion.div
                            layoutId="underline"
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                bottom: -9,
                                left: 0,
                                right: 0,
                                height: '2px',
                                borderRadius: '2px',
                                backgroundColor: '#FFFFFF',
                            }}
                        />
                    )}
                </Box>
            ))}
        </Flex>
    )
}

export default TabNavigation