import useHookStore from 'functions/hooks/store/useHookStore'
import React, { useEffect } from 'react'

function AdminProvider({ children }) {
  const { data: { collection } } = useHookStore()

  // Initial data state managment
  useEffect(() => {
    if (!collection.loaded) collection.fetch()
  }, [collection])

  return children
}

export default AdminProvider