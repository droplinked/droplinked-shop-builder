import { Flex } from '@chakra-ui/react'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import publicMegaMenuItems from 'data/publicMegaMenuItems'
import React from 'react'
import QuickLinks from '../../QuickLinks/QuickLinks'
import SlideDrawer from '../SlideDrawer'
import BackButton from './BackButton'
import PlatformLinksSection from './PlatformLinksSection'

interface Props {
    isOpen: boolean
    onClose: () => void
    onCloseAll: () => void
}

export default function PlatformSubmenu({ isOpen, onClose, onCloseAll }: Props) {
    return (
        <SlideDrawer isOpen={isOpen} top="72px" width="100%" overflow="auto">
            <RuledGrid columns={1} nested>
                <BackButton onClose={onClose} />

                <Flex
                    flexDirection="column"
                    gap={{ base: 4, md: 6 }}
                    padding={{ base: 4, md: 6 }}
                >
                    {publicMegaMenuItems.map(item => (
                        <PlatformLinksSection key={item.label} section={item} onCloseAll={onCloseAll} />
                    ))}
                </Flex>
            </RuledGrid>

            <QuickLinks position="sticky" bottom={0} />
        </SlideDrawer>
    )
} 