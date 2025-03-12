import { Flex, FormLabel, useRadio, useRadioGroup } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { ScreenSize } from './PreviewModal'

interface Props {
    currentScreenSize: ScreenSize,
    onScreenSizeChange: (size: ScreenSize) => void
}

export default function PreviewModalScreenSize({ currentScreenSize, onScreenSizeChange }: Props) {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-screen-size',
        onChange: onScreenSizeChange,
        value: currentScreenSize
    })

    return (
        <Flex height={12} alignItems={"center"} gap={1} bg={"neutral.gray.100"} p={1} borderRadius={8} {...getRootProps()}>
            <ScreenSizeRadio icon={<AppIcons.Desktop />} text={"Desktop"} {...getRadioProps({ value: "desktop" })} />
            <ScreenSizeRadio icon={<AppIcons.Mobile />} text={"Mobile"} {...getRadioProps({ value: "mobile" })} />
        </Flex>
    )
}

function ScreenSizeRadio({ ...props }) {
    const { icon, text, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel height={"100%"} margin={0} cursor='pointer' {...htmlProps} {...getLabelProps()}>
            <input {...getInputProps()} hidden />
            <Flex
                width={{ base: "100px", md: "120px", xl: "140px" }}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"6px"}
                borderRadius={8}
                bg={isChecked ? "#fff" : "transparent"}
                transition={"all 0.2s"}
                sx={{
                    "*": { transition: "all 0.2s" },
                    "svg path": { stroke: isChecked ? "#000" : "#BCBCBC" }
                }}
            >
                {icon}
                <AppTypography fontSize={14} fontWeight={isChecked ? 500 : 400} color={isChecked ? "#000" : "#BCBCBC"}>
                    {text}
                </AppTypography>
            </Flex>
        </FormLabel>
    )
}