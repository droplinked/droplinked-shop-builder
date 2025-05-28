import { FlexProps } from '@chakra-ui/react'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import { getProducerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import SidebarGroup from './SidebarGroup'
import DashboardLayoutSidebarGrowthHack from '../LevelUpWidget/LevelUpWidget'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import enLocale from 'locales/layout/sidebar/en.json'
import arLocale from 'locales/layout/sidebar/ar.json'

export default function NavLinks({ ...props }: FlexProps) {
    const { t } = useLocaleResources('layout/sidebar', {
        en: enLocale,
        ar: arLocale
    })
    const sidebarLinks = getProducerSidebarLinks(t)

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
            <DashboardLayoutSidebarGrowthHack />
        </AppAccordion>
    )
}