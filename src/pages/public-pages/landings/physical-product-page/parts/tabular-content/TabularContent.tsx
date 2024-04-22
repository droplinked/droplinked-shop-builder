import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import CustomHeading from 'pages/public-pages/landings/parts/heading/Heading'
import TabsContainer from 'pages/public-pages/landings/parts/tabs-container/TabsContainer'
import React, { useState } from 'react'

function TabularContent() {
    const tabs = ["Inventory Management", "Custom Shipping", "Automated Shipping", "Warehouse"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const contentMap: { [key: string]: { title: string, description: string } } = {
        "Inventory Management": {
            title: "Managing Inventory On-chain",
            description: "Digitize and manage products in your blockchain-integrated storefronts",
        },
        "Custom Shipping": {
            title: "Custom Shipping",
            description: "Customizing shipping rates by region ensures cost-effective global delivery",
        },
        "Automated Shipping": {
            title: "Automated Shipping and Fulfillment",
            description: "Simplify shipping and fulfillment processes with our third-party shipping services",
        },
        "Warehouse": {
            title: "Warehouse Management System Integration",
            description: "WMS streamlines shipping, boosts accuracy, cuts costs, and ensures customer satisfaction",
        },
    }
    const { title, description } = contentMap[activeTab]

    return (
        <Flex width={"100%"} direction={"column"} alignItems={"center"} gap={12}>
            <TabsContainer tabs={tabs} activeTab={activeTab} setter={setActiveTab} />
            <Flex width={"100%"} justifyContent={"center"} direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={12}>
                {activeTab === "Inventory Management" && <Image flexShrink={0} src={"assets/images/physicalProduct/managing-inventory.png"} width={"253px"} height={"228px"} />}
                {activeTab === "Custom Shipping" && <Image flexShrink={0} src={"assets/images/physicalProduct/custom-shipping.png"} width={"253px"} height={"228px"} />}
                {activeTab === "Automated Shipping" && <Image flexShrink={0} src={"assets/images/physicalProduct/automated-shipping.png"} width={"253px"} height={"228px"} />}
                {activeTab === "Warehouse" && <Image flexShrink={0} src={"assets/images/physicalProduct/warehouse.png"} width={"253px"} height={"228px"} />}

                <Flex width={{ base: "100%", lg: "50%" }} direction={"column"} gap={6}>
                    <CustomHeading title={title} fontSize={36} textAlign={{ base: "center", lg: "start" }} />
                    <AppTypography fontSize={20} color={"#fff"} textAlign={{ base: "center", lg: "start" }}>{description}</AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default TabularContent