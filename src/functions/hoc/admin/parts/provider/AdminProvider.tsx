import useDataStore from 'lib/stores/datas/dataStore'
import React, { useEffect } from 'react'
import { useStore } from 'zustand'

function AdminProvider({ children }) {
  const { collection } = useStore(useDataStore)

  // Initial data state managment
  useEffect(() => {
    // if (!collection.loaded) collection.fetch()
  }, [collection])


  return children
}

export default AdminProvider