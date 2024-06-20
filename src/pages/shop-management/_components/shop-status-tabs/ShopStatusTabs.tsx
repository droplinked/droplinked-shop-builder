import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useState } from 'react'
import styles from "./styles.module.scss"

function ShopStatusTabs() {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <Tabs variant={"unstyled"} onChange={(index) => setTabIndex(index)}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <TabList>
                    <Tab mr={3} p={0}><BasicButton variant={tabIndex === 0 ? "solid" : "outline"}>Active Shops</BasicButton></Tab>
                    <Tab p={0}><BasicButton variant={tabIndex === 1 ? "solid" : "outline"}>Deactivated Shops</BasicButton></Tab>
                </TabList>

                <BasicButton>+ Create Store</BasicButton>
            </Flex>

            <TabPanels bgColor={"blue"} marginTop={5}>
                <TabPanel>
                    1
                </TabPanel>
                <TabPanel>2</TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ShopStatusTabs