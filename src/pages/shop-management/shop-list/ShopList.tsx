import { Flex, useDisclosure } from '@chakra-ui/react'
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
    const { isFetching, error, data, refetch } = useQuery({
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
            <Flex direction={"column"} gap={5}>
                <BasicButton marginBlock={3} alignSelf={"flex-end"} onClick={onOpen}>+ Create Store</BasicButton>
                {renderContent()}
            </Flex>
            {isOpen && <SimpleRegistrationModal isOpen={isOpen} mode='CREATE_EXTRA_SHOP' close={onClose} refetchUserShops={refetch} />}
        </>
    )
}

export default ShopList