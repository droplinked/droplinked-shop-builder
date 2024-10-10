import { Flex, Heading } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

function InvoiceManagementHeader() {
    const navigate = useNavigate()

    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            gap={{ base: 4, md: 0 }}
        >
            <Flex direction={"column"} gap={1}>
                <Heading as={"h2"} fontSize={28} fontWeight={600} color={"white"}>Invoice management</Heading>
                <AppTypography fontSize={16} color={"#878787"}>Create, view, and track all invoices in one place.</AppTypography>
            </Flex>

            <Button onClick={() => navigate("/analytics/invoice-management/create")}>
                <AppIcons.BlackPlus />
                <AppTypography>New Invoice</AppTypography>
            </Button>
        </Flex>
    )
}

export default InvoiceManagementHeader