import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import SimpleRegistrationModal from 'components/modals/simple-registration-modal/SimpleRegistrationModal'
import { getUserShopsService } from 'lib/apis/shop/shopServices'
import React from 'react'
import { useQuery } from 'react-query'
import EmptyBox from './_components/empty-box/EmptyBox'
import Loading from './_components/loading/Loading'
import ShopRow from './_components/shop-row/ShopRow'

function ShopList() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isFetching, error, data } = useQuery({
        queryFn: () => getUserShopsService(),
        queryKey: ["current-user-shops"],
        refetchOnWindowFocus: false
    })

    const renderContent = () => {
        if (isFetching) return <Loading />
        if (error) return <AppTypography fontSize={16} color={"red.400"}>Oops! It looks like we can not access shops at the moment. Give it another try soon?</AppTypography>
        const shops = data.data
        if (!shops.length) return <EmptyBox />
        return shops.map(shop => <ShopRow key={shop._id} shop={shop} />)
    }

    return (
        <>
            <Tabs variant='unstyled' display={"flex"} flexDirection={"column"} gap={5}>
                <Flex justifyContent={"space-between"} alignItems={"center"} paddingBlock={2}>
                    <TabList>
                        <Tab p={0}>
                            <BasicButton>Active Shops</BasicButton>
                        </Tab>
                    </TabList>
                    <BasicButton alignSelf={"flex-end"} onClick={onOpen}>+ Create Store</BasicButton>
                </Flex>
                <TabPanels>
                    <TabPanel
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                        border={"2px solid #3C3C3C"}
                        borderRadius={"32px"}
                        padding={"36px 40px"}
                    >
                        {renderContent()}
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {isOpen && <SimpleRegistrationModal isOpen={isOpen} mode='CREATE_EXTRA_SHOP' close={onClose} />}
        </>
    )
}

export default ShopList