import { Box, FormLabel, useRadio } from "@chakra-ui/react"
import React from "react"

function CollectionRadio({ ...props }) {
    const { label, ...radioProps } = props
    const { state: { isChecked }, getInputProps, getRadioProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel {...htmlProps} cursor='pointer' {...getLabelProps()}>
            <input {...getInputProps({})} hidden />
            <Box
                {...getRadioProps()}
                backgroundColor={isChecked ? "#2EC99E" : "#1C1C1C"}
                color={isChecked ? "#084836" : "#808080"}
                padding="6px 16px"
                borderRadius="100px"
                cursor="pointer"
            >
                {label}
            </Box>
        </FormLabel>
    )
}

export default CollectionRadio