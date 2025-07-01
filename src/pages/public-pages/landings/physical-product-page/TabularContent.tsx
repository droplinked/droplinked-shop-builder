import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import { TFunction } from 'i18next'
import SpectrumHeader from '../_components/spectrum-header/SpectrumHeader'
import TabsContainer from './TabsContainer'

interface TabularContentProps {
    t: TFunction
}

const getTabContentMap = (t: TFunction) => ({
    [t('tabularContent.tabs.inventoryManagement')]: {
        title: t('tabularContent.content.inventoryManagement.title'),
        description: t('tabularContent.content.inventoryManagement.description'),
        imageSrc: "assets/images/physicalProduct/managing-inventory.png",
    },
    [t('tabularContent.tabs.customShipping')]: {
        title: t('tabularContent.content.customShipping.title'),
        description: t('tabularContent.content.customShipping.description'),
        imageSrc: "assets/images/physicalProduct/custom-shipping.png",
    },
    [t('tabularContent.tabs.automatedShipping')]: {
        title: t('tabularContent.content.automatedShipping.title'),
        description: t('tabularContent.content.automatedShipping.description'),
        imageSrc: "assets/images/physicalProduct/automated-shipping.png",
    },
    [t('tabularContent.tabs.warehouseManagement')]: {
        title: t('tabularContent.content.warehouseManagement.title'),
        description: t('tabularContent.content.warehouseManagement.description'),
        imageSrc: "assets/images/physicalProduct/warehouse.png",
    },
})

export default function TabularContent({ t }: TabularContentProps) {
    const tabContentMap = getTabContentMap(t)
    const tabs = Object.keys(tabContentMap)
    const [activeTab, setActiveTab] = useState<string>('')

    // Set the active tab once tabs are available
    React.useEffect(() => {
        if (tabs.length > 0 && !activeTab) {
            setActiveTab(tabs[0])
        }
    }, [tabs, activeTab])

    // Don't render until we have tabs and activeTab
    if (!tabs.length || !activeTab) {
        return null
    }

    return (
        <Flex width="100%" direction="column" alignItems="center" gap={12}>
            <TabsContainer tabs={tabs} activeTab={activeTab} setter={setActiveTab} />
            <TabContent activeTab={activeTab} tabContentMap={tabContentMap} />
        </Flex>
    )
}

interface TabContentProps {
    activeTab: string
    tabContentMap: Record<string, { title: string; description: string; imageSrc: string }>
}

const TabContent = ({ activeTab, tabContentMap }: TabContentProps) => {
    const { title, description, imageSrc } = tabContentMap[activeTab]

    return (
        <Flex
            width="100%"
            justifyContent="center"
            direction={{ base: "column", lg: "row" }}
            alignItems="center"
            gap={12}
        >
            <Image flexShrink={0} width="253px" height="228px" src={imageSrc} />

            <Flex
                width={{ base: "100%", lg: "50%" }}
                direction="column"
                alignItems={{ base: "center", lg: "flex-start" }}
                gap={6}
            >
                <SpectrumHeader fontSize={{ base: 20, lg: 28 }}>{title}</SpectrumHeader>
                <AppTypography fontSize={{ base: 16, xl: 18 }} color="#fff">{description}</AppTypography>
            </Flex>
        </Flex>
    )
}