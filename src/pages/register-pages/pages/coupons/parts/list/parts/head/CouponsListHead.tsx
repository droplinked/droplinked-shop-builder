import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import CouponsSettingContext from 'pages/register-pages/pages/coupons/context'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CouponsCreate from '../../../parts/create/CouponsCreate'

function CouponsListHead() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { updateFilters } = useContext(CouponsSettingContext)
    const [searchParams] = useSearchParams()
    const [Keyword, setKeyword] = useState(null)
    const search = searchParams.get('search')

    useEffect(() => search && setKeyword(search), [searchParams, search])

    const submit = useCallback((form: any) => {
        form.preventDefault()
        if (search === Keyword) return false

        updateFilters('search', Keyword)
    }, [Keyword])

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <form method="post" onSubmit={submit}>
                        <SearchDatagrid value={Keyword} onChange={e => setKeyword(e.target.value)} />
                    </form>
                </Box>
                <Box><BasicButton sizes="medium" onClick={onOpen}>Create Coupon</BasicButton></Box>
            </Flex>
            {isOpen && <CouponsCreate close={onClose} open={isOpen} />}
        </>
    )
}

export default CouponsListHead