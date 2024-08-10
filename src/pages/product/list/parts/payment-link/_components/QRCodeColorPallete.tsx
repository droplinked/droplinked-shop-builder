import { Box, Flex, FormLabel, useRadio, useRadioGroup } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

const colorPalletes: { value: string, bgColor: string }[] = [
    { value: "light", bgColor: "#fff" },
    { value: "dark", bgColor: "#000" },
]

interface Props {
    selectedColorPallete: string;
    onColorPalleteChange: (colorPallete: string) => void
}

export default function QRCodeColorPallete({ selectedColorPallete, onColorPalleteChange }: Props) {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-color-pallete',
        onChange: (colorPallete: string) => onColorPalleteChange(colorPallete),
        value: selectedColorPallete
    })

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <AppTypography fontSize={16} fontWeight={500} color={"#fff"}>Color Pallete</AppTypography>
            <Flex alignItems={"center"} gap={2} {...getRootProps()}>
                {colorPalletes.map((theme, i) => <ColorPalleteRadio key={i} theme={theme} {...getRadioProps({ value: theme.value })} />)}
            </Flex>
        </Flex>
    )
}

function ColorPalleteRadio({ ...props }) {
    const { theme, ...radioProps } = props
    const { state: { isChecked }, getInputProps, getRadioProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel margin={0} cursor='pointer' {...htmlProps} {...getLabelProps()}>
            <input {...getInputProps()} hidden />
            <Box
                padding={1}
                borderWidth={isChecked ? "1.5px" : "1px"}
                borderColor={isChecked ? "#2BCFA1" : "#3C3C3C"}
                borderStyle={"solid"}
                borderRadius={"100%"}
                {...getRadioProps()}
            >
                <Box
                    width={4}
                    height={4}
                    borderRadius={"inherit"}
                    bgColor={theme.bgColor}
                />
            </Box>
        </FormLabel>
    )
}