import { useAccount, useAuth, useOpenContractCall } from '@micro-stacks/react'
import React, { useCallback } from 'react'

function useStack() {
    const { isSignedIn, openAuthRequest } = useAuth()
    const { openContractCall, isRequestPending } = useOpenContractCall()
    const { stxAddress } = useAccount()

    const login = useCallback(async () => {
        if (!isSignedIn) {
            try {
                return await openAuthRequest()
            } catch (error) {                
                window.open("https://www.xverse.app", "_blank")
                throw new Error("Please install xverse wallet")
            }
        }
    }, [isSignedIn, openAuthRequest])

    return {
        login,
        openContractCall,
        isRequestPending,
        stxAddress
    }
}

export default useStack