import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import SpectrumHeader from '../_components/spectrum-header/SpectrumHeader'
import TabsContainer from './TabsContainer'

const tabContentMap = {
    "Inventory Management": {
        title: "Manage Inventory Onchain",
        description: "Digitize and manage catalogues with blockchain-integrated tools",
        imageSrc: "assets/images/physicalProduct/managing-inventory.png",
    },
    "Custom Shipping": {
        title: "Custom Shipping Methods",
        description: "Customized shipping rates by region to ensure cost-effective global delivery",
        imageSrc: "assets/images/physicalProduct/custom-shipping.png",
    },
    "Automated Shipping": {
        title: "Automated Shipping and Fulfillment",
        description: "Simplify shipping and fulfillment processes with our third-party shipping services",
        imageSrc: "assets/images/physicalProduct/automated-shipping.png",
    },
    "Warehouse Management": {
        title: "Warehouse Management System Integration",
        description: "WMS streamlines shipping, boosts accuracy and cuts costs to ensure customer satisfaction",
        imageSrc: "assets/images/physicalProduct/warehouse.png",
    },
}

export default function TabularContent() {
    const tabs = Object.keys(tabContentMap)
    const [activeTab, setActiveTab] = useState(tabs[0])

    return (
        <Flex width="100%" direction="column" alignItems="center" gap={12}>
            <TabsContainer tabs={tabs} activeTab={activeTab} setter={setActiveTab} />
            <TabContent activeTab={activeTab} />
        </Flex>
    )
}

const TabContent = ({ activeTab }) => {
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