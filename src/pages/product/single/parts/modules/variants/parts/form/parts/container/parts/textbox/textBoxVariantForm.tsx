import { Box, Flex, InputRightElement, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useMemo } from 'react'
import { InputGroup } from 'react-bootstrap'
import variontFormContext from '../../../../context'
import ErrorLabel from 'components/shared/form/errorLabel/errorLabel'
import AppInput from 'components/shared/form/textbox/AppInput'

interface Iprops {
    field: string
    tiny: boolean
}

function TextBoxVariantForm(props: Iprops) {
    const { field, tiny } = props

    const { form } = useContext(variontFormContext)

    const textbox = useMemo(() => {
        return (
            <AppInput
                width={"100%"}
                name={field}
                value={form.values[field]}
                onChange={(e: any) => form.setFieldValue(field, e.target.value)}
                {...props}
                position="relative"
                fontSize={"14px"}
                style={{ backgroundColor: "#1c1c1c" }}
                border={"1px solid"}
                borderColor={form.errors[field] ? "red.200" : "transparent"}
                top={tiny ? 1 : 0}
                type={field === "externalID" ? "text" : "number"}
            />
        )
    }, [form, tiny])

    return (
        <VStack align={"stretch"}>
            <Box>
                {field === "Price" ? (
                    <InputGroup>
                        {textbox}
                        <InputRightElement h="100%" width="10%" children={
                            <Flex px={6} align="center" h="100%" borderLeft="1px solid" borderColor="line" color="lightGray">ETH</Flex>
                        }
                        />
                    </InputGroup>
                ) : textbox}
            </Box>
            {form.errors[field] && !tiny ? <Box><ErrorLabel message={form.errors[field]} /> </Box> : null}
        </VStack>
    )
}

export default TextBoxVariantForm