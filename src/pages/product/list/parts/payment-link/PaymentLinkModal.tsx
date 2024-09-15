import { Box } from '@chakra-ui/react'
import AppModal from 'components/common/modal/AppModal'
import React, { useState } from 'react'
import QRCodeColorPallete from './_components/QRCodeColorPallete'
import QRCodeView from './_components/QRCodeView'
import TabNavigation from './_components/TabNavigation'

interface PaymentLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    productID: string;
}

export type TabOption = 'Share' | 'Customize'
export type ColorPalleteOption = 'light' | 'dark'

export default function PaymentLinkModal({ isOpen, onClose, productID }: PaymentLinkModalProps) {
    const [colorPallete, setColorPallete] = useState<ColorPalleteOption>('light')
    const [currentTab, setCurrentTab] = useState<TabOption>('Share')

    const renderContent = () => {
        if (currentTab === 'Share') {
            return <QRCodeView productID={productID} colorPallete={colorPallete} />
        }
        return <QRCodeColorPallete selectedColorPallete={colorPallete} onColorPalleteChange={setColorPallete} />
    }

    return (
        <AppModal
            open={isOpen}
            close={onClose}
            size="sm"
            contentProps={{ paddingBlock: 6, paddingInline: 4 }}
        >
            <TabNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
            <Box height="446px">
                {renderContent()}
            </Box>
        </AppModal>
    )
}