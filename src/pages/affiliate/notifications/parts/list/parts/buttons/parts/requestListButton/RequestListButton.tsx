import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useContext } from 'react'
import { requestsButtonsContext } from '../../context'
import requestInterfaces from '../../interfaces'

interface Iprops {
    status: requestInterfaces.IApproveStatus
    value: string
    cancelType?: boolean
}

function RequestListButton({ status, value, cancelType }: Iprops) {
    const { modal, methods: { setStates } } = useContext(requestsButtonsContext)

    return (
        <BasicButton
            width="100%"
            maxWidth="150px"
            cancelType={cancelType}
            click={() => {
                setStates((prev: requestInterfaces.IStates) => ({ ...prev, status }))
                modal.open()
            }}
        >
            {value}
        </BasicButton>
    )
}

export default RequestListButton