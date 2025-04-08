import { Box, Flex, Text, Collapse } from '@chakra-ui/react'
import { ChevrondownLg } from 'assets/icons/Navigation/ChevronDown/ChevrondownLg'
import { ChevronupLg } from 'assets/icons/Navigation/ChevronUp/ChevronupLg'
import React, { ReactNode, useState } from 'react'

interface InfoAccordionProps {
    icon: ReactNode
    title: string
    description: string
    children: ReactNode
}

export default function ExpandableInfo({ icon, title, description, children }: InfoAccordionProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Box
            borderTop="1px solid #292929"
            p={{ base: 4, md: "24px 48px" }}
            transition="all 0.2s ease-in-out"
        >
            {/* Mobile Layout */}
            <Box display={{ base: 'block', md: 'none' }} onClick={() => setIsExpanded(!isExpanded)}>
                <Flex direction="column" gap={4}>
                    <Flex align="center" justify="space-between">
                        <Flex border="1px solid #292929" borderRadius="8px" p={3}>
                            {icon}
                        </Flex>
                        {isExpanded ? <ChevronupLg color='#fff' /> : <ChevrondownLg color='#fff' />}
                    </Flex>
                    <Box>
                        <Text fontSize={16} fontWeight={500} color="#fff">{title}</Text>
                        <Text fontSize={14} fontWeight={400} color="#B1b1b1">{description}</Text>
                    </Box>
                </Flex>
            </Box>

            {/* Desktop Layout */}
            <Box display={{ base: 'none', md: 'block' }} onClick={() => setIsExpanded(!isExpanded)}>
                <Flex justify="space-between" align="center">
                    <Flex gap={4} align="center">
                        <Flex border="1px solid #292929" borderRadius="8px" p={3}>
                            {icon}
                        </Flex>
                        <Box>
                            <Text fontSize={16} fontWeight={500} color="#fff">{title}</Text>
                            <Text fontSize={14} fontWeight={400} color="#B1b1b1">{description}</Text>
                        </Box>
                    </Flex>
                    {isExpanded ? <ChevronupLg color='#fff' /> : <ChevrondownLg color='#fff' />}
                </Flex>
            </Box>

            <Collapse
                in={isExpanded}
                animateOpacity
            >
                <Box
                    paddingBlock={{ base: 4, md: 6 }}
                    transition="all 0.3s ease-in-out"
                >
                    {children}
                </Box>
            </Collapse>
        </Box>
    )
}
