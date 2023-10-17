import { Box, Flex, useOutsideClick } from '@chakra-ui/react';
import AppColorPicker from 'components/common/colorPicker/AppColorPicker';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useRef, useState } from 'react'
import { SketchPicker } from 'react-color'

function HeaderIconsColor() {
    const [color, setColor] = useState("#aabbcc");

    return <AppColorPicker onChange={(color) => setColor(color)} value={color} />
}

export default HeaderIconsColor