import React from 'react'
import SkuForm from '../../../form'
import AppModal from 'components/shared/modal/AppModal'
import { Box } from '@chakra-ui/react'

function SkuTableModal({ open, close, skuData }) {
    return (
        <AppModal
            open={open}
            close={close}
            contentProps={{
                maxWidth: "95%",
                width: "800px",
                bg: "#111"
            }}
        >
            <Box color={"#FFF"}>
                <SkuForm close={close} update={skuData} />
            </Box>
        </AppModal>
    )
}

export default SkuTableModal