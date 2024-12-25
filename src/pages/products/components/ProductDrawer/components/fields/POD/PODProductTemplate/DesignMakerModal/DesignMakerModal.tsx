import AppModal from 'components/redesign/modal/AppModal'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import DesignMakerContent from './DesignMakerContent'
import TechniqueSelection from './TechniqueSelection'
import { ModalBody } from '@chakra-ui/react'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function DesignMakerModal({ isOpen, onClose }: Props) {
    const { values: { technique, printful_template_id } } = useProductForm()
    const selectedPODProduct = useProductPageStore(s => s.productPageState.selectedPODProduct)

    const renderDesignTools = technique || printful_template_id || !selectedPODProduct?.techniques?.length

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, isCentered: true, size: renderDesignTools ? "5xl" : "xl" }}
            modalContentProps={{ padding: 4 }}
        >
            <ModalBody>
                {renderDesignTools ?
                    <DesignMakerContent />
                    :
                    <TechniqueSelection selectedPODProduct={selectedPODProduct} />
                }
            </ModalBody>
        </AppModal>
    )
}

export default DesignMakerModal