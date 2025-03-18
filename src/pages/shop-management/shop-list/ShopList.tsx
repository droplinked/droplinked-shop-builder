import { Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import { getUserShopsService } from 'lib/apis/shop/shopServices'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import EmptyBox from './_components/empty-box/EmptyBox'
import Loading from './_components/loading/Loading'
import ShopRow from './_components/shop-row/ShopRow'

function ShopList() {
    const navigate = useNavigate()
    const { isFetching, error, data } = useQuery({
        queryFn: () => getUserShopsService(),
        queryKey: ["current-user-shops"]
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
                    <BasicButton alignSelf={"flex-end"} onClick={() => navigate("/onboarding?entry=store-details&origin=shop-management")}>+ Create Store</BasicButton>
                </Flex>
                <TabPanels>
                    <TabPanel
                        display={"flex"}
                        flexDirection={"column"}
                        gap={3}
                        border={"2px solid"}
                        borderColor="neutral.gray.700"
                        borderRadius={"32px"}
                        padding={"36px 40px"}
                    >
                        {renderContent()}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ShopList