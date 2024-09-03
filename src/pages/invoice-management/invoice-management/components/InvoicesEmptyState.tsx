import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function InvoicesEmptyState() {
    const navigate = useNavigate()

    return (
        <Flex mt={16} direction={"column"} alignItems={"center"}>
            <AppImage
                width={"220px"}
                height={"260px"}
                src='https://upload-file-droplinked.s3.amazonaws.com/8043d6e41e03dcb155f33d2a2ccde56ddcb02819e4e1c998e3285a271c3aeb24.png'
                alt='floating astronaut'
            />
            <AppTypography mt={16} fontSize={24} fontWeight={500} color={"white"}>Looks like space is empty</AppTypography>
            <AppTypography mt={2} fontSize={16} fontWeight={400} color={"white"}>Create an invoice to get started!</AppTypography>
            <AppTypography
                as={"button"}
                mt={4}
                display={"flex"}
                alignItems={"center"}
                gap={2}
                fontSize={14}
                color={"#2BCFA1"}
                onClick={() => navigate("/dashboard/invoice-management/create")}
                sx={{ "svg path": { "stroke": "#2BCFA1" } }}
            >
                <AppIcons.BlackPlus />
                New Invoice
            </AppTypography>
        </Flex>
    )
}

export default InvoicesEmptyState