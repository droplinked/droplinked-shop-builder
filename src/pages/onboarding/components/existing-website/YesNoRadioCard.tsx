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
            flexDirection={{ base: "column", md: "row" }}
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

            {/* Icons row - on mobile both icons are in one row, on desktop they're separated */}
            <Flex
                width={{ base: "full", md: "auto" }}
                direction={{ base: "row", md: "column" }}
                justifyContent={{ base: "space-between", md: "flex-start" }}
                alignItems={{ base: "center", md: "flex-start" }}
                gap={3}
            >
                <IconWrapper
                    icon={iconWithColor}
                    {...(isChecked && {
                        borderColor: "label.primary",
                        bgColor: "label.primary"
                    })}
                />

                <Center
                    display={{ base: "flex", md: "none" }}
                    padding={{ base: "10px", md: 3 }}
                    opacity={isChecked ? 1 : 0}
                >
                    <ChevronrightLg color='#2BCFA1' />
                </Center>
            </Flex>

            {/* Content container */}
            <Flex
                flex={1}
                direction="column"
                gap={1}
                order={{ base: 2, md: 1 }}
            >
                <Text fontWeight={500} color="neutral.white">{label}</Text>
                <Text fontSize={14} color="text.subtext.placeholder.light">{description}</Text>
            </Flex>

            {/* Desktop chevron - only visible on desktop */}
            <Center
                display={{ base: "none", md: "flex" }}
                padding={{ base: "10px", md: 3 }}
                opacity={isChecked ? 1 : 0}
                order={{ base: 1, md: 2 }}
            >
                <ChevronrightLg color='#2BCFA1' />
            </Center>
        </FormLabel>
    )
}

export default YesNoRadioCard 