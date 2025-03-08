import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import MobilePreview from './MobilePreview';
import DesktopPreview from './DesktopPreview';

function ShopPreview() {
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");

    return (
        isSmallerThan1024 ? <MobilePreview /> : <DesktopPreview />
    )
}

export default ShopPreview