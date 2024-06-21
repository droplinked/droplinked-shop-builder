import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useState } from 'react'
import EmptyBox from './_components/empty-box/EmptyBox'

function ShopList() {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <Tabs variant={"unstyled"} onChange={(index) => setTabIndex(index)}>
            <Flex justifyContent={"space-between"} alignItems={"center"} paddingBlock={3}>
                <TabList>
                    <Tab mr={3} p={0}><BasicButton variant={tabIndex === 0 ? "solid" : "outline"}>Active Shops</BasicButton></Tab>
                    <Tab p={0}><BasicButton variant={tabIndex === 1 ? "solid" : "outline"}>Deactivated Shops</BasicButton></Tab>
                </TabList>

                <BasicButton>+ Create Store</BasicButton>
            </Flex>

            <TabPanels
                marginTop={5}
                border={"2px solid rgba(128, 128, 128, 0.10)"}
                borderRadius={30}
            >
                <TabPanel>
                    {/* <Flex direction={"column"} gap={2} padding={9}>
                    </Flex> */}
                    <EmptyBox tab='active' />
                </TabPanel>
                <TabPanel>
                    {/* <Flex direction={"column"} gap={2} padding={9}>
                    </Flex> */}
                    <EmptyBox tab='inactive' />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ShopList