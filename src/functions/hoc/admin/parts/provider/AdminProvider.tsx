import useDataStore from 'lib/stores/datas/dataStore'
import React, { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useStore } from 'zustand'
import { collectionService } from 'lib/apis/collection/services';

function AdminProvider({ children }) {
  const collectionMutate = useMutation(() => collectionService())
  const { collection } = useStore(useDataStore)

  const getCollection = useCallback(async () => {
    collectionMutate.mutate(null, {
      onSuccess: (res) => useDataStore.setState({ collection: { data: res.data?.data || null, fetch: true } })
    })
  }, [])

  useEffect(() => {    
    if (!collection.fetch) getCollection()
  }, [collection])


  return children
}

export default AdminProvider