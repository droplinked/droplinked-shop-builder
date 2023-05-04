import { Box, Flex, VStack } from '@chakra-ui/react'
import AppModal, { IAppModal } from 'components/shared/modal/AppModal'
import React from 'react'
import RequestModalButtons from './parts/buttons/RequestModalButtons'
import ModalRequestDetails from './parts/details/ModalRequestDetails'
import RequestQuantity from './parts/quantity/RequestQuantity'
import RequestSpecs from './parts/specs/RequestSpecs'

interface IProps extends IAppModal { }

function ModalRequest({ close, open }: IProps) {
    return (
        <AppModal close={close} open={open} contentProps={{padding: "60px"}} size="3xl">
            <VStack align={"stretch"} color="#FFF" spacing={8}>
                <Box><ModalRequestDetails /></Box>
                <Box><RequestSpecs /></Box>
                <Box><RequestQuantity /></Box>
                <Box><RequestModalButtons close={close} /></Box>
            </VStack>
        </AppModal>
    )
}

export default ModalRequest