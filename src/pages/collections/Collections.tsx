import { useDisclosure } from '@chakra-ui/react'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import useCollections from 'functions/hooks/useCollections/useCollections'
import { useCheckPermission } from 'lib/stores/app/appStore'
import React, { useMemo, useState } from 'react'
import CollectionsModel from './model'
import CollectionCreate from './parts/create/CollectionCreate'
import CollectionsEmpty from './parts/empty/CollectionsEmpty'

function Collections() {
    const checkPermissionAndShowToast = useCheckPermission()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { isFetching, error, data } = useCollections()
    const [searchTerm, setSearchTerm] = useState("")

    const handleOpenCreateCollectionModal = () => {
        if (!checkPermissionAndShowToast("collection_management")) return
        onOpen()
    }

    const rows = useMemo(() => {
        const collections = data?.data
        return collections ? CollectionsModel.refactorData({
            data: collections,
            fetch,
            search: searchTerm
        }) : []
    }, [searchTerm, data])

    return (
        <>
            <AppDataGrid
                loading={isFetching}
                buttons={[
                    {
                        caption: "Create Collection",
                        onClick: handleOpenCreateCollectionModal
                    }
                ]}
                rows={rows}
                search={{ onChange: (e) => setSearchTerm(e.target.value) }}
                empty={<CollectionsEmpty handleOpenCreateCollectionModal={handleOpenCreateCollectionModal} />}
            />
            <CollectionCreate close={onClose} open={isOpen} />
        </>
    )
}

export default Collections