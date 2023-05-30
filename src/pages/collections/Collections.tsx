import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import CollectionsModel from './model'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import CollectionsEmpty from './parts/empty/CollectionsEmpty'
import { collectionService } from 'lib/apis/collection/services'
import CollectionCreate from './parts/create/CollectionCreate'
import { useDisclosure } from '@chakra-ui/react'

function Collections() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { mutate, isLoading,data } = useMutation(() => collectionService())
    const [States, setStates] = useState({
        search: null
    })

    const setSearch = useCallback((keyword: string) => setStates(prev => ({ ...prev, search: keyword })), [])

    useEffect(() => mutate(), [mutate])

    // Handle search and without search
    const rows = useMemo(() => {
        return data ? CollectionsModel.refactorData({
            data: data.data.data,
            fetch: mutate,
            search: States.search
        }) : []
    }, [States.search, data])

    return (
        <>
            <AppDataGrid
                loading={isLoading}
                buttons={[
                    {
                        caption: "Add Collection",
                        onClick: onOpen
                    }
                ]}
                rows={rows}
                search={{ onChange: (e) => setSearch(e.target.value) }}
                empty={<CollectionsEmpty openModal={onOpen} />}
            />
            <CollectionCreate close={onClose} refetch={fetch} open={isOpen} />
        </>
    )
}

export default Collections