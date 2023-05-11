import AppBadge from 'components/shared/badge/AppBadge'
import React, { useContext, useMemo } from 'react'
import { requestsButtonsContext } from '../../context'
import RequestListButton from '../requestListButton/RequestListButton'

function RequestButtons() {
    const { shop } = useContext(requestsButtonsContext)

    const buttons = useMemo(() => {
        switch (shop?.status) {
            case "PENDING":
                return  <AppBadge text={shop?.status} colorScheme="yellow" />
            case "ACCEPTED":
                return <RequestListButton status={"reject"} value="Deny" cancelType />
            default:
                return <AppBadge text={shop?.status} colorScheme={["REJECTED", "CANCELED"].includes(shop?.status) ? "red" : "green"} />
        }
    }, [shop?.status])

    return buttons
}

export default RequestButtons