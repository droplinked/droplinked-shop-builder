import { Box, Flex, VStack } from '@chakra-ui/react'
import ErrorLabel from 'components/common/form/errorLabel/errorLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext, useMemo } from 'react'
import variontFormContext from '../../../../context'

interface Iprops {
    field: string
    tiny?: boolean
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
            <Box position={"relative"}>
                {field === "price" ? (
                    <>
                        {textbox}
                        <Flex position={"absolute"} top={0} bottom={0} margin="auto" right={0} height="90%" borderLeft="1px solid" padding={"15px 15px 10px 15px"} borderColor="line" alignItems={"center"}>
                            <AppTypography fontSize='14px'>USD</AppTypography>
                        </Flex>
                    </>
                ) : textbox}
            </Box>
            {form.errors[field] && !tiny ? <Box><ErrorLabel message={form.errors[field]} /> </Box> : null}
        </VStack>
    )
}

export default TextBoxVariantForm