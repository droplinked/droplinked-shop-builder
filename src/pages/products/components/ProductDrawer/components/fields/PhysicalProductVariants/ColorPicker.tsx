import { Box, Flex, FlexProps, Popover, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react"
import React from "react"
import { SketchPicker } from "react-color"

interface ColorPickerProps {
    color: string
    onColorChange: (color: string) => void
    containerProps?: FlexProps
}

function ColorPicker({ color, onColorChange, containerProps }: ColorPickerProps) {
    return (
        <Popover placement="bottom-start" closeOnBlur>
            <PopoverTrigger>
                <Flex
                    alignItems="center"
                    gap={2}
                    border="1px solid #292929"
                    borderRadius={8}
                    padding={3}
                    cursor="pointer"
                    userSelect="none"
                    transition="border-color 0.1s ease-out"
                    _hover={{ borderColor: "#3C3C3C" }}
                    {...containerProps}
                >
                    <Box
                        flexShrink={0}
                        width={5}
                        height={5}
                        backgroundColor={color}
                        borderRadius="4px"
                    />
                    <Text width="75px" fontSize={14} color="#FFF">{color}</Text>
                </Flex>
            </PopoverTrigger>

            <PopoverContent
                w="auto"
                p={0}
                border="none"
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                borderRadius="8px"
                zIndex={9999}
            >
                <SketchPicker
                    color={color}
                    onChange={(updatedColor) => onColorChange(updatedColor.hex)}
                    disableAlpha
                />
            </PopoverContent>
        </Popover>
    )
}

export default ColorPicker