import { FormLabel, InputGroup, Textarea } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { useFormikContext } from 'formik'
import React from 'react'
import { InvoiceFormSchema } from '../../helpers/helpers'

function InvoiceMemo() {
    const { values, setFieldValue } = useFormikContext<InvoiceFormSchema>()
    const maxCharacters = 100

    return (
        <InputGroup display="flex" flexDirection="column">
            <FormLabel margin={0} fontSize={16} color="white">Memo</FormLabel>
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
                placeholder="What’s up?"
                color="text.subtextPlaceholder.dark"
                resize="none"
                _placeholder={{ color: "text.subtextPlaceholder.dark" }}
                _hover={{}}
                _focus={{}}
                _focusVisible={{}}
            />
            <AppTypography
                mt={2}
                mr={4}
                alignSelf="flex-end"
                color="text.subtextPlaceholder.dark"
                userSelect="none"
            >
                {values.note.length}/{maxCharacters}
            </AppTypography>
        </InputGroup>
    )
}

export default InvoiceMemo