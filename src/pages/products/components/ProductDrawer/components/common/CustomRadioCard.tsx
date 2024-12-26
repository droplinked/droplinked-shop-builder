import { Circle, Flex, FormLabel, FormLabelProps, Text, useRadio, UseRadioProps } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import React from 'react'

interface Props extends UseRadioProps {
    label: string
    description?: string
    tooltipText?: string
    containerProps?: FormLabelProps
}

function CustomRadioCard(props: Props) {
    const { label, description, tooltipText, containerProps, ...radioProps } = props
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

            <Flex width={"100%"} direction="column" gap={2} sx={{ p: { fontSize: 14 } }}>
                <Text fontWeight={500} color={isChecked ? "#2BCFA1" : "#fff"}>{label}</Text>
                {description && <Text color="#fff">{description}</Text>}
            </Flex>

            {tooltipText &&
                <AppTooltip flexShrink={0} placement='bottom-start' label={tooltipText}>
                    <AppIcons.TooltipIcon fill={isChecked ? "#2BCEA133" : "#292929"} />
                </AppTooltip>
            }
        </FormLabel>
    )
}

export default CustomRadioCard