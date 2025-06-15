import { Box, Flex, Popover, PopoverContent, PopoverTrigger, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const tabData = [
    {
        label: 'Platform Functionalities',
        content: 'Physical Inventory, Portable Supply Chain Management, Digital Goods and more...',
    },
    {
        label: 'Enterprise',
        content: 'DIMS+, Onchain Inventory Management, Metaverse Showroom...',
    },
    {
        label: 'Partners',
        content: 'Unstoppable Domains, D&D3...',
    },
]

export default function MegaMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const disclosure = useDisclosure()

    return (
        <Popover {...disclosure} placement="bottom-start">
            <PopoverTrigger>
                <Flex as="button" alignItems="center">

                </Flex>
            </PopoverTrigger>
            <PopoverContent w="3xl" p={0} bg="gray.800" borderRadius="md" boxShadow="xl">
                <Flex>
                    <Box bg="gray.700" p={4} w="200px">
                        <Tabs orientation="vertical" variant="unstyled">
                            <TabList>
                                {tabData.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        justifyContent="flex-start"
                                        _selected={{ bg: 'teal.700', color: 'white', fontWeight: 'semibold' }}
                                        _hover={{ bg: 'gray.600' }}
                                        borderRadius="md"
                                        p={3}
                                        color="gray.300"
                                    >
                                        {tab.label}
                                    </Tab>
                                ))}
                            </TabList>
                        </Tabs>
                    </Box>
                    <Box p={6} flex={1} bg="gray.800" color="white">
                        <Tabs>
                            <TabPanels>
                                {tabData.map((tab, index) => (
                                    <TabPanel key={index} p={0}>
                                        <Text fontSize="md">{tab.content}</Text>
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Flex>
            </PopoverContent>
        </Popover>
    )
}