import React from 'react'
import { Text, useBreakpointValue } from '@chakra-ui/react'
import DesktopOnlyNotice from './DesignerPage/DesktopOnlyNotice'

function TemplateEditPage() {
    const shouldShowDesktopNotice = useBreakpointValue({ base: true, lg: false })

    if (shouldShowDesktopNotice) return <DesktopOnlyNotice />

    return (
        <Text color="text.white">TemplateEditPage</Text>
    )
}

export default TemplateEditPage