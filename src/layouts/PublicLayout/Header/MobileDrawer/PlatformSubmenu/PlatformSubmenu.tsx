import { Flex } from '@chakra-ui/react'
import getPublicMegaMenuItems from 'data/publicMegaMenuItems'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import BackButton from './BackButton'
import PlatformLinksSection from './PlatformLinksSection'
import QuickLinks from '../../QuickLinks'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import SlideDrawer from '../SlideDrawer'

interface Props {
    isOpen: boolean
    onClose: () => void
    onNavigate: () => void
}

function PlatformSubmenu({ isOpen, onClose, onNavigate }: Props) {
    const { t } = useLocaleResources('layout/PublicLayout')
    const publicMegaMenuItems = getPublicMegaMenuItems(t)

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
                        <PlatformLinksSection
                            key={item.label}
                            section={item}
                            onNavigate={onNavigate}
                        />
                    ))}
                </Flex>
            </RuledGrid>

            <QuickLinks position="sticky" bottom={0} />
        </SlideDrawer>
    )
}

export default PlatformSubmenu