import React, { useCallback } from 'react'

function useStack() {
    // const { isSignedIn, openAuthRequest } = useAuth()
    // const { openContractCall, isRequestPending } = useOpenContractCall()
    // const { stxAddress } = useAccount()

    const login = () => {
        // if (!isSignedIn) {
        //     try {
        //         return await openAuthRequest()
        //     } catch (error) {                
        //         window.open("https://www.xverse.app", "_blank")
        //         throw new Error("Please install xverse/hiro wallet")
        //     }
        // }
    }

    return {
        login,
        openContractCall: ()=>{},
        isRequestPending: false,
        stxAddress: ""
    }
}

export default useStack