import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import TextButton from 'pages/invoice-management/components/TextButton'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function InvoicesEmptyState() {
    const navigate = useNavigate()

    return (
        <Flex mt={12} direction={"column"} alignItems={"center"}>
            <AppImage
                width='220px'
                height='260px'
                src='https://upload-file-droplinked.s3.amazonaws.com/8043d6e41e03dcb155f33d2a2ccde56ddcb02819e4e1c998e3285a271c3aeb24.png'
                objectFit='cover'
                alt='floating astronaut'
            />
            <AppTypography mt={16} fontSize={24} fontWeight={500} color={"white"}>Looks like space is empty</AppTypography>
            <AppTypography mt={2} fontSize={16} fontWeight={400} color={"white"}>Create an invoice to get started!</AppTypography>
            <TextButton mt={4} onClick={() => navigate("/dashboard/invoice-management/create")}>
                <AppIcons.BlackPlus />
                New Invoice
            </TextButton>
        </Flex>
    )
}

export default InvoicesEmptyState