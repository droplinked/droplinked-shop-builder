import { Flex, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import CustomHeading from 'pages/public-pages/landings/parts/heading/Heading'
import TabsContainer from 'pages/public-pages/landings/parts/tabs-container/TabsContainer'
import React, { useState } from 'react'

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

const TabularContent = () => {
    const tabs = Object.keys(tabContentMap)
    const [activeTab, setActiveTab] = useState(tabs[0])
    const { title, description, imageSrc } = tabContentMap[activeTab]

    return (
        <Flex width="100%" direction="column" alignItems="center" gap={12}>
            <TabsContainer tabs={tabs} activeTab={activeTab} setter={setActiveTab} />
            <Flex
                width="100%"
                justifyContent="center"
                direction={{ base: "column", lg: "row" }}
                alignItems="center"
                gap={12}
            >
                <Image
                    flexShrink={0}
                    src={imageSrc}
                    width="253px"
                    height="228px"
                />
                <Flex width={{ base: "100%", lg: "50%" }} direction="column" gap={6}>
                    <CustomHeading title={title} fontSize={36} textAlign={{ base: "center", lg: "start" }} />
                    <AppTypography fontSize={20} color="#fff" textAlign={{ base: "center", lg: "start" }}>
                        {description}
                    </AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default TabularContent