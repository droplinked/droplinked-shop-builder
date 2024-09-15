import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { useFormikContext } from 'formik'
import Input from 'pages/invoice-management/components/Input'
import React from 'react'
import useInvoiceStore, { InvoiceFormSchema } from '../../store/invoiceStore'

function InvoiceContactInformation() {
    const areAllProductsDigital = useInvoiceStore(state => state.areAllProductsDigital)
    const { values, errors, setFieldValue } = useFormikContext<InvoiceFormSchema>()

    return (
        <Flex direction={"column"} gap={6}>
            <AppTypography fontSize={16} fontWeight={500} color={"white"}>Contact Information</AppTypography>
            <SimpleGrid
                columns={{ base: 1, md: areAllProductsDigital ? 1 : 2 }}
                alignItems={"flex-start"}
                columnGap={6}
                rowGap={4}
            >
                {!areAllProductsDigital && (
                    <>
                        <Input
                            label='First Name'
                            inputProps={{ name: "firstName", placeholder: "John", value: values.address.firstName, onChange: (e) => setFieldValue("address.firstName", e.target.value) }}
                            error={errors.address?.firstName}
                        />
                        <Input
                            label='Last Name'
                            inputProps={{ name: "lastName", placeholder: "Doe", value: values.address.lastName, onChange: (e) => setFieldValue("address.lastName", e.target.value) }}
                            error={errors.address?.lastName}
                        />
                    </>
                )}

                <Input
                    label='Email'
                    inputProps={{ name: "email", placeholder: "JohnDoe@gmail.com", value: values.email, onChange: (e) => setFieldValue("email", e.target.value) }}
                    error={errors.email}
                />

                {!areAllProductsDigital &&
                    <Input
                        label='Phone Number'
                        inputProps={{ height: "51px", name: "phoneNumber", placeholder: "+1 123 456 789", value: values.address.phoneNumber, onChange: (e) => setFieldValue("address.phoneNumber", e.target.value) }}
                        error={errors.address?.phoneNumber}
                    />
                }
            </SimpleGrid>
        </Flex>
    )
}

export default InvoiceContactInformation