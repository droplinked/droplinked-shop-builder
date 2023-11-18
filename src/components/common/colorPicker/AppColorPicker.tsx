import { Box, Flex, useOutsideClick } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useRef, useState } from 'react'
import { SketchPicker } from 'react-color'

interface IProps {
    value: string
    onChange(color: string): void
}

function AppColorPicker({ onChange, value }: IProps) {
    const [Toggle, setToggle] = useState(false);
    const ref = useRef()
    useOutsideClick({
        ref: ref,
        handler: () => setToggle(false),
    })

    return (
        <Flex gap="10px" backgroundColor="#141414" position="relative" padding="10px 20px" borderRadius="8px">
            <Box width="20px" cursor="pointer" height="20px" backgroundColor={value} onClick={() => setToggle(prev => !prev)}></Box>
            <AppTypography size="14px" color="#808080">{value}</AppTypography>
            {Toggle && <Box position="absolute" zIndex="1" top="30px" ref={ref}><SketchPicker color={value} onChange={(color) => onChange(color.hex)} /></Box>}
        </Flex>
    )
}

export default AppColorPicker