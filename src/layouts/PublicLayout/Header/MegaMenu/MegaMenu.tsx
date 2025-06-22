import { Button, Flex, Grid, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, useBreakpointValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import publicMegaMenuItems from '../../../../data/publicMegaMenuItems'
import PlatformLink from '../PlatformLink'
import QuickLinks from '../QuickLinks'

export default function MegaMenu() {
    const [activeTab, setActiveTab] = useState(0)
    const isLgOrAbove = useBreakpointValue({ base: false, lg: true })
    const gridColumns = useBreakpointValue({ lg: 2, '2xl': 3 })

    // Return null if below lg breakpoint
    if (!isLgOrAbove) {
        return null
    }

    const handleTabChange = (index: number) => setActiveTab(index)

    const handleCloseAll = () => {
        // This will be handled by the Popover's onClose
    }

    return (
        <Popover trigger="hover" gutter={32}>
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
                width={{ xl: "calc(100vw - 32px)", "2xl": "calc(100vw - 48px)" }}
                maxWidth={{ xl: "calc(100vw - 32px)", "2xl": "calc(100vw - 48px)" }}
                border="none"
                borderRadius={16}
            >
                <PopoverBody padding={0} border="inherit" overflow="hidden">
                    <Flex>
                        {/* Left side - Tab buttons */}
                        <Flex direction="column" gap={2} padding={{ xl: 4, "2xl": 6 }} bgColor="neutral.websiteBackground">
                            {publicMegaMenuItems.map((item, index) => (
                                <Button
                                    key={item.label}
                                    variant="ghost"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    gap={3}
                                    padding={3}
                                    borderRadius={8}
                                    backgroundColor={activeTab === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
                                    color={activeTab === index ? 'text.primary' : 'text.white'}
                                    _hover={{
                                        backgroundColor: activeTab === index ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                                    }}
                                    onClick={() => handleTabChange(index)}
                                    transition="all 0.2s ease-in-out"
                                >
                                    {item.icon && React.cloneElement(item.icon({
                                        color: activeTab === index ? '#2bcfa1' : '#fff',
                                    }))}
                                    <Text fontSize={14} fontWeight={activeTab === index ? 500 : 400}>
                                        {item.label}
                                    </Text>
                                </Button>
                            ))}
                        </Flex>

                        {/* Right side - Links in Grid */}
                        <Grid
                            flex={1}
                            templateColumns={`repeat(${gridColumns}, 1fr)`}
                            gap={4}
                            padding={{ xl: 4, "2xl": 6 }}
                            bgColor="neutral.background"
                        >
                            {publicMegaMenuItems[activeTab].links.map((link) => (
                                <PlatformLink
                                    key={link.label}
                                    link={link}
                                    onCloseAll={handleCloseAll}
                                />
                            ))}
                        </Grid>
                    </Flex>
                    <QuickLinks />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}