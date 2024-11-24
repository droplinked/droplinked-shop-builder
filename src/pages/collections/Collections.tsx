import { useDisclosure } from '@chakra-ui/react'
import useCollections from 'functions/hooks/useCollections/useCollections'
import { useCheckPermission } from 'lib/stores/app/appStore'
import React, { useMemo, useState } from 'react'
import CollectionsModel from './model'
import CollectionCreate from './parts/create/CollectionCreate'
import CollectionsEmpty from './parts/empty/CollectionsEmpty'
import CollectionReorderModal from './parts/collection-reorder-modal/CollectionReorderModal'
import AppDataGrid from 'components/redesign/datagrid/DataGrid'
import { FaPlus } from 'react-icons/fa6'

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
                        caption: "New Collection",
                        onClick: handleOpenCreateCollectionModal,
                        buttonProps: {
                            leftIcon: <FaPlus color='#000' />,
                            height: "36px",
                            borderRadius: "8px"
                        }
                    },
                    {
                        caption: "Visibility and reorder",
                        onClick: collectionReorderModal.onOpen,
                        buttonProps: {
                            variant: "solid",
                            backgroundColor: "#292929",
                            border: "none",
                            color: "#fff",
                            height: "36px",
                            borderRadius: "8px"
                        }
                    },
                ]}
                rows={rows}
                search={{ onChange: (e) => setSearchTerm(e.target.value) }}
                empty={<CollectionsEmpty handleOpenCreateCollectionModal={handleOpenCreateCollectionModal} />}
                title="Collections"
                description='Create and view inventory collections here.'
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