import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import CustomHeading from 'pages/public-pages/landings/parts/heading/Heading'
import TabsContainer from 'pages/public-pages/landings/parts/tabs-container/TabsContainer'
import React, { useState } from 'react'

function TabularContent() {
    const tabs = ["Inventory Management", "Custom Shipping", "Automated Shipping", "Warehouse"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const contentMap: { [key: string]: { title: string, description: string, image: string } } = {
        "Inventory Management": {
            title: "Managing Inventory On-chain",
            description: "Digitize and manage products in your blockchain-integrated storefronts",
            image: "assets/images/physicalProduct/managing-inventory.png"
        },
        "Custom Shipping": {
            title: "Custom Shipping",
            description: "Digitize and manage products in your blockchain-integrated storefronts",
            image: "assets/images/physicalProduct/custom-shipping.png"
        },
        "Automated Shipping": {
            title: "Automated Shipping and Fulfillment",
            description: "Digitize and manage products in your blockchain-integrated storefronts",
            image: "assets/images/physicalProduct/automated-shipping.png"
        },
        "Warehouse": {
            title: "Warehouse Management System Integration",
            description: "Digitize and manage products in your blockchain-integrated storefronts",
            image: "assets/images/physicalProduct/warehouse.png"
        },
    }
    const { title, description, image } = contentMap[activeTab]

    return (
        <Flex width={"100%"} direction={"column"} alignItems={"center"} gap={12}>
            <TabsContainer tabs={tabs} activeTab={activeTab} setter={setActiveTab} />
            <Flex width={"100%"} direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={12}>
                <Image flexShrink={0} src={image} width={"253px"} height={"228px"} />
                <Flex flex={1} width={{ base: "100%", lg: "60%" }} direction={"column"} gap={6}>
                    <CustomHeading title={title} fontSize={36} textAlign={{ base: "center", lg: "start" }} />
                    <AppTypography fontSize={20} color={"#fff"} textAlign={{ base: "center", lg: "start" }}>{description}</AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default TabularContent