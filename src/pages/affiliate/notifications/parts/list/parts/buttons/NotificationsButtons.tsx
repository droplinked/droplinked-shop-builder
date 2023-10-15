import { useDisclosure } from '@chakra-ui/react'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useCallback, useState } from 'react'
import NotificationsModal from './parts/modal/NotificationsModal'
import requestInterfaces from './interfaces'
import { requestsButtonsContext } from './context'
import RequestButtons from './parts/buttons/RequestButtons'
import ModalHashkey from './parts/hashkey/ModalHashkey'
import useAppToast from 'functions/hooks/toast/useToast'
import useStack from 'functions/hooks/stack/useStack'
import useAppWeb3 from 'functions/hooks/web3/useWeb3'
import acceptModel from 'functions/hooks/web3/models/module/accept/acceptModel'

function NotificationsButtons({ shop, refetch }: requestInterfaces.Iprops) {
    const modal = useDisclosure()
    const modalHashKey = useDisclosure()
    const { showToast } = useAppToast()
    const { web3 } = useAppWeb3()
    const [States, setStates] = useState<requestInterfaces.IStates>({
        status: null,
        loading: false,
        deployHash: null,
        blockchain: null
    })
    const { isRequestPending, openContractCall } = useStack()

    const setLoading = useCallback((value: boolean) => setStates(prev => ({ ...prev, loading: value })), [])

    const closeModalHashkey = useCallback(() => {
        modalHashKey.onClose()
        refetch()
    }, [])

    const submit = useCallback(async () => {
        try {
            let blockchain = shop.sku[0]?.recordData?.recordNetwork
            setLoading(true)
            if (States.status === "accept") {
                const deploy_hash = await web3({ chain: blockchain, method: "accept", params: { shop, accept: States.status === "accept", stack: { isRequestPending, openContractCall } } })
                modalHashKey.onOpen()
                setStates(prev => ({ ...prev, deployHash: deploy_hash, blockchain }))
            } else {
                await acceptModel.deploy({ deployHash: null, accept: false, chain: blockchain, shop })
                refetch()
            }

            setLoading(false)
            modal.onClose()
            showToast(`Request status change ${capitalizeFirstLetter(States.status)}`, "success")
        } catch (error) {
            setLoading(false)
            if (error?.message && !error?.message.includes("The first argument")) showToast(error.message, "error")
        }
    }, [States.status, shop, refetch, modal])

    return (
        <requestsButtonsContext.Provider value={{ shop, modal: { open: modal.onOpen }, methods: { setStates } }}>
            <RequestButtons />
            <NotificationsModal
                status={States.status}
                loading={States.loading}
                close={modal.onClose}
                approveClick={submit}
                open={modal.isOpen}
            />
            <ModalHashkey close={closeModalHashkey} blockchain={States.blockchain} hashkey={States.deployHash} open={modalHashKey.isOpen} />
        </requestsButtonsContext.Provider>
    )
}

export default NotificationsButtons