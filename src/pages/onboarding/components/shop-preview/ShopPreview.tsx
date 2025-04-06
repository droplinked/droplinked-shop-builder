import { useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import MobilePreviewDrawer from './MobilePreviewDrawer'
import DesktopPreview from './DesktopPreview'

function ShopPreview() {
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)")

    return (
        isSmallerThan1024 ? <MobilePreviewDrawer /> : <DesktopPreview />
    )
}

export default ShopPreview