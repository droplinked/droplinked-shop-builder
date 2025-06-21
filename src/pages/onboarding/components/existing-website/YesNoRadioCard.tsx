import { Center, Flex, FormLabel, Text, useRadio, UseRadioProps } from '@chakra-ui/react'
import { ChevronrightLg } from 'assets/icons/Navigation/ChevronRight/ChevronrightLg'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React from 'react'

interface Props extends UseRadioProps {
    label: string
    description: string
    icon: React.ReactNode
}

function YesNoRadioCard(props: Props) {
    const { label, description, icon, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    // Clone the icon and pass the color prop
    const iconWithColor = React.cloneElement(icon as React.ReactElement<any>, {
        color: isChecked ? "#2BCFA1" : "#FFF"
    })

    return (
        <FormLabel
            w="full"
            display="flex"
            gap={3}
            margin={0}
            border="1px solid"
            borderColor={isChecked ? "main.primary" : "neutral.gray.800"}
            borderRadius={16}
            padding={4}
            bgColor={isChecked ? "label.primary" : "unset"}
            cursor='pointer'
            {...htmlProps}
            {...getLabelProps()}
        >
            <input {...getInputProps()} hidden />

            <IconWrapper icon={iconWithColor} />

            <Flex flex={1} direction="column" gap={1}>
                <Text fontWeight={500} color="neutral.white">{label}</Text>
                <Text fontSize={14} color="text.subtext.placeholder.light">
                    {description}
                </Text>
            </Flex>

            <Center as='button' padding={3} opacity={isChecked ? 1 : 0}>
                <ChevronrightLg color='#2BCFA1' />
            </Center>
        </FormLabel>
    )
}

export default YesNoRadioCard 