import { Flex, Text } from '@chakra-ui/react'
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import SlideDrawer from './SlideDrawer'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function PlatformSubmenu({ isOpen, onClose }: Props) {
    return (
        <SlideDrawer
            isOpen={isOpen}
            lockBodyScroll
            top="72px"
            width="100%"
        >
            <RuledGrid columns={1} nested>
                <Flex
                    as="button"
                    alignItems="center"
                    gap={1}
                    padding={{ base: 4, md: "24px 36px" }}
                    fontSize={14}
                    fontWeight={500}
                    color="text.white"
                    onClick={onClose}
                >
                    <ChevronleftMd color='#fff' />
                    Back
                </Flex>

                <Flex>
                    <Text>
                        Platform
                    </Text>
                </Flex>
            </RuledGrid>
        </SlideDrawer>
    )
} 