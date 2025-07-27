import { FormLabel, InputGroup, Textarea } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { useFormikContext } from 'formik'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import React from 'react'
import { InvoiceFormSchema } from '../../helpers/helpers'

function InvoiceMemo() {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    const { values, setFieldValue } = useFormikContext<InvoiceFormSchema>()
    const maxCharacters = 100

    return (
        <InputGroup display="flex" flexDirection="column">
            <FormLabel margin={0} fontSize={16} color="white">{t('InvoiceMemo.label')}</FormLabel>
            <Textarea
                value={values.note}
                onChange={(e) => setFieldValue("note", e.target.value)}
                maxLength={maxCharacters}
                rows={3}
                mt={4}
                border="1px solid"
                borderColor="neutral.gray.800"
                paddingBlock={3}
                paddingInline={4}
                placeholder={t('InvoiceMemo.placeholder')}
                color="text.subtext.placeholder.dark"
                resize="none"
                _placeholder={{ color: "text.subtext.placeholder.dark" }}
                _hover={{}}
                _focus={{}}
                _focusVisible={{}}
            />
            <AppTypography
                mt={2}
                mr={4}
                alignSelf="flex-end"
                color="text.subtext.placeholder.dark"
                userSelect="none"
            >
                {values.note.length}/{maxCharacters}
            </AppTypography>
        </InputGroup>
    )
}

export default InvoiceMemo