import { useProfile } from 'hooks/useProfile/useProfile'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import CollectionsModel from './model'
import AppDataGrid from 'components/shared/datagrid/DataGrid'
import CollectionsEmpty from './parts/empty/CollectionsEmpty'
import { collectionService } from 'lib/apis/collection/services'

function Collections() {
    const { mutate, isLoading } = useMutation(() => collectionService())
    const [States, setStates] = useState({
        rows: []
    })
    const { shop } = useProfile()

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
        <AppDataGrid
            loading={isLoading}
            buttons={[
                {
                    caption: "Add Collection",
                    to: `/${shop.name}/c/add-product`
                }
            ]}
            rows={States.rows}
            empty={<CollectionsEmpty />}
        />
    )
}

export default Collections