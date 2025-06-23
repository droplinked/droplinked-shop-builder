import { Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import publicMegaMenuItems from '../../../../data/publicMegaMenuItems'
import QuickLinks from '../QuickLinks'
import TabList from './TabList'
import TabPanel from './TabPanel'

export default function MegaMenu() {
    const [activeTab, setActiveTab] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const isLgOrAbove = useBreakpointValue({ base: false, lg: true })

    // Return null if below lg breakpoint
    if (!isLgOrAbove) return null

    const handleTabChange = (index: number) => setActiveTab(index)

    const handleNavigate = () => setIsOpen(false)

    return (
        <Popover
            trigger="hover"
            gutter={32}
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
        >
            <PopoverTrigger>
                <Text
                    as="button"
                    fontSize={14}
                    color="text.subtext.placeholder.dark"
                    _hover={{ color: 'text.white', textDecoration: 'none' }}
                    cursor="pointer"
                >
                    Platform
                </Text>
            </PopoverTrigger>
            <PopoverContent
                width={{ xl: "calc(100vw - 32px)", "2xl": "calc(1440px - 48px)" }}
                left={{ xl: "16px", "2xl": "24px" }}
                right={{ xl: "16px", "2xl": "24px" }}
                border="none"
                bg="none"
            >
                <PopoverBody
                    padding={0}
                    border="1px solid"
                    borderColor="neutral.gray.900"
                    borderRadius={16}
                    overflow="hidden"
                >
                    <Flex>
                        {/* Left side - Tab buttons */}
                        <TabList
                            items={publicMegaMenuItems}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />

                        {/* Right side - Links in Grid */}
                        <TabPanel
                            selectedTab={publicMegaMenuItems[activeTab]}
                            onNavigate={handleNavigate}
                        />
                    </Flex>
                    <QuickLinks />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}