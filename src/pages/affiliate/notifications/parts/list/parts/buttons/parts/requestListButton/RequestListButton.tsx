import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useContext } from 'react'
import { requestsButtonsContext } from '../../context'
import requestInterfaces from '../../interfaces'

interface Iprops {
    status: requestInterfaces.IApproveStatus
    value: string
}

function RequestListButton({ status, value }: Iprops) {
    const { modal, methods: { setStates } } = useContext(requestsButtonsContext)

    return (
        <BasicButton
            width="110px"
            sizes="medium"
            variant={status === "reject" ? 'outline' : 'solid'}
            onClick={() => {
                setStates((prev: requestInterfaces.IStates) => ({ ...prev, status }))
                modal.open()
            }}
        >
            {value}
        </BasicButton>
    )
}

export default RequestListButton