import { Grid, ModalBody } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppModal from 'components/redesign/modal/AppModal'
import React from 'react'
import ProductTypeCard from './ProductTypeCard'

interface ProductTypesModalProps {
    isOpen: boolean
    onClose: () => void
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
    },
    {
        icon: <AppIcons.Subscription />,
        title: "Subscription",
        description: "Offer recurring subscriptions for software or content.",
        badge: { text: "New", variant: "new" }
    },
    {
        icon: <AppIcons.Services />,
        title: "Services",
        description: "Provide services like mentorship, coaching, and teaching.",
        badge: { text: "Soon", variant: "soon" }
    }
]

function ProductTypesModal({ isOpen, onClose }: ProductTypesModalProps) {
    return (
        <AppModal
            modalRootProps={{
                isOpen,
                onClose,
                isCentered: true,
                size: "xl"
            }}
            modalContentProps={{
                width: "444px",
                paddingBlock: "0px !important",
                sx: { ".chakra-modal__body": { padding: 4 } }
            }}
        >
            <ModalBody>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={4}
                >
                    {productTypes.map((product, index) => (
                        <ProductTypeCard
                            key={index}
                            icon={product.icon}
                            title={product.title}
                            description={product.description}
                            badge={product.badge}
                        />
                    ))}
                </Grid>
            </ModalBody>
        </AppModal>
    )
}

export default ProductTypesModal