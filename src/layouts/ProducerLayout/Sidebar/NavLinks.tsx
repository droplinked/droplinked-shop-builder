import { FlexProps } from '@chakra-ui/react'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import { getFilteredSidebarLinks } from 'data/producerSidebarLinks'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import LevelUpWidget from '../LevelUpWidget/LevelUpWidget'
import SidebarGroup from './SidebarGroup'

export default function NavLinks({ ...props }: FlexProps) {
    const { shop } = useAppStore()
    const { t } = useLocaleResources('layout/ProducerLayout')
    const sidebarLinks = getFilteredSidebarLinks(t, shop.hasCompletedQuests)

    return (
        <AppAccordion
            display="flex"
            flexDirection="column"
            gap={6}
            userSelect="none"
            {...props}
        >
            {sidebarLinks.map((sidebarGroup, index) => (
                <SidebarGroup key={index} sidebarGroup={sidebarGroup} />
            ))}
            <LevelUpWidget />
        </AppAccordion>
    )
}