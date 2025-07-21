import { Flex, SimpleGrid } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { useFormikContext } from 'formik';
import AppInput from 'components/redesign/input/AppInput';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/invoice-management/ar.json';
import enLocale from 'locales/invoice-management/en.json';
import React from 'react';
import { InvoiceFormSchema } from '../../helpers/helpers';

function InvoiceContactInformation() {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    const { values, errors, setFieldValue } = useFormikContext<InvoiceFormSchema>()

    const handleChange = (fieldPath: string) => (e) => setFieldValue(fieldPath, e.target.value)

    const contactFields = [
        { label: t('InvoiceContactInformation.fields.firstName'), name: 'address.firstName', placeholder: t('InvoiceContactInformation.placeholders.firstName'), value: values.address.firstName, error: errors.address?.firstName },
        { label: t('InvoiceContactInformation.fields.lastName'), name: 'address.lastName', placeholder: t('InvoiceContactInformation.placeholders.lastName'), value: values.address.lastName, error: errors.address?.lastName },
        { label: t('InvoiceContactInformation.fields.email'), name: 'email', placeholder: t('InvoiceContactInformation.placeholders.email'), value: values.email, error: errors.email },
        { label: t('InvoiceContactInformation.fields.phoneNumber'), name: 'address.phoneNumber', placeholder: t('InvoiceContactInformation.placeholders.phoneNumber'), value: values.address.phoneNumber, error: errors.address?.phoneNumber },
    ]

    return (
        <Flex direction="column" gap={6}>
            <AppTypography fontSize={16} fontWeight={500} color="white">
                {t('InvoiceContactInformation.title')}
            </AppTypography>

            <SimpleGrid columns={{ base: 1, md: 2 }} alignItems="flex-start" columnGap={6} rowGap={4}>
                {contactFields.map(({ label, name, placeholder, value, error }) => (
                    <AppInput
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