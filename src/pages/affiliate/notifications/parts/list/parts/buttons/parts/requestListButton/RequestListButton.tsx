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
            width="100%"
            minWidth={"100%"}
            maxWidth="150px"
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