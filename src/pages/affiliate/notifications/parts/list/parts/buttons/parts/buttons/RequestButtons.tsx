import { Box, VStack } from '@chakra-ui/react'
import AppBadge from 'components/common/badge/AppBadge'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
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
            ) : <AppBadge text={capitalizeFirstLetter(shop?.status)} fontSize="10px" padding="6px 18px" whiteSpace="break-spaces" status={["REJECTED", "CANCELED"].includes(shop?.status) ? "red" : "green"} />}

        </VStack>
    )
}

export default RequestButtons