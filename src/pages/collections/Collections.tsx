import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import CollectionsModel from './model'
import AppDataGrid from 'common/datagrid/DataGrid'
import CollectionsEmpty from './parts/empty/CollectionsEmpty'
import { collectionService } from 'lib/apis/collection/services'
import CollectionCreate from './parts/create/CollectionCreate'
import { useDisclosure } from '@chakra-ui/react'

function Collections() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { mutate, isLoading } = useMutation(() => collectionService())
    const [States, setStates] = useState({
        rows: []
    })

    // fetch data and refactor
    const fetch = useCallback(() => {
        mutate(null, {
            onSuccess: (res) => {
                setStates(prev => ({
                    ...prev, rows: CollectionsModel.refactorData({
                        data: res.data.data,
                        fetch
                    })
                }))
            }
        })
    }, [])

    useEffect(() => fetch(), [mutate])

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
                rows={States.rows}
                empty={<CollectionsEmpty openModal={onOpen} />}
            />
            <CollectionCreate close={onClose} refetch={fetch} open={isOpen} />
        </>
    )
}

export default Collections