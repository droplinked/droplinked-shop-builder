import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import Input from 'pages/invoice-management/components/Input'
import React from 'react'

function InvoiceContactInformation() {
    return (
        <Flex direction={"column"} gap={6}>
            <AppTypography fontSize={16} fontWeight={500} color={"white"}>Contact Information</AppTypography>
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                columnGap={6}
                rowGap={4}
            >
                <Input label='First name' inputProps={{ placeholder: "John" }} />
                <Input label='Last name' inputProps={{ placeholder: "Doe" }} />
                <Input label='Email' inputProps={{ placeholder: "JohnDoe@gmail.com" }} />
                <Input label='Phone Number' inputProps={{ placeholder: "+1 123 456 789" }} />
            </SimpleGrid>
        </Flex>
    )
}

export default InvoiceContactInformation