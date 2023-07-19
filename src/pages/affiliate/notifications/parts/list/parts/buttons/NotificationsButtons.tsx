import { useDisclosure } from '@chakra-ui/react'
import { IacceptRejectRequestService } from 'lib/apis/affiliate/interfaces'
import { acceptRejectRequestService } from 'lib/apis/affiliate/shopServices'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import RecordModalModule from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/recordFormModel'
import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import NotificationsModal from './parts/modal/NotificationsModal'
import requestsButtonsModel from './model/model'
import requestInterfaces from './interfaces'
import { requestsButtonsContext } from './context'
import RequestButtons from './parts/buttons/RequestButtons'
import ModalHashkey from './parts/hashkey/ModalHashkey'
import useAppToast from 'functions/hooks/toast/useToast'
import useStack from 'functions/hooks/stack/useStack'

function NotificationsButtons({ shop, refetch }: requestInterfaces.Iprops) {
    const { mutateAsync } = useMutation((params: IacceptRejectRequestService) => acceptRejectRequestService(params))
    const modal = useDisclosure()
    const modalHashKey = useDisclosure()
    const { showToast } = useAppToast()
    const { casper, stacks } = requestsButtonsModel
    const [States, setStates] = useState<requestInterfaces.IStates>({
        status: null,
        loading: false,
        deployHash: null,
        blockchain: null
    })
    const { login, isRequestPending, openContractCall, stxAddress } = useStack()

    const setLoading = useCallback((value: boolean) => setStates(prev => ({ ...prev, loading: value })), [])

    const closeModalHashkey = useCallback(() => {
        modalHashKey.onClose()
        refetch()
    }, [])

    const deploy = useCallback((deploy_hash: string, chain: string) => {
        return mutateAsync({
            chain,
            params: {
                deploy_hash,
                requestID: shop?._id,
                status: States.status === "accept" ? "ACCEPTED" : "REJECTED"
            }
        })
    }, [States.status, shop])

    const submit = useCallback(async () => {
        // console.log(shop);
        // return false
        try {
            const blockchain = shop.sku[0]?.recordData?.recordNetwork
            setLoading(true)
            let deploy_hash = ''

            if (blockchain === "CASPER") {
                const casperWallet = await RecordModalModule.openCasperWallet()
                const data = { shop, casperWallet }
                const request = States.status === "accept" ? await casper.approveRequest(data) : await casper.disapproveRequest(data)
                deploy_hash = request.deployHash
            } else if (blockchain === "STACKS") {
                await login()
                stacks.approve({ isRequestPending, openContractCall, params: { id: shop?.casperData?.details?.approved_id, publisher: stxAddress } })
            }
            await deploy(deploy_hash, blockchain)

            if (States.status === "accept") {
                modalHashKey.onOpen()
                setStates(prev => ({ ...prev, deployHash: deploy_hash, blockchain }))
            } else {
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
            <ModalHashkey close={closeModalHashkey} blockchain={States.blockchain} hashKey={States.deployHash} open={modalHashKey.isOpen} />
        </requestsButtonsContext.Provider>
    )
}

export default NotificationsButtons