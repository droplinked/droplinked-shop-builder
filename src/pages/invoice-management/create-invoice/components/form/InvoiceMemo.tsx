import { FormLabel, InputGroup, Textarea } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { useFormikContext } from 'formik'
import React from 'react'
import { InvoiceFormSchema } from '../../helpers/helpers'

function InvoiceMemo() {
    const { values, setFieldValue } = useFormikContext<InvoiceFormSchema>()
    const maxCharacters = 100

    return (
        <InputGroup
            display={"flex"}
            flexDirection={"column"}
        >
            <FormLabel margin={0} fontSize={16} color={"white"}>Memo</FormLabel>
            <Textarea
                value={values.note}
                maxLength={maxCharacters}
                rows={3}
                mt={4}
                border={"1px solid #292929"}
                paddingBlock={3}
                paddingInline={4}
                placeholder={"What’s up?"}
                color={"#7B7B7B"}
                resize={"none"}
                _placeholder={{ color: "#7B7B7B" }}
                _hover={{}}
                _focus={{}}
                _focusVisible={{}}
                onChange={(e) => setFieldValue("note", e.target.value)}
            ></Textarea>
            <AppTypography
                mt={2}
                mr={4}
                alignSelf={"flex-end"}
                color={"#7B7B7B"}
                userSelect={"none"}
            >
                {values.note.length}/{maxCharacters}
            </AppTypography>
        </InputGroup>
    )
}

export default InvoiceMemo