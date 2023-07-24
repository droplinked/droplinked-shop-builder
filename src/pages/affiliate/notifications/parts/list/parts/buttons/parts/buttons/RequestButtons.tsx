import { Box, VStack } from '@chakra-ui/react'
import AppBadge from 'components/common/badge/AppBadge'
import React, { useContext } from 'react'
import { requestsButtonsContext } from '../../context'
import RequestListButton from '../requestListButton/RequestListButton'

function RequestButtons() {
    const { shop } = useContext(requestsButtonsContext)

    return (
        <VStack align="stretch" textAlign="center">
            {shop?.status === "PENDING" ? (
                <>
                    <Box><RequestListButton status={"accept"} value="Accept" /></Box>
                    <Box><RequestListButton status={"reject"} value="Deny" /></Box>
                </>
            ) : <AppBadge text={shop?.status} colorScheme={["REJECTED", "CANCELED"].includes(shop?.status) ? "red" : "green"} />}

        </VStack>
    )
}

export default RequestButtons