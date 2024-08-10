import { Box } from '@chakra-ui/react';
import AppModal from 'components/common/modal/AppModal';
import React, { useState } from 'react';
import QRCodeColorPallete from './_components/QRCodeColorPallete';
import TabNavigation from './_components/TabNavigation';
import QRCodeView from './_components/qr-code-view/QRCodeView';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    productID: string;
}

export default function PaymentLinkModal({ isOpen, onClose, productID }: Props) {
    const [colorPallete, setColorPallete] = useState("light")
    const [currentTab, setCurrentTab] = useState<string>("Share")

    return (
        <AppModal open={isOpen} close={onClose} size={"sm"} contentProps={{ paddingBlock: 6, paddingInline: 4 }}>
            <TabNavigation currentTab={currentTab} onTabChange={setCurrentTab} />

            <Box height={"446px"}>
                {
                    currentTab === "Share" ?
                        <QRCodeView productID={productID} colorPallete={colorPallete} />
                        :
                        <QRCodeColorPallete selectedColorPallete={colorPallete} onColorPalleteChange={(colorPallete) => setColorPallete(colorPallete)} />
                }
            </Box>
        </AppModal>
    )
}