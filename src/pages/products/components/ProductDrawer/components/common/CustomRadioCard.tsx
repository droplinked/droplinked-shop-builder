import { Box, Circle, Flex, FormLabel, FormLabelProps, Text, useRadio, UseRadioProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props extends UseRadioProps {
    label: string
    description?: string
    containerProps?: FormLabelProps
    rightContent?: ReactNode
}

function CustomRadioCard(props: Props) {
    const { label, description, containerProps, rightContent, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel
            w="full"
            display="flex"
            gap={3}
            margin={0}
            padding={4}
            borderRadius={8}
            border="1.5px solid"
            borderColor={isChecked ? "#2BCFA1" : "#292929"}
            cursor='pointer'
            {...containerProps}
            {...htmlProps}
            {...getLabelProps()}
        >
            <input {...getInputProps()} hidden />
            <Circle size={5} border="1px solid" borderColor={isChecked ? "#2BCFA1" : "#fff"}>
                <Circle size={2.5} bgColor="#2BCFA1" opacity={isChecked ? 1 : 0} />
            </Circle>

            <Flex flex={1} direction="column" gap={2} sx={{ p: { fontSize: 14 } }}>
                <Text fontWeight={500} color={isChecked ? "#2BCFA1" : "#fff"}>{label}</Text>
                {description && <Text color="#fff">{description}</Text>}
            </Flex>

            <Box flexShrink={0}>
                {rightContent}
            </Box>
        </FormLabel>
    )
}

export default CustomRadioCard