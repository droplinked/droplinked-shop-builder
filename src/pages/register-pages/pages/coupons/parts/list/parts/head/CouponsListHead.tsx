import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import React from 'react'
import CouponsCreate from '../../../parts/create/CouponsCreate'

function CouponsListHead() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center">
                <Box><SearchDatagrid onChange={() => { }} /></Box>
                <Box><BasicButton sizes="medium" onClick={onOpen}>Create Coupon</BasicButton></Box>
            </Flex>
            {isOpen && <CouponsCreate close={onClose} open={isOpen} />}
        </>
    )
}

export default CouponsListHead