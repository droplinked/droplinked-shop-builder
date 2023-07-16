import { useAuth } from '@micro-stacks/react'
import React, { useCallback } from 'react'

function useStack() {
    const { isSignedIn, openAuthRequest } = useAuth()

    const login = useCallback(async () => {
        if (!isSignedIn) {
            try {
                await openAuthRequest()
            } catch (error) {
                window.open("https://www.xverse.app", "_blank")
                throw new Error("Please install xverse wallet")
            }
        }
    }, [isSignedIn, openAuthRequest])

    return {
        login
    }
}

export default useStack