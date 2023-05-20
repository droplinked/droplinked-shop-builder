import { useDisclosure } from '@chakra-ui/react'
import { IacceptRejectRequestService } from 'lib/apis/affiliate/interfaces'
import { acceptRejectRequestService } from 'lib/apis/affiliate/shopServices'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import RecordModalModule from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/recordFormModel'
import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import NotificationsModal from './parts/modal/NotificationsModal'
import requestsButtonsModel from './model'
import requestInterfaces from './interfaces'
import { requestsButtonsContext } from './context'
import RequestButtons from './parts/buttons/RequestButtons'
import ModalHashkey from './parts/hashkey/ModalHashkey'

function NotificationsButtons({ shop, refetch }: requestInterfaces.Iprops) {
    const { mutateAsync } = useMutation((params: IacceptRejectRequestService) => acceptRejectRequestService(params))
    const modal = useDisclosure()
    const modalHashKey = useDisclosure()
    const { approveRequest, disapproveRequest } = requestsButtonsModel
    const [States, setStates] = useState<requestInterfaces.IStates>({
        status: null,
        loading: false,
        deployHash: null
    })

    const setLoading = useCallback((value: boolean) => setStates(prev => ({ ...prev, loading: value })), [])

    const closeModalHashkey = useCallback(() => {
        modalHashKey.onClose()
        refetch()
    }, [])

    const submit = useCallback(async () => {
        try {
            
            setLoading(true)
            const casperWallet = await RecordModalModule.openCasperWallet()
            const requestID = shop?._id
            const data = { shop, casperWallet }
            const request = States.status === "accept" ? await approveRequest(data) : await disapproveRequest(data)

            await mutateAsync({
                deploy_hash: request.deployHash,
                requestID: requestID,
                status: States.status === "accept" ? "ACCEPTED" : "REJECTED"
            })
            setLoading(false)
            modal.onClose()
            toast.success(`Request status change ${capitalizeFirstLetter(States.status)}`)
            
            if (States.status === "accept") {
                modalHashKey.onOpen()
                setStates(prev => ({ ...prev, deployHash: request.deployHash }))
            } else {
                refetch()
            }
        } catch (error) {
            setLoading(false)
            if (error?.message && !error?.message.includes("The first argument")) toast.error(error.message)
        }
    }, [States.status, shop, refetch, modal])

    return (
        <requestsButtonsContext.Provider value={{ shop, modal: { open: modal.onOpen }, methods: { setStates } }}>
            <RequestButtons />
            <NotificationsModal
                status={States.status}
                loading={States.loading}
                close={States.loading ? () => { } : modal.onClose}
                approveClick={submit}
                open={modal.isOpen}
            />
            <ModalHashkey close={closeModalHashkey} hashKey={States.deployHash} open={modalHashKey.isOpen} />
        </requestsButtonsContext.Provider>
    )
}

export default NotificationsButtons