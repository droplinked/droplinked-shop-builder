import { Flex, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import CreateShopModal from 'components/modals/create-shop-modal/CreateShopModal'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getUserShopsService } from 'services/shop/shopServices'
import EmptyBox from './components/EmptyBox'
import Loading from './components/Loading'
import ShopRow from './components/ShopRow'

function ShopList() {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                    <BasicButton alignSelf={"flex-end"} onClick={onOpen}>+ Create Store</BasicButton>
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
            {isOpen && (
                <CreateShopModal
                    isOpen={isOpen}
                    mode='CREATE_EXTRA_SHOP'
                    close={onClose}
                    onSuccess={() => navigate("/analytics")}
                />
            )}
        </>
    )
}

export default ShopList