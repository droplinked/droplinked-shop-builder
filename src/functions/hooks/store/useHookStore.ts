import useAppStore from 'lib/stores/app/appStore'
import { useStore } from 'zustand'

function useHookStore() {
    const app = useStore(useAppStore)
    const clearStore = () => app.reset()

    return { app, clearStore }
}

export default useHookStore