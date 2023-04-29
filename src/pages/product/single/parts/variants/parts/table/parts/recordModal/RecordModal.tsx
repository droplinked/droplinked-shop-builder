import { Box } from '@chakra-ui/react'
import AppModal from 'components/shared/modal/AppModal'
import React from 'react'

interface Iprops {
    open: boolean
    close: Function
}

function RecordModal({ close, open }: Iprops) {
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
                adssad
            </Box>
        </AppModal>
    )
}

export default RecordModal