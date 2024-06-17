import { useDisclosure } from '@chakra-ui/react'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import useHookStore from 'functions/hooks/store/useHookStore'
import { collectionService } from 'lib/apis/collection/services'
import { useCheckPermission } from 'lib/stores/app/appStore'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import CollectionsModel from './model'
import CollectionCreate from './parts/create/CollectionCreate'
import CollectionsEmpty from './parts/empty/CollectionsEmpty'

function Collections() {
    const checkPermissionAndShowToast = useCheckPermission()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { mutate, isLoading, data } = useMutation(() => collectionService())
    const [States, setStates] = useState({ search: null })
    const { data: { collection } } = useHookStore()

    const handleOpenCreateCollectionModal = () => {
        if (!checkPermissionAndShowToast("collection_management")) return
        onOpen()
    }

    const setSearch = useCallback((keyword: string) => setStates(prev => ({ ...prev, search: keyword })), [])

    useEffect(() => { mutate() }, [mutate])

    const fetch = useCallback(() => {
        mutate()
        collection.fetch()
    }, [collection, mutate])

    // Handle search and without search
    const rows = useMemo(() => {
        return data ? CollectionsModel.refactorData({
            data: data.data.data,
            fetch,
            search: States.search
        }) : []
    }, [States.search, data])

    return (
        <>
            <AppDataGrid
                loading={isLoading}
                buttons={[
                    {
                        caption: "Create Collection",
                        onClick: handleOpenCreateCollectionModal
                    }
                ]}
                rows={rows}
                search={{ onChange: (e) => setSearch(e.target.value) }}
                empty={<CollectionsEmpty handleOpenCreateCollectionModal={handleOpenCreateCollectionModal} />}
            />
            <CollectionCreate close={onClose} refetch={fetch} open={isOpen} />
        </>
    )
}

export default Collections