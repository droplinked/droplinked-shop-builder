import useAppStore from 'lib/stores/app/appStore'
import useDataStore from 'lib/stores/datas/dataStore'
import React from 'react'
import { useStore } from 'zustand'

function useHookStore() {
    const app = useStore(useAppStore)
    const data = useStore(useDataStore)

    const clearStore = () => {
        app.reset()
        data.reset()
    }

    return {
        app,
        data,
        clearStore
    }
}

export default useHookStore