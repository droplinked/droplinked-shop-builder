import { useDisclosure } from '@chakra-ui/react'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import useCollections from 'functions/hooks/useCollections/useCollections'
import { useCheckPermission } from 'lib/stores/app/appStore'
import React, { useMemo, useState } from 'react'
import CollectionsModel from './model'
import CollectionCreate from './parts/create/CollectionCreate'
import CollectionsEmpty from './parts/empty/CollectionsEmpty'
import CollectionReorderModal from './parts/collection-reorder-modal/CollectionReorderModal'

function Collections() {
    const checkPermissionAndShowToast = useCheckPermission()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const collectionReorderModal = useDisclosure()
    const { isFetching, data, refetch } = useCollections()
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
                    },
                    {
                        caption: "Visibility and reorder",
                        onClick: collectionReorderModal.onOpen,
                        buttonProps: {
                            variant: "outline",
                        }
                    },
                ]}
                rows={rows}
                search={{ onChange: (e) => setSearchTerm(e.target.value) }}
                empty={<CollectionsEmpty handleOpenCreateCollectionModal={handleOpenCreateCollectionModal} />}
            />
            <CollectionCreate close={onClose} open={isOpen} />
            {
                collectionReorderModal.isOpen &&
                <CollectionReorderModal
                    isOpen={collectionReorderModal.isOpen}
                    close={() => {
                        collectionReorderModal.onClose()
                        refetch()
                    }}
                />
            }
        </>
    )
}

export default Collections