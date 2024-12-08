import { Grid, ModalBody } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppModal from 'components/redesign/modal/AppModal'
import React from 'react'
import ProductTypeCard from './ProductTypeCard'

interface ProductTypesModalProps {
    isOpen: boolean
    onClose: () => void
    onProductTypeSelection: (productType: string) => void
}

const productTypes = [
    {
        icon: <AppIcons.HeaderProductBox />,
        title: "Physical Items",
        description: "Sell tangible goods and merchandise currently in stock."
    },
    {
        icon: <AppIcons.HeaderImage />,
        title: "Digital Goods",
        description: "Sell digital items like files, in-game assets and NFTs."
    },
    {
        icon: <AppIcons.HeaderShirt />,
        title: "POD",
        description: "Offer custom produced items on-demand, such as apparel and mugs."
    },
    {
        icon: <AppIcons.EventTicket />,
        title: "Events",
        description: "Sell tickets for events, concerts, and other gatherings."
    }
]

function ProductTypesModal({ isOpen, onClose, onProductTypeSelection }: ProductTypesModalProps) {
    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, isCentered: true, size: "xl" }}
            modalContentProps={{
                width: "500px",
                paddingBlock: "0px !important",
                bgColor: "#141414",
                sx: { ".chakra-modal__body": { padding: 4 } }
            }}
        >
            <ModalBody>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={4}
                >
                    {productTypes.map((productType, index) => (
                        <ProductTypeCard
                            key={index}
                            {...productType}
                            onProductTypeSelection={onProductTypeSelection}
                        />
                    ))}
                </Grid>
            </ModalBody>
        </AppModal>
    )
}

export default ProductTypesModal