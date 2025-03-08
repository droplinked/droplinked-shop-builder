import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import DesktopPreview from './desktop/DesktopPreview';
import MobilePreview from './mobile/MobilePreview';

function ShopPreview() {
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");

    return (
        isSmallerThan1024 ? <MobilePreview /> : <DesktopPreview />
    )
}

export default ShopPreview