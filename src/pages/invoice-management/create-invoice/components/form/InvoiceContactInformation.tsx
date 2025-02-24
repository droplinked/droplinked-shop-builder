import { Flex, SimpleGrid } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { useFormikContext } from 'formik';
import Input from 'components/redesign/input/Input';
import React from 'react';
import { InvoiceFormSchema } from '../../helpers/helpers';

function InvoiceContactInformation() {
    const { values, errors, setFieldValue } = useFormikContext<InvoiceFormSchema>()

    const handleChange = (fieldPath: string) => (e) => setFieldValue(fieldPath, e.target.value)

    const contactFields = [
        { label: 'First Name', name: 'address.firstName', placeholder: 'John', value: values.address.firstName, error: errors.address?.firstName },
        { label: 'Last Name', name: 'address.lastName', placeholder: 'Doe', value: values.address.lastName, error: errors.address?.lastName },
        { label: 'Email', name: 'email', placeholder: 'JohnDoe@gmail.com', value: values.email, error: errors.email },
        { label: 'Phone Number', name: 'address.phoneNumber', placeholder: '+1 123 456 789', value: values.address.phoneNumber, error: errors.address?.phoneNumber },
    ]

    return (
        <Flex direction="column" gap={6}>
            <AppTypography fontSize={16} fontWeight={500} color="white">
                Contact Information
            </AppTypography>

            <SimpleGrid columns={{ base: 1, md: 2 }} alignItems="flex-start" columnGap={6} rowGap={4}>
                {contactFields.map(({ label, name, placeholder, value, error }) => (
                    <Input
                        key={name}
                        label={label}
                        inputProps={{
                            name,
                            placeholder,
                            value,
                            onChange: handleChange(name)
                        }}
                        {...error && { state: "error", message: error }}
                        showErrorIcon={false}
                        stateColor='#E53E3E'
                    />
                ))}
            </SimpleGrid>
        </Flex>
    )
}

export default InvoiceContactInformation