import { Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import DesktopOnlyNotice from './DesignerPage/DesktopOnlyNotice'

function TemplateCreatePage() {
    const shouldShowDesktopNotice = useBreakpointValue({ base: true, lg: false })

    if (shouldShowDesktopNotice) return <DesktopOnlyNotice />

    return (
        <Text color="text.white">TemplateCreatePage</Text>
    )
}

export default TemplateCreatePage