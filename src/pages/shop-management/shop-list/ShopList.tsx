import { Flex, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import SimpleRegistrationModal from 'components/modals/simple-registration-modal/SimpleRegistrationModal'
import { getUserShopsService } from 'lib/apis/shop/shopServices'
import React from 'react'
import { useQuery } from 'react-query'
import EmptyBox from './_components/empty-box/EmptyBox'
import Loading from './_components/loading/Loading'
import ShopRow from './_components/shop-row/ShopRow'

function ShopList() {
    const { isFetching, data, refetch } = useQuery({
        queryFn: () => getUserShopsService(),
        queryKey: ["current-user-shops"],
        refetchOnWindowFocus: false
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex direction={"column"} gap={5}>
                <BasicButton marginBlock={3} alignSelf={"flex-end"} onClick={onOpen}>+ Create Store</BasicButton>
                {
                    isFetching ? <Loading /> :
                        !data.data.length ? <EmptyBox /> :
                            data.data.map(shop => <ShopRow key={shop._id} shop={shop} />)
                }
            </Flex>
            {isOpen && <SimpleRegistrationModal isOpen={isOpen} mode='CREATE_EXTRA_SHOP' close={onClose} refetchUserShops={refetch} />}
        </>
    )
}

export default ShopList